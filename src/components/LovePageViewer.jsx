import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RomanticPage from './RomanticPage';
import { useLovePage } from '../hooks/useLovePage';
import { Heart, Loader, Home, Share2, ThumbsUp } from 'lucide-react';

const LovePageViewer = () => {
  const { slug } = useParams();
  const { loadPageBySlug, likePage, currentPage, loading, error } = useLovePage();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      loadPageBySlug(slug);
    }
  }, [slug]);

  const handleLike = async () => {
    if (!liked && currentPage?.id) {
      const result = await likePage(currentPage.id);
      if (result.success) {
        setLiked(true);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Página de Amor - ${currentPage?.name1} & ${currentPage?.name2}`,
        text: 'Confira essa linda página de amor! ❤️',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando página de amor...</p>
        </div>
      </div>
    );
  }

  if (error || !currentPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-rose-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Página não encontrada</h2>
          <p className="text-slate-600 mb-6">
            Esta página de amor não existe ou foi removida.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors"
          >
            <Home size={16} className="inline mr-2" />
            Criar sua própria página
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <RomanticPage data={currentPage} isPreview={false} />
      
      {/* Botões flutuantes */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={handleLike}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${liked ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 hover:bg-rose-50'}`}
          title="Curtir"
        >
          <ThumbsUp size={20} fill={liked ? 'currentColor' : 'none'} />
        </button>
        
        <button
          onClick={handleShare}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          title="Compartilhar"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default LovePageViewer;