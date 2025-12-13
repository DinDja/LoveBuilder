import React from 'react';
import { Heart, Music, Calendar, Sparkles, ArrowRight } from 'lucide-react';

const LandingPage = ({ setStep }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="from-rose-500 to-orange-500 text-white p-2 rounded-xl shadow-lg shadow-rose-200 group-hover:rotate-12 transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="url(#paint0_linear_brand)" />

              <path d="M32 47.5C32 47.5 44 37.9 48.5 31C51.5 26.5 50.5 20 45.5 19C41.5 18.2 36.5 21 32 25C27.5 21 22.5 18.2 18.5 19C13.5 20 12.5 26.5 15.5 31C20 37.9 32 47.5 32 47.5Z" fill="white" />

              <defs>
                <linearGradient id="paint0_linear_brand" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#E11D48" /> <stop offset="1" stop-color="#F97316" /> </linearGradient>
              </defs>
            </svg>           </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Love<span className="text-rose-600">Builder</span></span>
        </div>
        <button
          onClick={() => setStep('builder')}
          className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-rose-200">
          Criar Minha Página
        </button>
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
              className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white text-lg rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Começar Agora <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-lg rounded-full font-bold shadow-sm transition-colors flex items-center justify-center gap-2">
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
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                alt="Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Ana & João</h3>
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
              <div className="inline-block px-4 py-1 bg-slate-900 rounded-md text-[10px] text-slate-400 font-mono">lovebuilder.com/tony-pepper</div>
            </div>
          </div>
          <div className="aspect-[16/9] bg-white rounded-b-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2000&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
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