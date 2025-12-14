import React, { useState, useEffect } from 'react';
import {
  Heart, Share2, QrCode, ExternalLink, MoreHorizontal,
  MapPin, Calendar, X, Download, Loader2, ArrowLeft,
  Sparkles, Music
} from 'lucide-react';
import { useLovePage } from '../hooks/useLovePage';
import { auth } from '../firebase/config';
import {onAuthStateChanged} from 'firebase/auth'

const LoveFeed = ({ onBack }) => {
  // CORREÇÃO: Importar hasLiked do Hook
  const { getPublicPages, likePage, hasLiked, loading } = useLovePage();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const [pages, setPages] = useState([]);
  // Removido o estado likedPosts, pois agora confiamos no likedPageIds interno do Hook
  // O Hook usa 'love_pages_likes' como chave
  const [qrCodePage, setQrCodePage] = useState(null);
  const [isDownloadingQr, setIsDownloadingQr] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(null); // ID do post para animar

  // Carregar Feed
  useEffect(() => {
    const loadFeed = async () => {
      const result = await getPublicPages();
      if (result.success) {
        setPages(result.pages);
      }
    };
    loadFeed();
  }, [getPublicPages]);

  // Função de Like (Otimista + Animação)
  const handleLike = async (pageId, currentLikes) => {

    if (hasLiked(pageId)) return;

    // Gatilho da animação visual
    setShowHeartAnimation(pageId);
    setTimeout(() => setShowHeartAnimation(null), 800);

    // Atualização Otimista da UI
    const newLikesCount = (currentLikes || 0) + 1;
    setPages(prev => prev.map(p =>
      p.id === pageId ? { ...p, likes: newLikesCount } : p
    ));

    // 3. CHAMADA COM userId
    // Passamos o userId (se autenticado) ou null (se anônimo)
    await likePage(pageId, currentUser);
  };

  const handleShare = async (page) => {
    const url = `${window.location.origin}/love/${page.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${page.name1} & ${page.name2} - Love Builder`,
          text: 'Veja essa história de amor incrível!',
          url: url
        });
      } catch (err) { console.log('Share cancelado'); }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado!');
    }
  };

  const handleDownloadQr = async (slug) => {
    try {
      setIsDownloadingQr(true);
      const url = `${window.location.origin}/love/${slug}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(url)}&color=334155&format=png`;

      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const tempUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = tempUrl;
      link.download = `qrcode-${slug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(tempUrl);
    } catch (error) {
      alert('Erro ao baixar imagem');
    } finally {
      setIsDownloadingQr(false);
    }
  };

  // Verifica se o post é recente (menos de 3 dias)
  const isNew = (timestamp) => {
    if (!timestamp) return false;
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 md:pb-10">

      {/* HEADER PREMIUM (Glassmorphism) */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl text-slate-800 tracking-tight flex items-center gap-2">
              Love<span className="text-rose-600">Feed</span>
            </h1>
          </div>

          <div className="w-10"></div> {/* Espaçador para centralizar */}
        </div>
      </div>

      {/* CONTAINER PRINCIPAL */}
      <div className="max-w-7xl mx-auto pt-24 px-4 md:px-6">

        {/* Banner Desktop (Opcional) */}
        <div className="hidden md:flex mb-10 items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Explore o Amor</h2>
            <p className="text-slate-500 mt-1">Histórias reais criadas pela nossa comunidade.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold uppercase tracking-wide">Em Destaque</span>
            <span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wide">Recentes</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Loader2 className="w-12 h-12 text-rose-600 animate-spin relative z-10" />
            </div>
            <p className="text-slate-500 text-sm font-medium mt-4">Buscando inspirações...</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-lg mx-auto">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Feed Vazio</h3>
            <p className="text-slate-500">Seja o primeiro casal a compartilhar sua história!</p>
          </div>
        ) : (
          /* GRID RESPONSIVO (Masonry Feel) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pages.map((page) => (
              <article
                key={page.id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col"
              >
                {/* 1. Header do Post */}
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    {/* Avatar Duplo Premium */}
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 border-[3px] border-white flex items-center justify-center text-xs font-bold text-white shadow-sm z-10">
                        {page.name1[0]}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-[3px] border-white flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        {page.name2[0]}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">
                        {page.name1} & {page.name2}
                      </h3>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                        {page.startDate ? new Date(page.startDate).getFullYear() : 'Juntos'}
                        {isNew(page.createdAt) && (
                          <span className="ml-2 text-rose-500 font-bold">• NOVO</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Mídia (Imagem) com Interação */}
                <div
                  className="relative aspect-[4/5] bg-slate-100 cursor-pointer overflow-hidden group/image"
                  onDoubleClick={() => handleLike(page.id, page.likes)}
                >
                  {page.photoUrl ? (
                    <img
                      src={page.photoUrl}
                      alt="Casal"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-rose-200">
                      <Heart size={80} fill="currentColor" className="opacity-50" />
                    </div>
                  )}

                  {/* Overlay Gradiente (Melhora leitura se tivesse texto) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

                  {/* Coração Animado (Double Click Feedback) */}
                  {showHeartAnimation === page.id && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none animate-bounce-in">
                      <Heart size={100} fill="white" className="text-white drop-shadow-2xl" />
                    </div>
                  )}

                  {/* Badge de Música (Se tiver spotify) */}
                  {page.spotifyUrl && (
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-full z-10">
                      <Music size={14} />
                    </div>
                  )}
                </div>

                {/* 3. Actions Bar */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {/* BOTÃO DE LIKE ATUALIZADO (usando hasLiked) */}
                      <button
                        onClick={() => handleLike(page.id, page.likes)}
                        // Usando hasLiked para determinar o estilo e desabilitar
                        disabled={hasLiked(page.id)}
                        className={`p-2 rounded-full transition-all active:scale-90 ${hasLiked(page.id) ? 'bg-rose-50 text-rose-500' : 'hover:bg-slate-50 text-slate-700'}`}
                      >
                        <Heart
                          size={24}
                          fill={hasLiked(page.id) ? "currentColor" : "none"}
                          className={hasLiked(page.id) ? "animate-heart-beat" : ""}
                        />
                      </button>

                      <button
                        onClick={() => setQrCodePage(page)}
                        className="p-2 rounded-full hover:bg-slate-50 text-slate-700 transition-colors"
                      >
                        <QrCode size={24} />
                      </button>

                      <button
                        onClick={() => handleShare(page)}
                        className="p-2 rounded-full hover:bg-slate-50 text-slate-700 transition-colors"
                      >
                        <Share2 size={24} />
                      </button>
                    </div>

                    <a
                      href={`/love/${page.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                    >
                      Ver <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Likes Info */}
                  <div className="px-2 mb-2">
                    <p className="text-sm font-bold text-slate-800">
                      {page.likes || 0} curtidas
                    </p>
                  </div>

                  {/* Legenda Limitada */}
                  <div className="px-2 mb-4">
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      <span className="font-bold text-slate-900 mr-2">{page.name1} & {page.name2}</span>
                      {page.message || "Uma linda história de amor eternizada..."}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL QR CODE PREMIUM --- */}
      {qrCodePage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative border border-white/20 animate-scale-up">
            <button
              onClick={() => setQrCodePage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4">
                <QrCode size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">QR Code</h3>
              <p className="text-slate-500 text-sm mt-1">{qrCodePage.name1} & {qrCodePage.name2}</p>
            </div>

            <div className="bg-white p-4 rounded-3xl border-2 border-dashed border-slate-200 flex justify-center mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 to-purple-50 rounded-3xl opacity-50"></div>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${window.location.origin}/love/${qrCodePage.slug}`)}&color=0f172a`}
                alt="QR Code"
                className="w-56 h-56 object-contain rounded-xl relative z-10 mix-blend-multiply"
              />
            </div>

            <button
              onClick={() => handleDownloadQr(qrCodePage.slug)}
              disabled={isDownloadingQr}
              className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-xl"
            >
              {isDownloadingQr ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              {isDownloadingQr ? 'Baixando...' : 'Salvar na Galeria'}
            </button>
          </div>
        </div>
      )}

      {/* Estilos para animações extras (se não estiverem no Tailwind config) */}
      {/* NOTE: O atributo `jsx` no <style> deve ser removido ou alterado para um atributo válido se você não estiver usando styled-jsx. */}
      {/* Se estiver usando styled-jsx, a tag deve ser <style jsx>*/}
      <style>{`
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.1); }
        }
        .animate-heart-beat {
          animation: heart-beat 0.4s ease-in-out;
        }
        .animate-bounce-in {
            animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes bounce-in {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoveFeed;