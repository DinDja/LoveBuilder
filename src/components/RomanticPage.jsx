import React from 'react';
import TimeCounter from './TimeCounter';
import FloatingElements from './FloatingElements';
import SpotifyPlayer from './SpotifyPlayer';
import { ImageIcon, Quote } from 'lucide-react';
import { THEMES, FONTS } from '../data/constants';

const RomanticPage = ({ data, isPreview = false }) => {
  const theme = THEMES.find(t => t.id === data.themeId) || THEMES[0];
  const font = FONTS.find(f => f.name === data.fontName) || FONTS[0];

  return (
    <div className={`min-h-full w-full relative overflow-hidden flex flex-col items-center ${theme.bg} ${font.class} transition-colors duration-700`}>
      <FloatingElements type={theme.icon} />

      {data.enableStickers && (
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElements type={data.sticker} count={8} />
        </div>
      )}

      {/* Conteúdo Central */}
      <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 z-10 flex flex-col items-center text-center relative">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className={`text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-60 ${theme.text}`}>Nossa História</div>
          <h1 className={`text-5xl md:text-8xl font-bold leading-tight ${theme.text} drop-shadow-sm`}>
            {data.name1} <span className="opacity-50 text-4xl align-middle mx-2">&</span> {data.name2}
          </h1>
        </div>

        {/* Contador */}
        <div className="mb-16 w-full animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <TimeCounter startDate={data.startDate} theme={theme} />
          <p className={`mt-6 text-sm font-medium tracking-widest opacity-60 uppercase ${theme.text}`}>
            De Amor Infinito
          </p>
        </div>

        {/* Card da Foto e Mensagem */}
        <div className="w-full max-w-2xl relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className={`absolute -inset-0.5 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 ${theme.accent}`}></div>

          <div className="relative bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 flex flex-col items-center transition-all duration-500">
            {data.photoUrl ? (
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm mb-8 relative">
                <div className="absolute inset-0 bg-black/5 mix-blend-overlay z-10"></div>
                <img src={data.photoUrl} alt="Nós" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ) : (
              <div className="w-full h-64 bg-slate-100/50 rounded-2xl flex flex-col items-center justify-center text-slate-400 mb-8 border-2 border-dashed border-slate-200">
                <ImageIcon size={48} className="mb-2 opacity-50" />
                <span className="text-sm">Sua foto aparecerá aqui</span>
              </div>
            )}

            <div className="relative">
              <span className={`absolute -top-6 -left-4 text-6xl opacity-10 font-serif ${theme.text}`}><Quote /></span>
              <p className={`text-lg md:text-2xl leading-relaxed whitespace-pre-wrap font-medium opacity-90 ${theme.text}`}>
                {data.message || "Escreva sua mensagem de amor aqui..."}
              </p>
              <span className={`absolute -bottom-10 -right-4 text-6xl opacity-10 font-serif ${theme.text}`}><Quote /></span>
            </div>
          </div>
        </div>

        {data.spotifyUrl && (
          <div className="animate-fade-in-up w-full" style={{ animationDelay: '0.3s' }}>
            <SpotifyPlayer url={data.spotifyUrl} theme={theme} />
          </div>
        )}
      </div>

      {!isPreview && (
        <div className={`pb-8 text-center w-full text-[10px] tracking-widest opacity-30 uppercase ${theme.text}`}>
          Feito com LoveBuilder
        </div>
      )}
    </div>
  );
};

export default RomanticPage;