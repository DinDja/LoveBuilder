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
  QrCode, // Novo ícone
  X,      // Novo ícone
  Download // Novo ícone
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
    <div className="min-h-screen bg-slate-50 font-sans animate-fade-in relative">
      
      {/* --- MODAL DE QR CODE --- */}
      {qrCodePage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-white/20">
            <button 
              onClick={() => setQrCodePage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>

            <div className="text-center mb-6 mt-2">
              <h3 className="text-xl font-bold text-slate-800">QR Code</h3>
              <p className="text-sm text-slate-500">Escaneie para acessar a página</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-center mb-6">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${window.location.origin}/love/${qrCodePage.slug}`)}&color=334155`}
                alt="QR Code"
                className="w-48 h-48 object-contain rounded-lg"
              />
            </div>

            <button
              onClick={() => handleDownloadQr(qrCodePage.slug)}
              disabled={isDownloadingQr}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
            >
              {isDownloadingQr ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              {isDownloadingQr ? 'Baixando...' : 'Baixar Imagem'}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              title="Voltar"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex bg-slate-100 p-1 rounded-xl">
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
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="hidden md:block text-sm text-slate-600 text-right">
              <p className="text-xs text-slate-400">Logado como</p>
              <span className="font-semibold block">{user?.displayName || user?.email?.split('@')[0]}</span>
            </div>
            {user?.photoURL && (
                <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border border-slate-200" />
            )}
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-rose-200"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Nova Página</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Banner da Comunidade */}
        {activeTab === 'explore' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Galeria do Amor ❤️</h2>
            <p className="opacity-90">Veja as histórias incríveis que outros casais estão criando.</p>
          </div>
        )}

        {/* Stats (Apenas na aba Mine) */}
        {activeTab === 'mine' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Páginas</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{userPages.length}</p>
                </div>
                <div className="bg-rose-50 p-3 rounded-xl">
                  <Heart className="text-rose-500" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visualizações</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">
                    {userPages.reduce((sum, page) => sum + (page.views || 0), 0)}
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl">
                  <Eye className="text-blue-500" size={24} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Páginas */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {activeTab === 'mine' ? 'Minhas Páginas' : 'Últimas Criações da Comunidade'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'mine' ? 'Gerencie suas criações' : 'Inspire-se com o amor alheio'}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-rose-600 animate-spin mb-4" />
              <p className="text-slate-600 font-medium">Carregando...</p>
            </div>
          ) : displayPages.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-rose-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Nada por aqui ainda</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
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
            <div className="divide-y divide-slate-100">
              {displayPages.map((page) => (
                <div key={page.id} className="p-6 hover:bg-slate-50 transition-colors group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Info da Página */}
                    <div className="flex gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 relative group-hover:scale-105 transition-transform duration-300">
                            {page.photoUrl ? (
                                <img src={page.photoUrl} alt="Capa" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <Heart size={24} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-slate-800">
                                {page.name1} & {page.name2}
                                </h3>
                                {activeTab === 'mine' && (
                                  page.isPublished ? (
                                    <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
                                        Online
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
                                        Rascunho
                                    </span>
                                  )
                                )}
                            </div>
                            
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                                <div className="flex items-center gap-1.5" title="Data de criação">
                                    <Calendar size={14} className="text-slate-400" />
                                    <span>{page.createdAt?.seconds ? new Date(page.createdAt.seconds * 1000).toLocaleDateString() : 'Recentemente'}</span>
                                </div>
                                <div className="flex items-center gap-1.5" title="Visualizações">
                                    <Eye size={14} className="text-blue-400" />
                                    <span>{page.views || 0}</span>
                                </div>
                                {/* --- NOVO: Contador de Likes --- */}
                                <div className="flex items-center gap-1.5" title="Curtidas">
                                    <Heart size={14} className="text-rose-500 fill-rose-500" />
                                    <span>{page.likes || 0}</span>
                                </div>
                                {page.slug && (
                                    <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                        <ExternalLink size={10} /> /{page.slug}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Ações */}
                    <div className="flex flex-wrap items-center gap-2 self-start lg:self-center mt-4 lg:mt-0">
                      
                      {/* --- NOVO: Botão QR Code --- */}
                      {page.slug && (
                        <button
                          onClick={() => setQrCodePage(page)}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                          title="Gerar QR Code"
                        >
                          <QrCode size={18} />
                        </button>
                      )}

                      <button
                        onClick={() => handleShare(page.slug)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Compartilhar"
                      >
                        <Share2 size={18} />
                      </button>

                      {page.slug && (
                        <button
                            onClick={() => handleCopyUrl(page.slug)}
                            className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors relative"
                            title="Copiar Link"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      )}
                      
                      <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>

                      <a
                        href={`/love/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:border-rose-200 hover:text-rose-600 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                      >
                        <ExternalLink size={16} /> Ver
                      </a>

                      {activeTab === 'mine' && (
                        <>
                          {!page.isPublished && (
                            <button
                              onClick={() => setStep('builder')}
                              className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                            >
                              <Edit size={16} /> Editar
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(page.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir Página"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;