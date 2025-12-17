import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleDeck, drawCards, generateReadingSummary } from '../utils/tarotLogic';
import { deck } from '../utils/tarotData';
import { ArrowLeft, Sparkles, Scroll } from 'lucide-react';

export const TarotTable = ({ onBack, onReadingComplete }) => {
  const [reading, setReading] = useState([]);
  const [summary, setSummary] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  const handleConsultarOraculo = () => {
    setIsShuffling(true);
    setHasRead(false);
    setSummary("");

    setTimeout(() => {
      const shuffled = shuffleDeck(deck);
      const selected = drawCards(shuffled, 3);
      const narrative = generateReadingSummary(selected);

      setReading(selected);
      setSummary(narrative);
      setIsShuffling(false);
      setHasRead(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-amber-50 relative overflow-hidden font-sans selection:bg-amber-500/30">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0a] to-black opacity-80" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="absolute top-6 left-6 group flex items-center gap-2 text-amber-400/70 hover:text-amber-300 transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <div className="p-2 rounded-full border border-amber-500/30 group-hover:border-amber-400 transition-all group-hover:-translate-x-1">
            <ArrowLeft size={16} />
          </div>
          <span className="hidden md:inline">Retornar</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 mb-10 text-center relative"
        >
          <div className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-full opacity-50" />
          <h1 className="relative text-4xl md:text-6xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-sm">
            ORÁCULO
          </h1>
          <div className="h-[1px] w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500/60 mt-2 font-medium">
            Atenção as cartas
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-center z-20">
          <button
            onClick={handleConsultarOraculo}
            disabled={isShuffling}
            className={`
              relative px-8 py-4 min-w-[200px] overflow-hidden group rounded-lg
              transition-all duration-500 ease-out
              ${isShuffling ? 'opacity-70 cursor-wait' : 'hover:scale-105 active:scale-95'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 opacity-80 group-hover:opacity-100 transition-opacity border border-amber-500/30" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <span className="relative z-10 flex items-center justify-center gap-3 font-serif font-bold text-amber-100 tracking-wider text-lg">
              {isShuffling ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Sparkles size={18} />
                  </motion.div>
                  Embaralhando...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="text-amber-400" />
                  Revelar Destino
                </>
              )}
            </span>
          </button>
        </div>

        <div className="w-full max-w-7xl flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full mb-12 perspective-1000">
            <AnimatePresence mode="wait">
              {reading.map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  initial={{ opacity: 0, y: 100, rotateY: 90, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.4, 
                    type: "spring", 
                    stiffness: 60, 
                    damping: 12 
                  }}
                  className="relative group w-full max-w-[300px] md:w-[280px]"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-500 via-purple-500 to-blue-500 rounded-xl opacity-30 group-hover:opacity-75 blur transition duration-500" />
                  
                  <div className="relative h-full bg-[#121212] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
                    <div className="absolute top-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20" />
                    
                    <div className={`relative h-[380px] w-full overflow-hidden bg-black/50 ${card.isReversed ? 'rotate-180' : ''}`}>
                      {card.image ? (
                        <>
                          <img 
                            src={card.image} 
                            alt={card.name} 
                            className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full flex-col gap-4 border-4 border-double border-amber-900/40 m-2">
                          <div className="w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center">
                            <span className="text-amber-700 font-serif text-2xl">{index + 1}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative p-5 flex flex-col flex-grow bg-gradient-to-b from-gray-900 to-black z-10 border-t border-white/5">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-amber-500/50 px-3 py-1 rounded-full shadow-lg">
                        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold glow-text">
                          {index === 0 ? "O Passado" : index === 1 ? "O Presente" : "O Futuro"}
                        </span>
                      </div>

                      <div className="mt-4 text-center">
                        <h3 className="text-xl text-amber-100 font-serif font-medium mb-1 group-hover:text-amber-400 transition-colors">
                          {card.name}
                        </h3>
                        {card.isReversed && (
                          <span className="inline-block px-2 py-0.5 text-[9px] bg-red-900/30 text-red-400 border border-red-500/20 rounded uppercase tracking-wider mb-2">
                            Invertida
                          </span>
                        )}
                        <p className="text-sm text-gray-400 font-light italic leading-relaxed border-t border-white/5 pt-3 mt-1">
                          "{card.isReversed ? card.meanings.reversed : card.meanings.upright}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {hasRead && summary && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="w-full max-w-4xl px-4 pb-20"
              >
                <div className="relative bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-amber-500/20 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 p-3 bg-amber-900/20 rounded-full border border-amber-500/30">
                      <Scroll className="text-amber-400" size={24} />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-6">
                      A Sentença das Estrelas
                    </h3>
                    
                    <div className="prose prose-invert prose-lg max-w-none">
                      <p className="text-lg md:text-xl text-gray-300 leading-loose font-light font-serif">
                        {summary}
                      </p>
                    </div>

                    <div className="mt-8 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500/30" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/30" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};