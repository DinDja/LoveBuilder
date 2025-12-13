import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Eye, 
  Share2, 
  Copy, 
  Edit, 
  Trash2, 
  Plus, 
  ExternalLink, 
  Check, 
  Calendar, 
  ArrowLeft, 
  Loader2, 
  Globe, 
  LayoutGrid,
  QrCode, 
  X,      
  Download 
} from 'lucide-react';
import { useLovePage } from '../hooks/useLovePage';
import { useAuth } from '../hooks/useAuth';

const Dashboard = ({ onBack, onCreateNew, setStep }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('mine'); 
  
  // Estado para controlar qual QR Code está sendo exibido
  const [qrCodePage, setQrCodePage] = useState(null); 
  const [isDownloadingQr, setIsDownloadingQr] = useState(false);

  const { 
    userPages = [], 
    publicPages = [], 
    loadUserPages, 
    getPublicPages, 
    deletePage, 
    loading 
  } = useLovePage();
  
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeTab === 'mine' && user?.uid) {
      loadUserPages(user.uid);
    } else if (activeTab === 'explore') {
      getPublicPages();
    }
  }, [user, activeTab]);

  const handleCreateNew = () => {
    if (onCreateNew) onCreateNew();
    else if (setStep) setStep('builder');
  };

  const handleBack = () => {
    if (onBack) onBack();
    else if (setStep) setStep('landing');
  };

  const handleCopyUrl = (slug) => {
    const url = `${window.location.origin}/love/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (slug) => {
    const url = `${window.location.origin}/love/${slug}`;
    if (navigator.share) {
      navigator.share({
        title: 'Olha que lindo ❤️',
        text: 'Uma página de amor especial!',
        url
      });
    } else {
      handleCopyUrl(slug);
    }
  };

  const handleDelete = async (pageId) => {
    if (window.confirm('Tem certeza que deseja excluir esta página?')) {
      await deletePage(pageId);
      if (user?.uid) loadUserPages(user.uid);
    }
  };

  // Função para baixar o QR Code
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
      console.error('Erro ao baixar', error);
      alert('Erro ao baixar imagem');
    } finally {
      setIsDownloadingQr(false);
    }
  };

  const displayPages = activeTab === 'mine' 
    ? (Array.isArray(userPages) ? userPages : [])
    : (Array.isArray(publicPages) ? publicPages : []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-fade-in relative pb-24 md:pb-0">
      
      {/* --- MODAL DE QR CODE (Premium Backdrop) --- */}
      {qrCodePage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-white/20 animate-fade-in-up">
            <button 
              onClick={() => setQrCodePage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-slate-500" />
            </button>

            <div className="text-center mb-6 mt-2">
              <h3 className="text-xl font-bold text-slate-800">QR Code</h3>
              <p className="text-sm text-slate-500">Escaneie para acessar a página</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-slate-200 flex justify-center mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 to-orange-50 rounded-2xl opacity-50"></div>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${window.location.origin}/love/${qrCodePage.slug}`)}&color=334155`}
                alt="QR Code"
                className="w-48 h-48 object-contain rounded-lg relative z-10 mix-blend-multiply"
              />
            </div>

            <button
              onClick={() => handleDownloadQr(qrCodePage.slug)}
              disabled={isDownloadingQr}
              className="w-full py-3.5 bg-slate-900 hover:bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 shadow-lg"
            >
              {isDownloadingQr ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              {isDownloadingQr ? 'Baixando...' : 'Salvar na Galeria'}
            </button>
          </div>
        </div>
      )}

      {/* --- HEADER (Desktop & Mobile Adaptável) --- */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center gap-4">
          
          {/* Lado Esquerdo: Voltar + Título Mobile */}
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              title="Voltar"
            >
              <ArrowLeft size={22} />
            </button>
            
            {/* Título Mobile */}
            <div className="md:hidden">
                <h1 className="text-lg font-bold text-slate-800">
                    {activeTab === 'mine' ? 'Meus Projetos' : 'Explorar'}
                </h1>
            </div>

            {/* Abas Desktop (Escondidas no Mobile) */}
            <div className="hidden md:flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('mine')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'mine' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LayoutGrid size={16} /> Meu Painel
              </button>
              <button
                onClick={() => setActiveTab('explore')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'explore' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Globe size={16} /> Explorar
              </button>
            </div>
          </div>
          
          {/* Lado Direito: User + Botão Criar (Desktop) */}
          <div className="flex items-center gap-4 w-auto justify-end">
            <div className="hidden md:block text-sm text-slate-600 text-right">
              <p className="text-xs text-slate-400">Logado como</p>
              <span className="font-semibold block max-w-[150px] truncate">{user?.displayName || user?.email?.split('@')[0]}</span>
            </div>
            {user?.photoURL && (
                <img src={user.photoURL} alt="User" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-200" />
            )}
            
            {/* Botão Criar (Apenas Desktop) */}
            <button
              onClick={handleCreateNew}
              className="hidden md:flex px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors items-center gap-2 shadow-lg shadow-rose-200"
            >
              <Plus size={18} /> <span>Nova Página</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        
        {/* Banner da Comunidade */}
        {activeTab === 'explore' && (
          <div className="mb-6 md:mb-8 p-6 md:p-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Galeria do Amor ❤️</h2>
                <p className="opacity-90 text-sm md:text-base max-w-md">Descubra histórias incríveis e inspire-se com a criatividade de outros casais.</p>
            </div>
          </div>
        )}

        {/* Stats (Apenas na aba Mine) */}
        {activeTab === 'mine' && (
          <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Páginas</p>
                 <Heart className="text-rose-500 w-4 h-4 md:w-6 md:h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-800">{userPages.length}</p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Visualizações</p>
                 <Eye className="text-blue-500 w-4 h-4 md:w-6 md:h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-800">
                {userPages.reduce((sum, page) => sum + (page.views || 0), 0)}
              </p>
            </div>
          </div>
        )}

        {/* Lista de Páginas */}
        <div className="space-y-4">
            <div className="hidden md:block mb-4">
                 <h2 className="text-xl font-bold text-slate-800">
                {activeTab === 'mine' ? 'Minhas Páginas' : 'Últimas Criações'}
              </h2>
            </div>

          {loading ? (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-rose-600 animate-spin mb-4" />
              <p className="text-slate-600 font-medium">Carregando...</p>
            </div>
          ) : displayPages.length === 0 ? (
            <div className="p-10 md:p-16 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-rose-400" size={32} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">Nada por aqui ainda</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto text-sm md:text-base">
                {activeTab === 'mine' 
                  ? 'Você ainda não criou nenhuma página.' 
                  : 'Ainda não há páginas públicas na comunidade.'}
              </p>
              {activeTab === 'mine' && (
                <button
                  onClick={handleCreateNew}
                  className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-200 transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
                >
                  <Plus size={20} /> Criar Primeira Página
                </button>
              )}
            </div>
          ) : (
            // Grid Responsivo: 1 col (Cards Mobile) -> Lista (Desktop)
            <div className="grid grid-cols-1 gap-4 md:gap-0 md:bg-white md:rounded-2xl md:border md:border-slate-100 md:shadow-sm md:divide-y md:divide-slate-100">
              {displayPages.map((page) => (
                <div key={page.id} className="bg-white md:bg-transparent rounded-2xl md:rounded-none p-4 md:p-6 shadow-sm md:shadow-none border border-slate-100 md:border-0 hover:bg-slate-50 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                    
                    {/* Info da Página (Mobile: Card Style / Desktop: List Style) */}
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        {/* Imagem */}
                        <div className="w-full h-40 md:w-16 md:h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 relative">
                            {page.photoUrl ? (
                                <img src={page.photoUrl} alt="Capa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <Heart size={24} />
                                </div>
                            )}
                            {/* Badges Flutuantes Mobile */}
                            {activeTab === 'mine' && (
                                <div className="absolute top-2 right-2 md:hidden">
                                     {page.isPublished ? (
                                      <span className="px-2 py-1 bg-green-100/90 backdrop-blur-sm text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-md shadow-sm">
                                          Online
                                      </span>
                                    ) : (
                                      <span className="px-2 py-1 bg-amber-100/90 backdrop-blur-sm text-amber-700 text-[10px] font-bold uppercase tracking-wide rounded-md shadow-sm">
                                          Rascunho
                                      </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Textos */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-slate-800">
                                {page.name1} & {page.name2}
                                </h3>
                                {/* Badge Desktop */}
                                {activeTab === 'mine' && (
                                    <div className="hidden md:block">
                                        {page.isPublished ? (
                                        <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
                                            Online
                                        </span>
                                        ) : (
                                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
                                            Rascunho
                                        </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-slate-500">
                                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md md:bg-transparent md:p-0">
                                    <Calendar size={14} className="text-slate-400" />
                                    <span>{page.createdAt?.seconds ? new Date(page.createdAt.seconds * 1000).toLocaleDateString() : 'Recentemente'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md md:bg-transparent md:p-0">
                                    <Eye size={14} className="text-blue-400" />
                                    <span>{page.views || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md md:bg-transparent md:p-0">
                                    <Heart size={14} className="text-rose-500 fill-rose-500" />
                                    <span>{page.likes || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Ações (Grid no Mobile / Row no Desktop) */}
                    <div className="grid grid-cols-4 md:flex md:items-center gap-2 pt-2 md:pt-0 border-t border-slate-100 md:border-0">
                      
                      {page.slug && (
                        <button
                          onClick={() => setQrCodePage(page)}
                          className="flex flex-col md:flex-row items-center justify-center p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Gerar QR Code"
                        >
                          <QrCode size={18} />
                          <span className="text-[10px] mt-1 md:hidden">QR</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleShare(page.slug)}
                        className="flex flex-col md:flex-row items-center justify-center p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Compartilhar"
                      >
                        <Share2 size={18} />
                        <span className="text-[10px] mt-1 md:hidden">Enviar</span>
                      </button>

                      {page.slug && (
                        <button
                            onClick={() => handleCopyUrl(page.slug)}
                            className="flex flex-col md:flex-row items-center justify-center p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors relative"
                            title="Copiar Link"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            <span className="text-[10px] mt-1 md:hidden">Copiar</span>
                        </button>
                      )}
                      
                      <div className="hidden md:block w-px h-6 bg-slate-200 mx-1"></div>

                      <a
                        href={`/love/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col md:flex-row items-center justify-center p-2 md:px-4 md:py-2 md:bg-white md:border md:border-slate-200 text-slate-700 hover:md:border-rose-200 hover:text-rose-600 rounded-lg font-medium transition-colors text-sm"
                      >
                        <ExternalLink size={16} /> <span className="hidden md:inline ml-2">Ver</span>
                        <span className="text-[10px] mt-1 md:hidden">Abrir</span>
                      </a>

                      {activeTab === 'mine' && (
                         <div className="col-span-4 md:col-span-auto flex gap-2 mt-2 md:mt-0">
                            {!page.isPublished && (
                                <button
                                onClick={() => setStep('builder')}
                                className="flex-1 md:flex-none px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                <Edit size={16} /> Editar
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(page.id)}
                                className="flex-1 md:flex-none p-2 text-red-400 bg-red-50 md:bg-transparent md:text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                                title="Excluir Página"
                            >
                                <Trash2 size={18} /> <span className="md:hidden ml-2 text-sm">Excluir</span>
                            </button>
                         </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- FLOATING ACTION BUTTON (Mobile Only) --- */}
      <button
        onClick={handleCreateNew}
        className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-rose-600 text-white rounded-full shadow-lg shadow-rose-300 flex items-center justify-center z-40 active:scale-90 transition-transform"
      >
        <Plus size={28} />
      </button>

      {/* --- BOTTOM NAVIGATION BAR (Mobile Only) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 pb-safe z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
            <button
                onClick={() => setActiveTab('mine')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                activeTab === 'mine' ? 'text-rose-600' : 'text-slate-400'
                }`}
            >
                <LayoutGrid size={22} strokeWidth={activeTab === 'mine' ? 2.5 : 2} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Painel</span>
            </button>

            <button
                onClick={() => setActiveTab('explore')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                activeTab === 'explore' ? 'text-rose-600' : 'text-slate-400'
                }`}
            >
                <Globe size={22} strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Explorar</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;