import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTIONS = {
  PAGES: 'love_pages',
  USERS: 'users',
  ANALYTICS: 'analytics'
};

export const pageService = {
  // Gerar slug único
  generateSlug(name1, name2) {
    const baseSlug = `${name1.toLowerCase().trim()}-${name2.toLowerCase().trim()}`
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const timestamp = Date.now().toString().slice(-4);
    return `${baseSlug}-${timestamp}`;
  },

  // Criar nova página
  async createPage(pageData, userId) {
    try {
      const slug = this.generateSlug(pageData.name1, pageData.name2);
      const pageId = `${slug}-${Date.now()}`;
      
      const pageWithMetadata = {
        ...pageData,
        id: pageId,
        slug,
        userId: userId || 'anonymous',
        views: 0,
        likes: 0,
        isPublished: true, // Gratuito = publicado automaticamente
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = doc(db, COLLECTIONS.PAGES, pageId);
      await setDoc(docRef, pageWithMetadata);
      
      return {
        success: true,
        pageId,
        slug,
        pageUrl: `${window.location.origin}/love/${slug}`,
        data: pageWithMetadata
      };
    } catch (error) {
      console.error('Erro ao criar página:', error);
      return { success: false, error: error.message };
    }
  },

  // Obter página por ID
  async getPage(pageId) {
    try {
      const docRef = doc(db, COLLECTIONS.PAGES, pageId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const pageData = docSnap.data();
        
        // Incrementar visualizações
        await updateDoc(docRef, {
          views: (pageData.views || 0) + 1,
          updatedAt: serverTimestamp()
        });
        
        return {
          success: true,
          data: { id: docSnap.id, ...pageData }
        };
      } else {
        return { success: false, error: 'Página não encontrada' };
      }
    } catch (error) {
      console.error('Erro ao buscar página:', error);
      return { success: false, error: error.message };
    }
  },

  // Obter página por slug
  async getPageBySlug(slug) {
    try {
      const q = query(
        collection(db, COLLECTIONS.PAGES),
        where('slug', '==', slug)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const pageData = doc.data();
        
        // Incrementar visualizações
        await updateDoc(doc.ref, {
          views: (pageData.views || 0) + 1,
          updatedAt: serverTimestamp()
        });
        
        return {
          success: true,
          data: { id: doc.id, ...pageData }
        };
      } else {
        return { success: false, error: 'Página não encontrada' };
      }
    } catch (error) {
      console.error('Erro ao buscar página por slug:', error);
      return { success: false, error: error.message };
    }
  },

  // Obter páginas populares
  async getPopularPages(limit = 6) {
    try {
      const q = query(
        collection(db, COLLECTIONS.PAGES),
        orderBy('views', 'desc'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const pages = querySnapshot.docs.slice(0, limit).map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, pages };
    } catch (error) {
      console.error('Erro ao buscar páginas populares:', error);
      return { success: false, error: error.message };
    }
  },

  // Obter páginas recentes
  async getRecentPages(limit = 6) {
    try {
      const q = query(
        collection(db, "love_pages"),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const pages = querySnapshot.docs.slice(0, limit).map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, pages };
    } catch (error) {
      console.error('Erro ao buscar páginas recentes:', error);
      return { success: false, error: error.message };
    }
  },

  // Atualizar página
  async updatePage(pageId, updates) {
    try {
      const docRef = doc(db, COLLECTIONS.PAGES, pageId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar página:', error);
      return { success: false, error: error.message };
    }
  },

  // Dar like
  async likePage(pageId) {
    try {
      const docRef = doc(db, COLLECTIONS.PAGES, pageId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentLikes = docSnap.data().likes || 0;
        await updateDoc(docRef, {
          likes: currentLikes + 1,
          updatedAt: serverTimestamp()
        });
        
        return { success: true, likes: currentLikes + 1 };
      }
      
      return { success: false, error: 'Página não encontrada' };
    } catch (error) {
      console.error('Erro ao dar like:', error);
      return { success: false, error: error.message };
    }
  }
};

export const storageService = {
  // Upload de imagem
  async uploadImage(file, userId) {
    try {
      // Validar arquivo
      if (!file.type.startsWith('image/')) {
        return { success: false, error: 'Tipo de arquivo inválido' };
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        return { success: false, error: 'Arquivo muito grande (máx: 5MB)' };
      }
      
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storage = getStorage();
      
      // Criar nome único
      const fileExt = file.name.split('.').pop();
      const fileName = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const storageRef = ref(storage, `love-pages/${userId || 'anonymous'}/${fileName}`);
      
      // Fazer upload
      await uploadBytes(storageRef, file);
      
      // Obter URL
      const downloadURL = await getDownloadURL(storageRef);
      
      return { 
        success: true, 
        url: downloadURL,
        fileName 
      };
    } catch (error) {
      console.error('Erro no upload:', error);
      return { success: false, error: error.message };
    }
  }
};