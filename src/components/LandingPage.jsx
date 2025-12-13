import React, { useState, useEffect } from 'react';
import { 
  Heart, Music, Calendar, Sparkles, Loader, LogOut, Grid, 
  Settings, ChevronDown, Eye, ArrowRight, User, Quote, 
  Menu, X // Importei Menu e X para o mobile
} from 'lucide-react';
import { useLovePage } from '../hooks/useLovePage';
import AuthModal from './AuthModal';
// --- IMPORTAÇÕES ADICIONAIS NECESSÁRIAS ---
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const LandingPage = ({ setStep }) => {
  const { loadPopularPages } = useLovePage();
  const [popularPages, setPopularPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // --- ESTADO PARA MENU MOBILE ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- ESTADO LOCAL PARA O USUÁRIO ---
  const [currentUser, setCurrentUser] = useState(null);

  // --- EFEITO PARA MONITORAR AUTENTICAÇÃO ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // --- FUNÇÃO DE LOGOUT ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      setMobileMenuOpen(false); // Fecha menu mobile ao sair
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  };

  useEffect(() => {
    const fetchPopularPages = async () => {
      try {
        const result = await loadPopularPages(3);
        if (result.success) {
          setPopularPages(result.pages || []);
        }
      } catch (error) {
        console.error('Erro ao carregar páginas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPages();
  }, []);

  // Obter iniciais do nome para avatar
  const getUserInitials = () => {
    if (!currentUser) return 'U';
    if (currentUser.displayName) {
      const names = currentUser.displayName.split(' ');
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    return currentUser.email ? currentUser.email[0].toUpperCase() : 'U';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
        }}
      />

      {/* NAVBAR */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group z-50" onClick={() => setStep('landing')}>
              <div className="from-rose-500 to-orange-500 bg-gradient-to-br text-white p-2 rounded-xl shadow-lg shadow-rose-200 group-hover:rotate-12 transition-transform duration-300">
                <Heart size={20} fill="white" className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">Love<span className="text-rose-600">Builder</span></span>
            </div>

            {/* Menu Desktop Central */}
            <div className="hidden md:flex items-center gap-8">
         
            </div>

            {/* Lado Direito Desktop - Botões/Autenticação */}
            <div className="hidden md:flex items-center gap-4">
              {currentUser ? (
                // --- USUÁRIO LOGADO DESKTOP ---
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-sm group"
                  >
                    {/* Avatar */}
                    <div className="relative">
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt={currentUser.displayName || currentUser.email}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {getUserInitials()}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    {/* Info */}
                    <div className="text-left">
                      <div className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">
                        {currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuário'}
                      </div>
                      <div className="text-xs text-slate-500">Online</div>
                    </div>

                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Desktop */}
                  {showUserMenu && (
                    <>
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-fade-in-up">
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Logado como</p>
                          <p className="text-sm font-medium text-slate-800 truncate">{currentUser.email}</p>
                        </div>

                        <div className="py-2">
                          <button
                            onClick={() => {
                              setStep('builder');
                              setShowUserMenu(false);
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-rose-50 transition-colors flex items-center gap-3 text-slate-700 hover:text-rose-700"
                          >
                            <Heart size={18} /> Criar Nova Página
                          </button>

                          <button
                            onClick={() => {
                              setStep('dashboard');
                              setShowUserMenu(false);
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 text-slate-700 hover:text-blue-700"
                          >
                            <Grid size={18} /> Minhas Páginas
                          </button>
                        </div>

                        <div className="border-t border-slate-100 my-1"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 text-red-600"
                        >
                          <LogOut size={18} /> Sair
                        </button>
                      </div>
                      {/* Overlay para fechar */}
                      <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowUserMenu(false)} />
                    </>
                  )}
                </div>
              ) : (
                // --- USUÁRIO NÃO LOGADO DESKTOP ---
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-5 py-2.5 text-slate-600 hover:text-rose-600 font-bold text-sm transition-colors"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => setStep('builder')}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-rose-200 hover:shadow-rose-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <Heart size={16} fill="currentColor" />
                    Criar Página
                  </button>
                </div>
              )}
            </div>

            {/* BOTÃO MOBILE HAMBURGUER */}
            <div className="flex md:hidden items-center gap-4">
               {/* Se estiver logado, mostra avatar pequeno no header mobile também */}
               {currentUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {getUserInitials()}
                  </div>
               )}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* --- MENU MOBILE EXPANSÍVEL (PREMIUM) --- */}
        <div className={`md:hidden absolute w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-6 space-y-6">
            
            {/* Links de Navegação */}

            <hr className="border-slate-100" />

            {/* Área do Usuário Mobile */}
            {currentUser ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-bold text-slate-800 truncate">{currentUser.displayName || 'Usuário'}</div>
                    <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setStep('builder');
                      setMobileMenuOpen(false);
                    }}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-rose-50 rounded-xl text-rose-700 font-medium active:scale-95 transition-transform"
                  >
                    <Heart size={24} />
                    <span>Criar</span>
                  </button>
                  <button
                    onClick={() => {
                      setStep('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-50 rounded-xl text-blue-700 font-medium active:scale-95 transition-transform"
                  >
                    <Grid size={24} />
                    <span>Minhas Páginas</span>
                  </button>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full py-3 flex items-center justify-center gap-2 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut size={18} /> Sair da conta
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setStep('builder');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-rose-600 active:bg-rose-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
                >
                  <Heart size={20} fill="currentColor" />
                  Criar Minha Página
                </button>
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50"
                >
                  Entrar
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-12 md:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 overflow-hidden">
        <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Surpreenda seu amor com um <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">site eterno.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Crie uma página romântica personalizada em minutos. Contador de relacionamento, playlist do Spotify, fotos e mensagens emocionantes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => setStep('builder')}
              className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white text-lg rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group w-full sm:w-auto">
              Começar Agora <Heart className="group-hover:animate-ping inline-flex opacity-30" size={20} />
            </button>
            <button
              onClick={() => setStep('example')}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-lg rounded-full font-bold shadow-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
              Ver Exemplo
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 mt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-[3px] border-white flex items-center justify-center text-xs overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="font-medium">+2.000 casais apaixonados usam</p>
          </div>
        </div>

        {/* Card Flutuante Hero */}
        <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-200 rounded-full filter blur-3xl opacity-30 animate-pulse hidden md:block"></div>
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse delay-700 hidden md:block"></div>
          
          <div className="relative bg-white p-2 md:p-3 rounded-[2rem] shadow-2xl transform rotate-0 lg:rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-100 mx-auto">
            <div className="rounded-[1.5rem] overflow-hidden bg-slate-900 h-[400px] md:h-[500px] w-full relative group">
              <img
                src="https://static.beebom.com/wp-content/uploads/2025/04/Hancock-in-love.jpg?w=1250&quality=75"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                alt="Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-rose-900/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Luffy & Boa</h3>
                <p className="text-rose-100 mb-4 text-sm md:text-base">Juntos há 3 anos, 2 meses e 12 dias</p>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex items-center gap-3 border border-white/20">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <Music size={20} />
                  </div>
                  <div className="text-sm overflow-hidden">
                    <p className="font-bold truncate">Nossa Música</p>
                    <p className="opacity-80 truncate">Ed Sheeran - Perfect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Mockup Browser */}
      <div className="relative w-full max-w-5xl mx-auto px-4 mb-20">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-slate-900 rounded-xl md:rounded-2xl p-1 md:p-2 shadow-2xl border border-slate-800">
          <div className="bg-slate-800 rounded-t-lg md:rounded-t-xl p-2 md:p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="inline-block px-4 py-1 bg-slate-900 rounded-md text-[10px] text-slate-400 font-mono truncate max-w-[200px] md:max-w-none">
                lovebuilder.netlify.app/tony-pepper
              </div>
            </div>
          </div>
          <div className="aspect-[16/9] bg-white rounded-b-md md:rounded-b-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2000&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              alt="Preview"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <h3 className="text-2xl md:text-4xl font-serif text-slate-800 mb-2 md:mb-4">Tony & Pepper</h3>
                <div className="flex flex-wrap gap-2 md:gap-4 justify-center text-rose-600 font-bold text-sm md:text-xl">
                  <span>02 Anos</span>:<span>05 Meses</span>:<span>12 Dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEÇÃO DE PÁGINAS POPULARES (MOBILE OPTIMIZED) --- */}
      <section id="popular" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-rose-200 opacity-20 transform rotate-12"><Heart size={60} md:size={100} fill="currentColor" /></div>
          <div className="absolute bottom-20 right-10 text-purple-200 opacity-20 transform -rotate-12"><Heart size={80} md:size={120} fill="currentColor" /></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-600 text-xs font-bold tracking-wider uppercase mb-3">Inspiração</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Histórias de Amor Reais
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
              Veja como outros casais estão eternizando seus momentos mais especiais.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-3xl mx-auto">
              <Loader className="w-12 h-12 animate-spin text-rose-600 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Buscando histórias inspiradoras...</p>
            </div>
          ) : (
            // Grid responsivo: 1 coluna no mobile, 2 no tablet pequeno, 3 no desktop
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {popularPages.length > 0 ? (
                popularPages.map((page) => (
                  <div key={page.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-rose-100 transform hover:-translate-y-2">

                    {/* Imagem */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      {page.photoUrl ? (
                        <img
                          src={page.photoUrl}
                          alt={`${page.name1} e ${page.name2}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}

                      {/* Fallback */}
                      <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 to-orange-100 ${page.photoUrl ? 'hidden' : 'flex'}`}>
                        <div className="text-center">
                          <div className="flex justify-center -space-x-4 mb-3">
                            <div className="w-12 h-12 rounded-full bg-rose-300 border-2 border-white flex items-center justify-center text-white font-bold text-xl">{page.name1[0]}</div>
                            <div className="w-12 h-12 rounded-full bg-orange-300 border-2 border-white flex items-center justify-center text-white font-bold text-xl">{page.name2[0]}</div>
                          </div>
                          <Heart className="w-8 h-8 text-rose-400 mx-auto animate-pulse" fill="currentColor" />
                        </div>
                      </div>

                      {/* Stats Badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm text-xs font-bold text-slate-700">
                          <Eye size={14} className="text-blue-500" />
                          {page.views || 0}
                        </div>
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm text-xs font-bold text-slate-700">
                          <Heart size={14} className="text-rose-500" fill="#f43f5e" />
                          {page.likes || 0}
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-6 relative">
                      <h3 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors flex items-center gap-2 truncate">
                        {page.name1} <span className="text-rose-400 text-sm">&</span> {page.name2}
                      </h3>

                      <div className="relative mb-6">
                        <span className="absolute -top-2 -left-2 text-4xl text-rose-100 font-serif"><Quote /></span>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 pl-2 relative z-10 italic">
                          {page.message || 'Uma linda história de amor começando agora...'}
                        </p>
                      </div>

                      <a
                        href={`/love/${page.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors group/link p-2 -ml-2 rounded-lg hover:bg-rose-50"
                      >
                        Ver História Completa
                        <ArrowRight size={16} className="transform transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-20 text-center bg-white rounded-3xl shadow-sm border border-slate-100">
                  <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Seja o primeiro!</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Ainda não há páginas em destaque. Crie a sua agora e apareça aqui para inspirar outros casais.
                  </p>
                  <button
                    onClick={() => setStep('builder')}
                    className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1"
                  >
                    Criar Minha Página
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="p-6 md:p-8 rounded-2xl bg-rose-50 border border-rose-100 transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Calendar />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Contador Preciso</h3>
            <p className="text-slate-600">Nunca mais esqueça quanto tempo exato vocês estão juntos. Segundos, minutos e horas.</p>
          </div>
          <div className="p-6 md:p-8 rounded-2xl bg-purple-50 border border-purple-100 transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Music />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Trilha Sonora</h3>
            <p className="text-slate-600">Integração direta com Spotify. A música do casal tocando enquanto o amor flui.</p>
          </div>
          <div className="p-6 md:p-8 rounded-2xl bg-orange-50 border border-orange-100 transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Sparkles />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Totalmente Personalizável</h3>
            <p className="text-slate-600">Cores, fotos, fontes e mensagens. Tudo para deixar a página com a cara de vocês.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;