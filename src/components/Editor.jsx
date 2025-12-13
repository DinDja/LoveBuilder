import React, { useState } from 'react';
import { Heart, Palette, Type, Music, ImageIcon, Gift, X, Check, Smartphone, Laptop, Lock } from 'lucide-react';
import RomanticPage from './RomanticPage';
import { FONTS, THEMES, STICKERS } from '../data/constants';

const Editor = ({ pageData, handleInputChange, setStep }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState('mobile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6 animate-fade-in">
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
          <div className="space-y-8 animate-fade-in">
            {/* Tema Visual */}
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
            
            {/* Tipografia */}
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
            
            {/* Stickers */}
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
          <div className="space-y-6 animate-fade-in">
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
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon size={14} /> URL da Foto do Casal
              </label>
              <input
                type="text"
                value={pageData.photoUrl}
                onChange={(e) => handleInputChange('photoUrl', e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm truncate"
                placeholder="https://..."
              />
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
                <Music size={14} /> Link Spotify
              </label>
              <input
                type="text"
                value={pageData.spotifyUrl}
                onChange={(e) => handleInputChange('spotifyUrl', e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm truncate"
                placeholder="Cole o link da música do Spotify aqui..."
              />
              <div className="text-[10px] text-slate-400 bg-blue-50 text-blue-600 p-2 rounded-lg">
                Dica: Use links de músicas públicas. O player transformará automaticamente para o formato correto.
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar de Edição */}
      <div className="w-full lg:w-[450px] bg-white flex flex-col h-full shadow-[20px_0_40px_rgba(0,0,0,0.05)] z-20 relative">
        {/* Header Editor */}
        <div className="h-20 px-8 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
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

        {/* Tabs Modernas */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'basic', icon: <Heart size={14} />, label: 'Início' },
              { id: 'design', icon: <Palette size={14} />, label: 'Estilo' },
              { id: 'content', icon: <Type size={14} />, label: 'Texto' },
              { id: 'media', icon: <Music size={14} />, label: 'Mídia' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white text-rose-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Formulários com Scroll */}
        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
          {renderTabContent()}
        </div>

        {/* Footer do Editor */}
        <div className="p-6 border-t border-slate-100 bg-white z-20">
          <button
            onClick={() => setStep('checkout')}
            className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
            <Gift size={20} /> Finalizar Presente
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-slate-100 relative flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden transition-all duration-500">
        {/* Decorative BG */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Preview Controls */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white p-1 rounded-full shadow-lg border border-slate-100 flex gap-1">
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

        {/* Preview Container */}
        {previewMode === 'mobile' ? (
          <div className="relative w-full max-w-[380px] h-[750px] bg-slate-900 rounded-[55px] shadow-[0_0_0_12px_#1e293b,0_0_0_14px_#475569,0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-slate-900 overflow-hidden z-10 animate-fade-in-up">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30px] w-[140px] bg-black rounded-b-3xl z-50"></div>
            <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
              <RomanticPage data={pageData} isPreview={true} />
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-6xl h-[90%] bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-200 overflow-hidden z-10 flex flex-col animate-fade-in-up">
            <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500"></div>
              </div>
              <div className="flex-1 max-w-xl mx-auto bg-white border border-slate-200 rounded-md h-7 flex items-center justify-center text-[10px] text-slate-400 gap-2">
                <Lock size={8} /> lovebuilder.com/{pageData.name1.toLowerCase()}-{pageData.name2.toLowerCase()}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <RomanticPage data={pageData} isPreview={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;