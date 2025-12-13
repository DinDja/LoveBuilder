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
  deleteDoc
} from 'firebase/firestore';

export const useLovePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [userPages, setUserPages] = useState([]); 
  // Novo estado para páginas públicas
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

  // 2. Carregar Páginas do Usuário (Minhas Páginas)
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
      console.error("Erro índice usuário:", err);
      // Fallback sem ordenação se falhar índice
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

  // 3. NOVO: Carregar Páginas Públicas (Explorar)
  const getPublicPages = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'love_pages'),
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc'),
        limit(20) // Limite de 20 para não pesar
      );
      
      const querySnapshot = await getDocs(q);
      const pages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPublicPages(pages);
      return { success: true, pages };
    } catch (err) {
      console.error("Erro ao carregar públicas (verifique índices):", err);
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

  // 5. Carregar Populares (Limitado)
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

  // 6. Carregar por Slug
  const getPageBySlug = useCallback(async (slug) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'love_pages'), where('slug', '==', slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const page = { id: snap.docs[0].id, ...snap.docs[0].data() };
        setCurrentPage(page);
        return { success: true, page };
      }
      return { success: false, error: 'Não encontrado' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    currentPage,
    userPages,
    publicPages, // Exportando estado público
    createPage,
    loadUserPages,
    getPublicPages, // Exportando função pública
    deletePage,
    loadPopularPages,
    getPageBySlug
  };
};