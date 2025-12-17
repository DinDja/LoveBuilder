import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Stars, Sparkles, Moon, Sun, Cloud, Flame, Droplets, Wind, Mountain, Infinity as InfinityIcon, Lock, Compass, Anchor, Waves, ScrollText, Share2 } from 'lucide-react';

// --- Dados Astrológicos (Mantidos) ---
const signsData = [
  { id: 'aries', name: 'Áries', icon: '♈', element: 'fogo', modality: 'cardeal', polarity: 'yang', ruler: 'Marte', dates: '21 Mar - 19 Abr', keywords: ['Iniciativa', 'Coragem', 'Impulso'] },
  { id: 'touro', name: 'Touro', icon: '♉', element: 'terra', modality: 'fixo', polarity: 'yin', ruler: 'Vênus', dates: '20 Abr - 20 Mai', keywords: ['Estabilidade', 'Prazer', 'Resistência'] },
  { id: 'gemeos', name: 'Gêmeos', icon: '♊', element: 'ar', modality: 'mutavel', polarity: 'yang', ruler: 'Mercúrio', dates: '21 Mai - 20 Jun', keywords: ['Comunicação', 'Curiosidade', 'Dualidade'] },
  { id: 'cancer', name: 'Câncer', icon: '♋', element: 'agua', modality: 'cardeal', polarity: 'yin', ruler: 'Lua', dates: '21 Jun - 22 Jul', keywords: ['Emoção', 'Proteção', 'Intuição'] },
  { id: 'leao', name: 'Leão', icon: '♌', element: 'fogo', modality: 'fixo', polarity: 'yang', ruler: 'Sol', dates: '23 Jul - 22 Ago', keywords: ['Expressão', 'Carisma', 'Orgulho'] },
  { id: 'virgem', name: 'Virgem', icon: '♍', element: 'terra', modality: 'mutavel', polarity: 'yin', ruler: 'Mercúrio', dates: '23 Ago - 22 Set', keywords: ['Análise', 'Serviço', 'Perfeccionismo'] },
  { id: 'libra', name: 'Libra', icon: '♎', element: 'ar', modality: 'cardeal', polarity: 'yang', ruler: 'Vênus', dates: '23 Set - 22 Out', keywords: ['Harmonia', 'Relação', 'Justiça'] },
  { id: 'escorpiao', name: 'Escorpião', icon: '♏', element: 'agua', modality: 'fixo', polarity: 'yin', ruler: 'Plutão/Marte', dates: '23 Out - 21 Nov', keywords: ['Intensidade', 'Transformação', 'Mistério'] },
  { id: 'sagitario', name: 'Sagitário', icon: '♐', element: 'fogo', modality: 'mutavel', polarity: 'yang', ruler: 'Júpiter', dates: '22 Nov - 21 Dez', keywords: ['Expansão', 'Busca', 'Otimismo'] },
  { id: 'capricornio', name: 'Capricórnio', icon: '♑', element: 'terra', modality: 'cardeal', polarity: 'yin', ruler: 'Saturno', dates: '22 Dez - 19 Jan', keywords: ['Ambição', 'Estrutura', 'Disciplina'] },
  { id: 'aquario', name: 'Aquário', icon: '♒', element: 'ar', modality: 'fixo', polarity: 'yang', ruler: 'Urano/Saturno', dates: '20 Jan - 18 Fev', keywords: ['Inovação', 'Originalidade', 'Liberdade'] },
  { id: 'peixes', name: 'Peixes', icon: '♓', element: 'agua', modality: 'mutavel', polarity: 'yin', ruler: 'Netuno/Júpiter', dates: '19 Fev - 20 Mar', keywords: ['Sonho', 'Empatia', 'Transcendência'] }
];

// --- Helpers Visuais ---
const getElementIcon = (element) => {
  switch (element) {
    case 'fogo': return <Flame className="w-4 h-4 text-orange-500" />;
    case 'agua': return <Droplets className="w-4 h-4 text-blue-500" />;
    case 'ar': return <Wind className="w-4 h-4 text-sky-400" />;
    case 'terra': return <Mountain className="w-4 h-4 text-emerald-500" />;
    default: return <Stars className="w-4 h-4" />;
  }
};

const getModalityIcon = (modality) => {
  switch (modality) {
    case 'cardeal': return <Compass className="w-3 h-3 text-rose-300" title="Cardeal (Iniciador)" />;
    case 'fixo': return <Anchor className="w-3 h-3 text-purple-300" title="Fixo (Estabilizador)" />;
    case 'mutavel': return <Waves className="w-3 h-3 text-sky-300" title="Mutável (Adaptável)" />;
    default: return null;
  }
};

// --- Motor de Cálculo (Mantido) ---
const calculateDeepSinastry = (s1, s2) => {
  let score = 60;
  let mentalDynamics = "";
  let emotionalConnection = "";
  let longTermPotential = "";
  let cosmicChallenges = "";

  const elements = [s1.element, s2.element].sort();
  const elementPair = `${elements[0]}_${elements[1]}`;

  const elementalRules = {
    'fogo_fogo': { bonus: 25, text: "Uma explosão de energia compartilhada. A paixão é instantânea e a vida nunca é entediante, mas cuidado com o burnout." },
    'ar_fogo': { bonus: 30, text: "O ar alimenta o fogo. O intelecto de um estimula a ação do outro. Uma combinação dinâmica e inspiradora." },
    'fogo_terra': { bonus: 5, text: "A terra pode sufocar o fogo, ou o fogo pode queimar a terra. Requer paciência: um traz visão, o outro a realização." },
    'agua_fogo': { bonus: -10, text: "Vapor e intensidade. A emoção da água pode apagar o entusiasmo do fogo. Altamente passional, mas volátil." },
    'terra_terra': { bonus: 30, text: "Fundamentos sólidos. Ambos valorizam a segurança e o tangível. Uma construção lenta, mas inabalável." },
    'ar_terra': { bonus: 0, text: "O prático encontra o teórico. Podem ter dificuldade em entender as prioridades um do outro sem muito diálogo." },
    'agua_terra': { bonus: 35, text: "A água nutre a terra, tornando-a fértil. Uma conexão profunda, carinhosa e produtiva. Encaixe natural." },
    'ar_ar': { bonus: 25, text: "Conexão mental instantânea. O fluxo de ideias é incessante. O desafio é trazer a relação para o mundo real/emocional." },
    'agua_ar': { bonus: -5, text: "A lógica tenta dissecar o sentimento. O ar pode parecer frio para a água, e a água dramática para o ar." },
    'agua_agua': { bonus: 30, text: "Fusão psíquica. A compreensão emocional é telepática, mas há risco de se afogarem nas emoções alheias." }
  };

  score += elementalRules[elementPair].bonus;
  emotionalConnection = elementalRules[elementPair].text;

  let modalityDynamicText = "";
  if (s1.modality === s2.modality) {
    if (s1.modality === 'fixo') {
      score -= 10;
      modalityDynamicText = "Confronto de Titãs. Ambos são teimosos e resistem à mudança. O maior desafio será quem cede primeiro.";
    } else if (s1.modality === 'cardeal') {
      score += 5;
      modalityDynamicText = "Dois líderes natos. Podem competir pelo controle, mas se unirem forças, são imparáveis.";
    } else {
      score += 15;
      modalityDynamicText = "Extremamente adaptáveis e flexíveis. A relação flui facilmente, mas pode faltar direção ou foco a longo prazo.";
    }
  } else {
    if ((s1.modality === 'cardeal' && s2.modality === 'mutavel') || (s1.modality === 'mutavel' && s2.modality === 'cardeal')) {
      score += 20;
      modalityDynamicText = "Excelente fluxo. O Cardeal inicia os projetos e o Mutável ajuda a adaptar e finalizar. Grande sinergia.";
    } else if ((s1.modality === 'fixo' && s2.modality === 'cardeal') || (s1.modality === 'cardeal' && s2.modality === 'fixo')) {
      score -= 5;
      modalityDynamicText = "O Cardeal quer começar coisas novas, o Fixo quer manter como está. Tensão entre inovação e conservação.";
    } else {
      score += 5;
      modalityDynamicText = "O Fixo traz estabilidade para a inquietude do Mutável. O Mutável traz flexibilidade para a rigidez do Fixo. Complementar.";
    }
  }

  const samePolarity = s1.polarity === s2.polarity;
  score += samePolarity ? 10 : 15;

  score = Math.max(10, Math.min(99, score + Math.floor(Math.random() * 8) - 4));

  if (score >= 85) {
    mentalDynamics = "A comunicação transcende palavras. Vocês compartilham uma visão de mundo que torna cada conversa uma descoberta fascinante.";
    longTermPotential = "Potencial para 'Alma Gêmea'. Esta é uma daquelas conexões raras que parecem destinadas a durar e evoluir através das décadas.";
    cosmicChallenges = "O risco de se fundirem tanto que perdem as identidades individuais. Lembrem-se de cultivar espaços separados.";
  } else if (score >= 65) {
    mentalDynamics = "Estimulante e saudável. Vocês têm diferenças suficientes para manter o interesse, mas semelhanças suficientes para se entenderem.";
    longTermPotential = "Muito forte. Com respeito mútuo pelas diferenças de ritmo, construiram algo duradouro e próspero.";
    cosmicChallenges = "Momentos onde a teimosia de um ou a volatilidade do outro exigirão paciência consciente para não escalar conflitos.";
  } else {
    mentalDynamics = "Requer tradução constante. Vocês operam em frequências mentais diferentes, o que é fascinante, mas exige esforço ativo de escuta.";
    longTermPotential = "Uma jornada de aprendizado intenso. Se ambos estiverem dispostos a sair da zona de conforto, será a relação que mais os fará crescer.";
    cosmicChallenges = `Gerenciar o atrito natural entre as naturezas ${s1.element} e ${s2.element}, e aceitar que o outro nunca pensará exatamente como você.`;
  }

  return {
    percentage: score,
    title: score > 80 ? "Alinhamento Cármico" : score > 60 ? "Conexão Promissora" : "Desafio Evolutivo",
    summary: `O encontro entre a energia ${s1.polarity === 'yang' ? 'ativa' : 'receptiva'} de ${s1.name} e a natureza ${s2.polarity === 'yang' ? 'ativa' : 'receptiva'} de ${s2.name}.`,
    sections: {
      emotional: { title: "Química Elemental", text: emotionalConnection },
      mental: { title: "Sintonia Mental", text: mentalDynamics },
      dynamics: { title: "Ritmo da Relação", text: modalityDynamicText },
      longTerm: { title: "Horizonte Cósmico", text: longTermPotential },
      challenges: { title: "Lições a Aprender", text: cosmicChallenges }
    },
    elementalPair: `${s1.element} + ${s2.element}`,
    keywords: [...s1.keywords.slice(0, 2), ...s2.keywords.slice(0, 2)],
  };
};

export default function ZodiacMatchV3({ onBack, onMatchCreate }) {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // ESTADO DO RESULTADO (A peça que faltava)
  const [matchResult, setMatchResult] = useState(null);

  const loadingTexts = [
    "Mapeando as posições planetárias...",
    "Analisando a interação elemental...",
    "Calculando a fricção das modalidades...",
    "Lendo os aspectos de Vênus e Marte...",
    "Sintetizando o destino cósmico..."
  ];

  useEffect(() => {
    let interval;
    if (calculating) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingTexts.length);
      }, 600);
    }
    return () => clearInterval(interval);
  }, [calculating]);

  const handleCalculate = () => {
    if (!sign1 || !sign2) return;

    setCalculating(true);

    setTimeout(() => {
      const s1 = signsData.find(s => s.id === sign1);
      const s2 = signsData.find(s => s.id === sign2);

      const richAnalysis = calculateDeepSinastry(s1, s2);

      const fullReportPayload = {
        sign1Data: s1,
        sign2Data: s2,
        ...richAnalysis,
        timestamp: new Date().toISOString()
      };

      // EM VEZ DE ENVIAR DIRETO, SALVAMOS NO ESTADO LOCAL
      setMatchResult(fullReportPayload);
      setCalculating(false);
    }, 3500);
  };

  // Função para finalmente enviar ao App e ir ao Builder
  const handleProceedToBuilder = () => {
    if (onMatchCreate && matchResult) {
      onMatchCreate(matchResult);
    }
  };


  const renderSignDetails = (signId) => {
    const s = signsData.find(id => id.id === signId);
    if (!s) return <span className="text-white/40 text-xs flex items-center gap-1"><Lock size={12} /> Aguardando seleção</span>;
    return (
      <div className="flex items-center gap-3 text-xs text-purple-200/80">
        <span className="flex items-center gap-1 capitalize">{getElementIcon(s.element)} {s.element}</span>
        <span className="w-px h-3 bg-white/20"></span>
        <span className="flex items-center gap-1 capitalize">{getModalityIcon(s.modality)} {s.modality}</span>
      </div>
    );
  }

  // --- TELA DE RESULTADO (Renderização Condicional) ---
  if (matchResult) {
    return (
      <div className="min-h-screen relative overflow-y-auto bg-[#0F0518] flex flex-col items-center justify-start p-4 sm:p-6 font-sans antialiased">
        {/* Background Result */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none fixed">
          <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">

          {/* Header de Ação */}
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => setMatchResult(null)} className="text-white/50 hover:text-white flex items-center gap-2 text-sm">
              <ArrowLeft size={16} /> Novo Cálculo
            </button>
            <div className="text-xs font-bold text-rose-400 uppercase tracking-widest border border-rose-500/20 px-3 py-1 rounded-full bg-rose-500/10">
              Relatório Concluído
            </div>
          </div>

          {/* CARD DE RESULTADO PRINCIPAL */}
          <div className="bg-[#160b24]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden mb-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500"></div>

            {/* Signos em destaque */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-2">{matchResult.sign1Data.icon}</div>
                <div className="font-bold text-white">{matchResult.sign1Data.name}</div>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="text-xs text-rose-300 mt-1 font-bold">{matchResult.percentage}%</span>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">{matchResult.sign2Data.icon}</div>
                <div className="font-bold text-white">{matchResult.sign2Data.name}</div>
              </div>
            </div>

            {/* Título e Resumo */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-3">
                {matchResult.title}
              </h2>
              <p className="text-purple-200/80 leading-relaxed text-sm">
                {matchResult.summary}
              </p>
            </div>

            {/* Grid de Detalhes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <h3 className="text-rose-300 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                  <Flame size={12} /> {matchResult.sections.emotional.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">{matchResult.sections.emotional.text}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <h3 className="text-sky-300 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                  <Wind size={12} /> {matchResult.sections.mental.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">{matchResult.sections.mental.text}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <h3 className="text-purple-300 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                  <InfinityIcon size={12} /> {matchResult.sections.longTerm.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">{matchResult.sections.longTerm.text}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <h3 className="text-yellow-300 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                  <Anchor size={12} /> {matchResult.sections.challenges.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">{matchResult.sections.challenges.text}</p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <button
            onClick={handleProceedToBuilder}
            className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/40 transform transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3 group"
          >
            <ScrollText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Materializar esse Amor
          </button>
          <p className="text-center text-xs text-white/30 mt-4">
            As estrelas guiam, mas você escreve a história.
          </p>
        </div>
        <style>{`
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.8s ease-out forwards;
            }
         `}</style>
      </div>
    );
  }

  // --- TELA DE INPUT (A original) ---
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#080210] flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased">
      {/* Background Premium e Complexo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-800/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-800/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute top-10 right-20 text-purple-300/30 animate-pulse delay-1000 duration-[4s]"><Stars size={24} /></div>
        <div className="absolute bottom-32 left-10 text-rose-300/20 animate-bounce delay-500 duration-[8s]"><Moon size={40} /></div>
      </div>

      <div className="w-full max-w-[520px] relative z-10">

        <button
          onClick={onBack}
          disabled={calculating}
          className="mb-8 flex items-center gap-2 text-purple-200/60 hover:text-white transition-all group px-4 py-2 rounded-full hover:bg-white/5 w-fit backdrop-blur-md disabled:opacity-0"
        >
          <div className="p-1.5 bg-white/5 rounded-full group-hover:bg-white/20 transition-colors border border-white/5">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium tracking-wide">Retornar ao Cosmos</span>
        </button>

        <div className="relative group perspective-1000">
          <div className="absolute -inset-[2px] bg-gradient-to-br from-rose-500/30 via-purple-500/30 to-indigo-600/30 rounded-[2.6rem] opacity-40 group-hover:opacity-70 blur-md transition duration-1000"></div>

          <div className="relative bg-[#120820]/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] p-8 sm:p-10 overflow-hidden">

            <div className="text-center mb-12 relative">
              <div className="inline-flex items-center justify-center p-4 mb-5 rounded-full bg-gradient-to-br from-[#2A1F3D] to-[#1A1025] border border-white/10 shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]">
                <InfinityIcon
                  className="
    w-10 h-10
    stroke-[2.5]
    text-fuchsia-500
    drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]
  "
                />


              </div>
              <h1 className="text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-100 via-purple-100 to-indigo-200 tracking-tight">
                Sinastria Astral
              </h1>
              <p className="text-purple-200/70 mt-3 text-sm font-medium tracking-[0.2em] uppercase">
                Análise de Compatibilidade Avançada
              </p>
            </div>

            <div className="space-y-8 relative">
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-3 px-2">
                  <label className="text-xs font-bold text-rose-300 uppercase tracking-widest">Sua Energia</label>
                  {renderSignDetails(sign1)}
                </div>

                <div className="relative group/select h-[72px]">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-20 transition-transform group-hover/select:scale-110">
                    <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(255,182,193,0.4)]">
                      {signsData.find(s => s.id === sign1)?.icon || '✨'}
                    </span>
                  </div>
                  <select
                    value={sign1}
                    onChange={(e) => setSign1(e.target.value)}
                    className="w-full h-full bg-[#1E122E]/60 border border-white/10 text-white text-lg rounded-2xl pl-16 pr-12 focus:outline-none focus:border-rose-500/40 focus:bg-[#251838]/80 focus:ring-2 focus:ring-rose-500/20 transition-all appearance-none cursor-pointer font-medium hover:border-white/20 hover:bg-[#251838]/60 shadow-inner"
                  >
                    <option value="" className="bg-[#1A1025] text-gray-500">Selecione o signo solar...</option>
                    {signsData.map(s => (
                      <option key={s.id} value={s.id} className="bg-[#1A1025] py-2">
                        {s.name} | {s.dates}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative z-20 flex justify-center items-center h-12">
                <div className="absolute w-2/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="relative z-10 bg-gradient-to-br from-rose-950 to-purple-950 border-2 border-white/10 p-3 rounded-full shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)] transform hover:scale-110 hover:rotate-12 transition-all duration-300 group-hover:border-rose-500/30">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-end mb-3 px-2">
                  <label className="text-xs font-bold text-purple-300 uppercase tracking-widest">Energia do Par</label>
                  {renderSignDetails(sign2)}
                </div>
                <div className="relative group/select h-[72px]">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-20 transition-transform group-hover/select:scale-110">
                    <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]">
                      {signsData.find(s => s.id === sign2)?.icon || '🌙'}
                    </span>
                  </div>
                  <select
                    value={sign2}
                    onChange={(e) => setSign2(e.target.value)}
                    className="w-full h-full bg-[#1E122E]/60 border border-white/10 text-white text-lg rounded-2xl pl-16 pr-12 focus:outline-none focus:border-purple-500/40 focus:bg-[#251838]/80 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer font-medium hover:border-white/20 hover:bg-[#251838]/60 shadow-inner"
                  >
                    <option value="" className="bg-[#1A1025] text-gray-500">Selecione o signo do par...</option>
                    {signsData.map(s => (
                      <option key={s.id} value={s.id} className="bg-[#1A1025]">
                        {s.name} | {s.dates}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-20">
              <button
                onClick={handleCalculate}
                disabled={!sign1 || !sign2 || calculating}
                className="relative w-full h-16 group overflow-hidden rounded-2xl disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 disabled:hover:translate-y-0"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 transition-all duration-500 ${calculating ? 'animate-gradient-x' : 'group-hover:scale-110 group-hover:brightness-125'} disabled:opacity-40`} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                <div className="relative h-full flex items-center justify-center gap-3 px-6 text-white z-10">
                  {calculating ? (
                    <div className="flex flex-col items-center justify-center h-full py-2">
                      <Sparkles className="w-5 h-5 text-rose-200 animate-spin mb-1" />
                      <span className="font-bold tracking-widest uppercase text-[10px] text-rose-100/80 animate-pulse">
                        {loadingTexts[loadingStep]}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="font-black tracking-[0.2em] uppercase text-sm drop-shadow-md">Revelar o Mapa da Relação</span>
                      <Stars className="w-5 h-5 text-rose-200 group-hover:rotate-90 group-hover:scale-125 transition-all duration-300 ease-out" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

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
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            text-indent: 1px;
            text-overflow: '';
        }
      `}</style>
    </div>
  );
}