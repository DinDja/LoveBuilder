import React, { useState, useEffect } from 'react';
import { Heart, Music, Calendar, Sparkles, Loader, LogOut, Grid, Settings, ChevronDown } from 'lucide-react';
import { useLovePage } from '../hooks/useLovePage';
import AuthModal from './AuthModal';
// --- IMPORTAÇÕES ADICIONAIS NECESSÁRIAS ---
import { auth } from '../firebase/config'; // Sua configuração do firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';

const LandingPage = ({ setStep }) => { // Removi user e onLogout das props, vamos gerenciar aqui
  const { loadPopularPages } = useLovePage();
  const [popularPages, setPopularPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // --- ESTADO LOCAL PARA O USUÁRIO ---
  const [currentUser, setCurrentUser] = useState(null);

  // --- EFEITO PARA MONITORAR AUTENTICAÇÃO ---
  useEffect(() => {
    // Esse listener dispara automaticamente sempre que o usuário loga ou desloga
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Limpa o listener quando o componente desmonta
    return () => unsubscribe();
  }, []);

  // --- FUNÇÃO DE LOGOUT ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // O listener acima vai setar currentUser como null automaticamente
      setShowUserMenu(false);
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
          // Não precisamos passar o user aqui manualmente, 
          // o onAuthStateChanged vai capturar a mudança automaticamente
          setIsAuthModalOpen(false);
        }}
      />

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6  mx-auto border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setStep('landing')}>
          <div className="from-rose-500 to-orange-500 text-white p-2 rounded-xl shadow-lg shadow-rose-200 group-hover:rotate-12 transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="url(#paint0_linear_brand)" />
              <path d="M32 47.5C32 47.5 44 37.9 48.5 31C51.5 26.5 50.5 20 45.5 19C41.5 18.2 36.5 21 32 25C27.5 21 22.5 18.2 18.5 19C13.5 20 12.5 26.5 15.5 31C20 37.9 32 47.5 32 47.5Z" fill="white" />
              <defs>
                <linearGradient id="paint0_linear_brand" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E11D48" />
                  <stop offset="1" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Love<span className="text-rose-600">Builder</span></span>
        </div>

        {/* Menu Central */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 hover:text-rose-600 font-medium text-sm transition-colors">
            Recursos
          </a>
          <a href="#popular" className="text-slate-600 hover:text-rose-600 font-medium text-sm transition-colors">
            Páginas Populares
          </a>
          <a href="#how-to" className="text-slate-600 hover:text-rose-600 font-medium text-sm transition-colors">
            Como Funciona
          </a>
        </div>

        {/* Lado Direito - Botões/Autenticação */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            // --- USUÁRIO LOGADO ---
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
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {getUserInitials()}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* Info */}
                <div className="text-left hidden md:block">
                  <div className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuário'}
                  </div>
                  <div className="text-xs text-slate-500">Online</div>
                </div>

                <ChevronDown size={16} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-fade-in-up">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-bold text-slate-800 truncate">
                          {currentUser.displayName || 'Usuário'}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {currentUser.email || 'usuario@email.com'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        setStep('builder');
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                        <Heart size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">Criar Nova Página</div>
                        <div className="text-xs text-slate-500">Surpreenda seu amor</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <Grid size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800" onClick={() => {
                          setStep('dashboard'); // Isso agora ativará o case 'dashboard' no App
                          setShowUserMenu(false);
                        }}>Minhas Páginas</div>
                        <div className="text-xs text-slate-500">Gerencie suas criações</div>
                      </div>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 group text-rose-600"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                      <LogOut size={16} />
                    </div>
                    <div>
                      <div className="font-medium">Sair</div>
                      <div className="text-xs opacity-70">Encerrar sessão</div>
                    </div>
                  </button>
                </div>
              )}

              {showUserMenu && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
              )}
            </div>
          ) : (
            // --- USUÁRIO NÃO LOGADO ---
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 text-slate-700 hover:text-rose-600 font-medium text-sm transition-colors hidden md:block"
              >
                Entrar
              </button>
              <button
                onClick={() => setStep('builder')}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-rose-200 flex items-center gap-2"
              >
                <Heart size={16} className="hidden sm:inline" />
                Criar Minha Página
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Surpreenda seu amor com um <span className="text-rose-500">site eterno.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
            Crie uma página romântica personalizada em minutos. Contador de relacionamento, playlist do Spotify, fotos e mensagens emocionantes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setStep('builder')}
              className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white text-lg rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Começar Agora <Heart className="group-hover:animate-ping inline-flex opacity-30" size={20} />
            </button>
            <button
              onClick={() => setStep('example')}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-lg rounded-full font-bold shadow-sm transition-colors flex items-center justify-center gap-2">
              Ver Exemplo
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p>+2.000 casais apaixonados usam</p>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse delay-700"></div>
          <div className="relative bg-white p-2 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-100">
            <div className="rounded-2xl overflow-hidden bg-slate-100 h-[500px] w-full relative">
              <img
                src="https://static.beebom.com/wp-content/uploads/2025/04/Hancock-in-love.jpg?w=1250&quality=75"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                alt="Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Luffy & Boa</h3>
                <p className="text-rose-100 mb-4">Juntos há 3 anos, 2 meses e 12 dias</p>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Music size={20} />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">Nossa Música</p>
                    <p className="opacity-80">Ed Sheeran - Perfect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Mockup */}
      <div className="relative w-full max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-800">
          <div className="bg-slate-800 rounded-t-xl p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="inline-block px-4 py-1 bg-slate-900 rounded-md text-[10px] text-slate-400 font-mono">lovebuilder.netlify.app/tony-pepper</div>
            </div>
          </div>
          <div className="aspect-[16/9] bg-white rounded-b-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2000&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              alt="Preview"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-4xl font-serif text-slate-800 mb-2">Tony & Pepper</h3>
                <div className="flex gap-4 justify-center text-rose-600 font-bold text-xl">
                  <span>02 Anos</span>:<span>05 Meses</span>:<span>12 Dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Páginas de Amor Criadas Recentemente
            </h2>
            <p className="text-slate-600">
              Veja como outros casais estão expressando seu amor
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 animate-spin text-rose-600 mx-auto" />
              <p className="mt-2 text-slate-600">Carregando páginas...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {popularPages.length > 0 ? (
                popularPages.map((page) => (
                  <div key={page.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                    <div className="aspect-video bg-slate-100 relative">
                      {page.photoUrl ? (
                        <img
                          src={page.photoUrl}
                          alt={`${page.name1} e ${page.name2}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f1f5f9"/><text x="200" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="%2394a3b8">❤️</text></svg>';
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                          <Heart size={32} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div>
                          <h3 className="text-white font-bold text-xl">
                            {page.name1} & {page.name2}
                          </h3>
                          <p className="text-rose-200 text-sm">
                            {page.views || 0} visualizações
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                        {page.message?.substring(0, 100) || 'Uma linda história de amor...'}...
                      </p>
                      <a
                        href={`/love/${page.slug}`}
                        className="text-rose-600 hover:text-rose-700 text-sm font-semibold"
                      >
                        Ver página completa →
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Heart className="w-12 h-12 text-rose-200 mx-auto mb-4" />
                  <p className="text-slate-600">Ainda não há páginas para mostrar. Seja o primeiro!</p>
                  <button
                    onClick={() => setStep('builder')}
                    className="mt-4 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors"
                  >
                    Criar Primeira Página
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4">
              <Calendar />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Contador Preciso</h3>
            <p className="text-slate-600">Nunca mais esqueça quanto tempo exato vocês estão juntos. Segundos, minutos e horas.</p>
          </div>
          <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Music />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Trilha Sonora</h3>
            <p className="text-slate-600">Integração direta com Spotify. A música do casal tocando enquanto o amor flui.</p>
          </div>
          <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
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