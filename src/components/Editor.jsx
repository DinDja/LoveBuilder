import React, { useState, useEffect } from 'react';
import { 
  Heart, Palette, Type, Music, ImageIcon, Gift, X, Check, 
  Smartphone, Laptop, Lock, Upload, PlayCircle, Loader2, 
  Edit3, Eye, LogIn, UserPlus 
} from 'lucide-react';
import RomanticPage from './RomanticPage';
import AuthModal from './AuthModal'; // Importando o Modal
import { FONTS, THEMES, STICKERS } from '../data/constants';
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'; // Apenas Auth State

const MUSIC_PRESETS = [
  { id: 1, name: "Perfect", artist: "Ed Sheeran", url: "https://open.spotify.com/intl-pt/track/0tgVpDi06FyKpA1z0VMD4v?si=489a278282164c87" },
  { id: 2, name: "All of Me", artist: "John Legend", url: "https://open.spotify.com/intl-pt/track/3U4isOIWM3VvDubwSI3y7a?si=7665e4c0ad474e0f" },
  { id: 3, name: "Just the Way You Are", artist: "Bruno Mars", url: "https://open.spotify.com/intl-pt/track/47Slg6LuqLaX0VodpSCvPt?si=4a8e21c373624272" },
  { id: 4, name: "A Thousand Years", artist: "Christina Perri", url: "https://open.spotify.com/intl-pt/track/6lanRgr6wXibZr8KgzXxBl?si=9fcdf360f58b4e2a" },
  { id: 5, name: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", url: "https://open.spotify.com/intl-pt/track/2plbrEY59IikOBgBGLjaoe?si=95a5fa07a03749ae" },
  { id: 6, name: "Thinking Out Loud", artist: "Ed Sheeran", url: "https://open.spotify.com/intl-pt/track/34gCuhDGsG4bRPIf9bb02f?si=28831dd1a99b4940" },
  { id: 7, name: "Until I Found You", artist: "Stephen Sanchez", url: "https://open.spotify.com/intl-pt/track/0T5iIrXA4p5GsubkhuBIKV?si=5aabeeb4d67b447a" },
  { id: 8, name: "Make You Feel My Love", artist: "Adele", url: "https://open.spotify.com/intl-pt/track/5FgPwJ7Nh2FVmIXviKl2VF?si=8aea5c9005264420" },
  { id: 9, name: "Can't Help Falling in Love", artist: "Elvis Presley", url: "https://open.spotify.com/intl-pt/track/44AyOl4qVkzS48vBsbNXaC?si=b6e7bb93add54ad0" },
  { id: 10, name: "Say You Won’t Let Go", artist: "James Arthur", url: "https://open.spotify.com/intl-pt/track/5uCax9HTNlzGybIStD3vDh?si=2bcd31d4d5734c5d" },
  { id: 11, name: "Photograph", artist: "Ed Sheeran", url: "https://open.spotify.com/intl-pt/track/1HNkqx9Ahdgi1Ixy2xkKkL?si=894c522fd6b5432c" },
  { id: 12, name: "Lucky", artist: "Jason Mraz, Colbie Caillat", url: "https://open.spotify.com/intl-pt/track/0IktbUcnAGrvD03AWnz3Q8?si=c5ef417b77324cd4" }
];

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        const finalWidth = scaleSize < 1 ? MAX_WIDTH : img.width;
        const finalHeight = scaleSize < 1 ? img.height * scaleSize : img.height;
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
        const base64String = canvas.toDataURL('image/jpeg', 0.7);
        resolve(base64String);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const Editor = ({ pageData, handleInputChange, setStep, onPageCreated }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState('mobile');
  const [isSaving, setIsSaving] = useState(false);
  const [mobileView, setMobileView] = useState('editor');
  
  // --- NOVOS ESTADOS PARA AUTH ---
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Monitorar Autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file);
        const sizeInBytes = 4 * Math.ceil((compressedBase64.length / 3)) * 0.5624896334383415;
        if ((sizeInBytes / 1024) > 950) {
          alert("Imagem muito grande. Tente uma menor.");
          return;
        }
        handleInputChange('photoUrl', compressedBase64);
      } catch (error) {
        console.error("Erro na compressão:", error);
      }
    }
  };

  const handleSavePage = async () => {
    // Verificação de segurança extra
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setIsSaving(true);

      const rawSlug = pageData.slug || `${pageData.name1}-${pageData.name2}-${Date.now().toString().slice(-4)}`;
      const generatedSlug = rawSlug
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-');

      const docData = {
        name1: pageData.name1 || "Amor",
        name2: pageData.name2 || "Amor",
        startDate: pageData.startDate || new Date().toISOString(),
        message: pageData.message || "",
        photoUrl: pageData.photoUrl || "",
        spotifyUrl: pageData.spotifyUrl || "",
        themeId: pageData.themeId || "default",
        fontName: pageData.fontName || "sans",
        enableStickers: pageData.enableStickers !== false,
        sticker: pageData.sticker || "❤️",
        userId: user.uid, // Usa o UID do usuário logado
        slug: generatedSlug,
        createdAt: serverTimestamp(),
        views: 0,
        likes: 0,
        isPublished: true
      };

      await addDoc(collection(db, "love_pages"), docData);

      if (onPageCreated) {
        onPageCreated(generatedSlug);
      } else {
        if (setStep) setStep('checkout');
      }

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(`Erro ao salvar: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // --- RENDERIZAÇÃO CONDICIONAL DA SIDEBAR ---
  const renderSidebarContent = () => {
    // 1. Carregando...
    if (authLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          <p className="text-sm">Verificando acesso...</p>
        </div>
      );
    }

    // 2. TELA DE BLOQUEIO (Usuário não logado)
    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={32} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Edição Restrita</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Para criar e salvar sua página eterna de amor, você precisa entrar na sua conta. É rápido e gratuito.
          </p>
          
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 mb-4"
          >
            <LogIn size={20} /> Entrar ou Cadastrar
          </button>
          
          <button
            onClick={() => setStep('landing')}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      );
    }

    // 3. EDITOR REAL (Usuário logado)
    return (
      <>
        {/* Tabs */}
        <div className="px-4 lg:px-8 pt-6 pb-2">
          <div className="flex p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
            {[
              { id: 'basic', icon: <Heart size={14} />, label: 'Início' },
              { id: 'design', icon: <Palette size={14} />, label: 'Estilo' },
              { id: 'content', icon: <Type size={14} />, label: 'Texto' },
              { id: 'media', icon: <Music size={14} />, label: 'Mídia' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[70px] py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-white text-rose-600 shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 custom-scrollbar">
          {renderTabContent()}
        </div>

        {/* Footer Actions */}
        <div className="p-4 lg:p-6 border-t border-slate-100 bg-white z-20 mb-[60px] lg:mb-0">
          <div className="space-y-3">
            <button
              onClick={handleSavePage}
              disabled={isSaving}
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSaving ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Gift size={20} /> Salvar e Continuar
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                <Check size={12} /> Logado como {user.displayName || user.email.split('@')[0]}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6 animate-fade-in pb-20 lg:pb-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Seu Nome</label>
                <input
                  type="text"
                  value={pageData.name1}
                  onChange={(e) => handleInputChange('name1', e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome Dele(a)</label>
                <input
                  type="text"
                  value={pageData.name2}
                  onChange={(e) => handleInputChange('name2', e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data do Início</label>
              <input
                type="datetime-local"
                value={pageData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all font-medium text-slate-600"
              />
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="space-y-8 animate-fade-in pb-20 lg:pb-0">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tema Visual</label>
              <div className="grid grid-cols-1 gap-3">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => handleInputChange('themeId', theme.id)}
                    className={`relative p-4 rounded-2xl border transition-all flex items-center gap-4 group overflow-hidden ${pageData.themeId === theme.id ? `border-${theme.color}-500 ring-2 ring-rose-500 ring-offset-2 bg-white` : 'border-slate-100 bg-white hover:border-slate-300'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${theme.bg} shadow-inner flex items-center justify-center text-xl`}>{theme.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-slate-800">{theme.name}</div>
                      <div className="text-xs text-slate-400">Gradiente Suave</div>
                    </div>
                    {pageData.themeId === theme.id && <div className="text-rose-500"><Check size={20} /></div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipografia</label>
              <div className="flex gap-2">
                {FONTS.map(f => (
                  <button
                    key={f.name}
                    onClick={() => handleInputChange('fontName', f.name)}
                    className={`flex-1 py-3 px-2 rounded-xl border text-sm transition-all ${pageData.fontName === f.name ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                  >
                    <span className={f.class}>Ag</span> {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stickers Flutuantes</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={pageData.enableStickers} onChange={(e) => handleInputChange('enableStickers', e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>
              <div className={`grid grid-cols-5 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 transition-opacity ${!pageData.enableStickers ? 'opacity-50 pointer-events-none' : ''}`}>
                {STICKERS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleInputChange('sticker', s)}
                    className={`aspect-square flex items-center justify-center rounded-xl text-xl transition-all ${pageData.sticker === s ? 'bg-white shadow-md scale-110' : 'hover:bg-white hover:shadow-sm'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6 animate-fade-in pb-20 lg:pb-0">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Declaração</label>
              <div className="relative">
                <textarea
                  value={pageData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={8}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all resize-none font-serif text-lg leading-relaxed text-slate-700"
                  placeholder="Escreva algo do fundo do coração..."
                />
                <div className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white/50 px-2 py-1 rounded-md backdrop-blur-sm">
                  {pageData.message.length} chars
                </div>
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-8 animate-fade-in pb-20 lg:pb-0">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon size={14} /> Foto do Casal
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex items-center justify-center w-full h-12 text-rose-600 bg-rose-50 rounded-xl cursor-pointer hover:bg-rose-100 transition-colors border border-rose-200 gap-2 font-medium"
                  >
                    <Upload size={20} /> Carregar Foto (Max 1MB)
                  </label>
                </div>
              </div>

              <div className="relative w-full h-40 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group">
                {pageData.photoUrl ? (
                  <img src={pageData.photoUrl} className="w-full h-full object-cover" onError={(e) => e.target.src = ''} alt="Preview" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">Preview</div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Music size={14} /> Trilha Sonora
              </label>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-slate-400">SELEÇÃO RÁPIDA</label>
                <div className="grid grid-cols-1 gap-2">
                  {MUSIC_PRESETS.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => handleInputChange('spotifyUrl', song.url)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${pageData.spotifyUrl === song.url
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pageData.spotifyUrl === song.url ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <PlayCircle size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold">{song.name}</div>
                        <div className="text-xs opacity-70">{song.artist}</div>
                      </div>
                      {pageData.spotifyUrl === song.url && <Check size={16} className="text-rose-500" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="text-[10px] font-semibold text-slate-400 mb-2 block">OU COLE SEU LINK</label>
                <input
                  type="text"
                  value={pageData.spotifyUrl}
                  onChange={(e) => handleInputChange('spotifyUrl', e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm truncate"
                  placeholder="https://open.spotify.com/track/..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans flex-col lg:flex-row">
      
      {/* MODAL DE LOGIN (SEMPRE PRESENTE NO DOM) */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => setIsAuthModalOpen(false)}
      />

      {/* --- SIDEBAR (EDITOR / LOCK SCREEN) --- */}
      <div className={`w-full lg:w-[450px] bg-white flex flex-col h-full shadow-[20px_0_40px_rgba(0,0,0,0.05)] z-20 relative transition-all duration-300 ${
        mobileView === 'editor' ? 'flex' : 'hidden lg:flex'
      }`}>
        
        {/* Header do Editor */}
        <div className="h-20 px-6 lg:px-8 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
              <Heart size={16} fill="currentColor" />
            </div>
            Editor
          </div>
          <button onClick={() => setStep('landing')} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* CONTEÚDO DINÂMICO (EDITOR OU BLOQUEIO) */}
        {renderSidebarContent()}
        
      </div>

      {/* --- PREVIEW AREA --- */}
      <div className={`flex-1 bg-slate-100 relative flex-col items-center justify-center p-0 lg:p-8 overflow-hidden transition-all duration-500 ${
        mobileView === 'preview' ? 'flex' : 'hidden lg:flex'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Desktop Toggle */}
        <div className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white p-1 rounded-full shadow-lg border border-slate-100 gap-1">
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${previewMode === 'mobile'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-100'
              }`}
          >
            <Smartphone size={14} /> Mobile
          </button>
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${previewMode === 'desktop'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-100'
              }`}
          >
            <Laptop size={14} /> Desktop
          </button>
        </div>

        {/* Mobile Real View */}
        <div className="lg:hidden w-full h-full overflow-y-auto pb-[100px] animate-fade-in relative z-10 custom-scrollbar">
           <RomanticPage data={pageData} isPreview={true} />
        </div>

        {/* Desktop Device Frames */}
        <div className="hidden lg:block relative w-full h-full flex items-center justify-center z-10">
          {previewMode === 'mobile' ? (
            <div className="relative w-full max-w-[380px] h-[750px] bg-slate-900 rounded-[55px] shadow-[0_0_0_12px_#1e293b,0_0_0_14px_#475569,0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-slate-900 overflow-hidden animate-fade-in-up">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30px] w-[140px] bg-black rounded-b-3xl z-50"></div>
              <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
                <RomanticPage data={pageData} isPreview={true} />
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-6xl h-[90%] bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-200 overflow-hidden flex flex-col animate-fade-in-up">
              <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500"></div>
                </div>
                <div className="flex-1 max-w-xl mx-auto bg-white border border-slate-200 rounded-md h-7 flex items-center justify-center text-[10px] text-slate-400 gap-2">
                  <Lock size={8} /> lovebuilder.netlify.app/{pageData.name1.toLowerCase()}-{pageData.name2.toLowerCase()}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <RomanticPage data={pageData} isPreview={true} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 pb-safe z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              mobileView === 'editor' ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Edit3 size={22} strokeWidth={mobileView === 'editor' ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Editar</span>
          </button>

          <div className="w-[1px] h-8 bg-slate-100"></div>

          <button
            onClick={() => setMobileView('preview')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              mobileView === 'preview' ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Eye size={22} strokeWidth={mobileView === 'preview' ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Visualizar</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Editor;