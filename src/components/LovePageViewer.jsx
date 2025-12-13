import React, { useState, useEffect } from 'react';
import RomanticPage from './RomanticPage';
import { useLovePage } from '../hooks/useLovePage';
import { Heart, Home, Share2, ThumbsUp, AlertTriangle } from 'lucide-react';

const LovePageViewer = ({ slugProp }) => {
  // 1. Tratamento robusto do Slug (remove barras extras no final)
  const rawSlug = slugProp || window.location.pathname.split('/love/')[1] || '';
  const slug = rawSlug.replace(/\/$/, ''); 

  const { getPageBySlug, likePage, currentPage, loading, error } = useLovePage();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      console.log("Buscando página com slug:", slug); // Log para debug
      getPageBySlug(slug);
    }
  }, [slug]);

  const handleLike = async () => {
    if (!liked && currentPage?.id) {
      const result = await likePage(currentPage.id);
      if (result.success) setLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Amor Eterno`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 animate-pulse">Buscando sua história...</p>
        </div>
      </div>
    );
  }

  // Mostra o erro real para facilitar o debug
  if (error || !currentPage) {
    const isPermissionError = error && error.includes("permission");
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {isPermissionError ? <AlertTriangle className="text-rose-600" size={32} /> : <Heart className="text-rose-400" size={32} />}
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {isPermissionError ? "Acesso Restrito" : "Página não encontrada"}
          </h2>
          
          <p className="text-slate-600 mb-6">
            {isPermissionError 
              ? "Esta página existe, mas parece que falta a permissão pública. Se você é o dono, verifique se ela está publicada."
              : "O link pode estar incorreto ou a página foi removida."}
          </p>

          {/* Área técnica para o Sr. Stark ver o que houve */}
          <div className="bg-slate-100 p-3 rounded-lg text-xs font-mono text-slate-500 mb-6 text-left overflow-hidden">
            <p><strong>Slug buscado:</strong> {slug}</p>
            {error && <p className="text-red-500 mt-1"><strong>Erro:</strong> {error}</p>}
          </div>

          <a
            href="/"
            className="block w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors"
          >
            <Home size={18} className="inline mr-2" />
            Voltar para o Início
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-in">
      <RomanticPage data={currentPage} isPreview={false} />
      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={handleLike}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 ${liked ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 hover:bg-rose-50'}`}
        >
          <ThumbsUp size={20} fill={liked ? 'currentColor' : 'none'} />
        </button>
        
        <button
          onClick={handleShare}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-110"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default LovePageViewer;