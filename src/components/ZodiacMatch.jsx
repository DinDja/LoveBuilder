import React, { useState } from 'react';
import { ArrowLeft, Heart, Stars, Sparkles, Moon, Sun, Cloud } from 'lucide-react';

const signs = [
  { id: 'aries', name: 'Áries', icon: '♈' },
  { id: 'touro', name: 'Touro', icon: '♉' },
  { id: 'gemeos', name: 'Gêmeos', icon: '♊' },
  { id: 'cancer', name: 'Câncer', icon: '♋' },
  { id: 'leao', name: 'Leão', icon: '♌' },
  { id: 'virgem', name: 'Virgem', icon: '♍' },
  { id: 'libra', name: 'Libra', icon: '♎' },
  { id: 'escorpiao', name: 'Escorpião', icon: '♏' },
  { id: 'sagitario', name: 'Sagitário', icon: '♐' },
  { id: 'capricornio', name: 'Capricórnio', icon: '♑' },
  { id: 'aquario', name: 'Aquário', icon: '♒' },
  { id: 'peixes', name: 'Peixes', icon: '♓' }
];

export default function ZodiacMatch({ onBack, onMatchCreate }) {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = () => {
    if (!sign1 || !sign2) return;

    setCalculating(true);

    // Simula um tempo de "leitura dos astros"
    setTimeout(() => {
      const s1 = signs.find(s => s.id === sign1);
      const s2 = signs.find(s => s.id === sign2);

      const message = `A conexão entre ${s1.name} e ${s2.name} está escrita nas estrelas! ✨\n\nQuando a energia de ${s1.icon} encontra ${s2.icon}, o universo conspira a favor desse amor.`;

      onMatchCreate({
        sign1: s1.name,
        sign2: s2.name,
        message: message
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff0f5] flex flex-col items-center justify-center p-6">
      {/* --- Elementos Decorativos de Fundo --- */}

      {/* Gradientes Suaves (Orbs) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-100/60 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Ícones Flutuantes (Parallax Decorativo) */}
      <div className="absolute top-10 right-10 text-pink-300 animate-pulse delay-700 pointer-events-none">
        <Stars className="w-12 h-12 opacity-50" />
      </div>
      <div className="absolute bottom-20 left-10 text-rose-300 animate-bounce duration-[3000ms] pointer-events-none">
        <Heart className="w-8 h-8 opacity-40 fill-current" />
      </div>
      <div className="absolute top-1/4 left-10 text-pink-200 pointer-events-none rotate-12">
        <Moon className="w-16 h-16 opacity-30" />
      </div>
      <div className="absolute bottom-1/3 right-5 text-orange-200 pointer-events-none -rotate-12">
        <Sun className="w-14 h-14 opacity-40" />
      </div>

      {/* Nuvens Decorativas */}
      <div className="absolute top-5 left-1/3 text-white pointer-events-none">
        <Cloud className="w-24 h-24 opacity-60 fill-white blur-sm" />
      </div>
      <div className="absolute bottom-10 right-1/3 text-white pointer-events-none">
        <Cloud className="w-20 h-20 opacity-50 fill-white blur-sm" />
      </div>

      {/* --- Conteúdo Principal --- */}
      <div className="w-full max-w-md relative z-10">

        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-rose-500 hover:text-rose-700 transition-colors font-medium bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm w-fit shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>

        {/* Card Principal */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-[0_20px_40px_-15px_rgba(255,182,193,0.5)] relative overflow-hidden">

          {/* Brilho Superior no Card */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 opacity-50" />

          {/* Cabeçalho */}
          <div className="text-center mb-10 relative">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-pink-100 to-rose-50 rounded-2xl mb-4 shadow-inner ring-4 ring-white">
              <Sparkles className="w-8 h-8 text-rose-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-rose-900 tracking-tight">
              Match Astral
            </h1>
            <p className="text-rose-400 font-medium mt-2 text-sm">
              Conecte seus corações pelas estrelas
            </p>
          </div>

          {/* Seletores */}
          <div className="space-y-6 relative">
            {/* Linha conectora decorativa */}
            <div className="absolute left-1/2 top-10 bottom-10 w-0.5 border-l-2 border-dashed border-rose-200 -translate-x-1/2 z-0" />

            {/* Input 1 */}
            <div className="relative z-10 group">
              <label className="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 ml-4">
                Seu Signo
              </label>
              <div className="relative transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-xl">
                    {signs.find(s => s.id === sign1)?.icon || '✨'}
                  </span>
                </div>
                <select
                  value={sign1}
                  onChange={(e) => setSign1(e.target.value)}
                  className="w-full bg-white border-2 border-pink-100 text-rose-700 text-lg rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100 transition-all appearance-none cursor-pointer shadow-sm font-medium"
                >
                  <option value="" className="text-gray-400">Escolha o signo...</option>
                  {signs.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Heart className="w-4 h-4 text-pink-200 fill-current" />
                </div>
              </div>
            </div>

            {/* Divisor Central (Coração) */}
            <div className="relative z-20 flex justify-center py-2">
              <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-full p-2 shadow-lg shadow-rose-200 ring-4 ring-white transform transition-transform hover:rotate-12 hover:scale-110">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
            </div>

            {/* Input 2 */}
            <div className="relative z-10 group">
              <label className="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 ml-4">
                Signo do Amor
              </label>
              <div className="relative transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-xl">
                    {signs.find(s => s.id === sign2)?.icon || '🌙'}
                  </span>
                </div>
                <select
                  value={sign2}
                  onChange={(e) => setSign2(e.target.value)}
                  className="w-full bg-white border-2 border-pink-100 text-rose-700 text-lg rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100 transition-all appearance-none cursor-pointer shadow-sm font-medium"
                >
                  <option value="" className="text-gray-400">Escolha o signo...</option>
                  {signs.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Stars className="w-4 h-4 text-pink-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Botão de Ação */}
          <div className="mt-10">
            <button
              onClick={handleCalculate}
              disabled={!sign1 || !sign2 || calculating}
              className="group relative w-full overflow-hidden rounded-2xl p-[2px] focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:shadow-xl hover:shadow-rose-300/40 transform hover:-translate-y-1"
            >
              {/* Borda Gradiente Animada */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 animate-gradient-x" />

              <div className="relative bg-white rounded-[14px] px-6 py-4 transition-all group-hover:bg-opacity-90">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex items-center justify-center gap-3">
                  {calculating ? (
                    <>
                      <Sparkles className="w-6 h-6 text-rose-500 animate-spin" />
                      <span className="font-bold text-rose-600">Consultando os Astros...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-rose-600 text-lg">Calcular Amor</span>
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
                    </>
                  )}
                </div>
              </div>
            </button>

            {/* Texto de rodapé */}
            <p className="text-center text-xs text-rose-300 mt-4 font-medium flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              Baseado na energia cósmica real
              <Sparkles className="w-3 h-3" />
            </p>
          </div>
        </div>
      </div>

      {/* Estilos para animações personalizadas se necessário */}
      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}