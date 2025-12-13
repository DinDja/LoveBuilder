import { useState, useCallback } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit, 
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  increment
} from 'firebase/firestore';

export const useLovePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [userPages, setUserPages] = useState([]); 
  const [publicPages, setPublicPages] = useState([]);

  // 1. Criar Página
  const createPage = useCallback(async (pageData) => {
    setLoading(true);
    setError(null);
    try {
      let finalSlug = pageData.slug || `${pageData.name1}-${pageData.name2}`.toLowerCase().replace(/\s+/g, '-');
      
      const q = query(collection(db, 'love_pages'), where('slug', '==', finalSlug));
      const check = await getDocs(q);
      if (!check.empty) {
         finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }

      const docData = {
        ...pageData,
        slug: finalSlug,
        createdAt: serverTimestamp(),
        views: 0,
        likes: 0,
        isPublished: true 
      };

      const docRef = await addDoc(collection(db, 'love_pages'), docData);
      
      const newPage = { id: docRef.id, ...docData };
      setCurrentPage(newPage);
      return { success: true, slug: finalSlug, data: newPage };
    } catch (err) {
      console.error(err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Carregar Páginas do Usuário
  const loadUserPages = useCallback(async (userId) => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const q = query(
        collection(db, 'love_pages'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc') 
      );
      
      const querySnapshot = await getDocs(q);
      const pages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setUserPages(pages);
      return { success: true, pages };
    } catch (err) {
      // Fallback sem ordenação
      try {
        const q2 = query(collection(db, 'love_pages'), where('userId', '==', userId));
        const snap2 = await getDocs(q2);
        const pages2 = snap2.docs.map(d => ({ id: d.id, ...d.data() }));
        setUserPages(pages2);
      } catch (err2) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Carregar Páginas Públicas
  const getPublicPages = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'love_pages'),
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      
      const querySnapshot = await getDocs(q);
      const pages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPublicPages(pages);
      return { success: true, pages };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // 4. Deletar Página
  const deletePage = useCallback(async (pageId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'love_pages', pageId));
      setUserPages(prev => prev.filter(p => p.id !== pageId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // 5. Carregar Populares
  const loadPopularPages = useCallback(async (limitCount = 3) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'love_pages'),
        where('isPublished', '==', true),
        limit(limitCount)
      );
      const snap = await getDocs(q);
      const pages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      return { success: true, pages };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // 6. Carregar por Slug (Viewer)
  const getPageBySlug = useCallback(async (slug) => {
    console.log("Hook: getPageBySlug chamado para:", slug);
    setLoading(true);
    setError(null);
    try {
      // Tenta buscar pública primeiro
      let q = query(
        collection(db, 'love_pages'), 
        where('slug', '==', slug),
        where('isPublished', '==', true) 
      );
      let snap = await getDocs(q);

      // Se falhar, tenta buscar como dono (sem filtro isPublished)
      if (snap.empty) {
        console.log("Hook: Não achou pública, tentando como dono...");
        const qOwner = query(
          collection(db, 'love_pages'), 
          where('slug', '==', slug)
        );
        snap = await getDocs(qOwner);
      }

      if (!snap.empty) {
        const docData = snap.docs[0];
        const page = { id: docData.id, ...docData.data() };
        
        // Incrementa visualização (agora permitido pelas novas regras)
        try {
            const pageRef = doc(db, 'love_pages', docData.id);
            updateDoc(pageRef, { views: increment(1) });
        } catch (e) { console.warn("View não contada:", e); }

        setCurrentPage(page);
        return { success: true, page };
      } 
      
      console.log("Hook: Página não encontrada em lugar nenhum.");
      setError('Página não encontrada');
      return { success: false, error: 'Não encontrada' };

    } catch (err) {
      console.error("Hook Error:", err);
      if (err.message.includes("permission")) {
         setError("Acesso restrito.");
      } else {
         setError(err.message);
      }
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // 7. Dar Like (NOVA FUNÇÃO ESSENCIAL)
  const likePage = useCallback(async (pageId) => {
    console.log("Hook: likePage chamado para ID:", pageId);
    try {
      const pageRef = doc(db, 'love_pages', pageId);
      await updateDoc(pageRef, { likes: increment(1) });
      return { success: true };
    } catch (err) {
      console.error("Erro ao dar like:", err);
      return { success: false, error: err.message };
    }
  }, []);

  return {
    loading,
    error,
    currentPage,
    userPages,
    publicPages,
    createPage,
    loadUserPages,
    getPublicPages,
    deletePage,
    loadPopularPages,
    getPageBySlug,
    likePage // GARANTIDO QUE ESTÁ AQUI
  };
};