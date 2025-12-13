import React from 'react';

const SpotifyPlayer = ({ url, theme, autoPlay = true }) => {
  if (!url) return null;

  const getEmbedUrl = (rawUrl) => {
    try {
      if (!rawUrl) return null;

      let finalUrl = rawUrl;
      let type = 'track';
      let id = '';

      // 1. Verifica se é um PRESET do Editor (URLs terminando em números 0-4)
      // O Editor envia "https://open.spotify.com/track/0tgVpDi06FyKpA1z0eMD4v", etc.
      const presetMatch = rawUrl.match(/\/(\d)$/);
      
      if (presetMatch) {
        const presetId = presetMatch[1];
        const idMap = {
          '0': '2VxeLyX666F8uXCJ0dZF8B', // Perfect - Ed Sheeran
          '1': '3U4isOIWM3VvDubwSI3y7a', // All of Me - John Legend
          '2': '7BqBn9nXd38hN44rF1G8PK', // Just the Way You Are - Bruno Mars
          '3': '6lanRgr6wXibZr8KgzXxBl', // A Thousand Years - Christina Perri
          '4': '2plIBRhlDr9zXDk8ZnPtQB', // Die With A Smile - Gaga & Bruno
        };
        id = idMap[presetId] || '2VxeLyX666F8uXCJ0dZF8B';
        finalUrl = `https://open.spotify.com/embed/track/${id}`;
      } 
      // 2. Verifica se já é uma URL de Embed pronta
      else if (rawUrl.includes('/embed')) {
        finalUrl = rawUrl;
      }
      // 3. Verifica URLs normais (link de compartilhamento ou URI)
      else {
        const match = rawUrl.match(/(track|playlist|album|artist)[/:]([a-zA-Z0-9]+)/);
        if (match && match[1] && match[2]) {
          type = match[1];
          id = match[2];
          finalUrl = `https://open.spotify.com/embed/${type}/${id}`;
        }
      }

      // 4. Adiciona o Autoplay
      if (autoPlay) {
        // Verifica se a URL já tem parâmetros (?) para usar & ou ?
        const separator = finalUrl.includes('?') ? '&' : '?';
        finalUrl += `${separator}autoplay=1`;
      }

      return finalUrl;

    } catch (e) {
      console.error("Erro ao processar URL do Spotify", e);
      return rawUrl;
    }
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="w-full max-w-sm mx-auto mt-10 z-10 relative group">
      <div className={`absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${theme.accent}`}></div>
      <div className={`relative p-2 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-xl overflow-hidden`}>
        <iframe
          style={{ borderRadius: '12px' }}
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
        ></iframe>
      </div>
    </div>
  );
};

export default SpotifyPlayer;