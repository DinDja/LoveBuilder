import React from 'react';

const SpotifyPlayer = ({ url, theme }) => {
  if (!url) return null;

  const getEmbedUrl = (rawUrl) => {
    try {
      if (!rawUrl) return null;
      if (rawUrl.includes('/embed')) return rawUrl;
      const match = rawUrl.match(/(track|playlist|album|artist)[/:]([a-zA-Z0-9]+)/);
      if (match && match[1] && match[2]) {
        const type = match[1];
        const id = match[2];
        return `https://open.spotify.com/embed/${type}/${id}`;
      }
      return rawUrl;
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