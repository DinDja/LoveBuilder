import React, { useState, useEffect } from 'react';
import {
  Heart,
  Check,
  ArrowRight,
  Sparkles,
  Copy,
  Share2,
  Globe,
  QrCode,
  Calendar,
  Eye,
  ThumbsUp,
  Lock,
  Mail,
  Gift,
  Star,
  ExternalLink,
  Download, // Importei o ícone de Download
  Loader2 ,  // Importei Loader para feedback visual
  ArrowLeft,
} from 'lucide-react';

const Checkout = ({ pageData, slug, onBack, onFinish, setStep }) => {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // Estado de loading do download

  const LIVE_DOMAIN = 'https://lovebuilder.netlify.app';
  const pageUrl = `${LIVE_DOMAIN}/love/${slug}`;

  // URL da API do QR Code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(pageUrl)}&color=334155&format=png`;

  const whatsappMessage = `Fiz uma surpresa para você! ❤️\nVeja nossa página especial aqui: ${pageUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Página de Amor - ${pageData?.name1} & ${pageData?.name2}`,
          text: `Fiz uma surpresa especial! ❤️`,
          url: pageUrl,
        });
      } catch (error) {
        console.log('Compartilhamento cancelado ou falhou');
      }
    } else {
      handleCopyUrl();
    }
  };

  // --- NOVA FUNÇÃO DE DOWNLOAD ---
  const handleDownloadQRCode = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode-${slug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar QR Code:', error);
      alert('Não foi possível baixar a imagem. Tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEmailSubscription = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const handleViewPage = () => {
    window.open(pageUrl, '_blank');
    if (onFinish) onFinish();
  };

  // Efeito de Confete
  useEffect(() => {
    const container = document.querySelector('.confetti-container');
    if (!container) return;

    const createParticle = () => {
      const el = document.createElement('div');
      const symbols = ['❤️', '💖', '✨', '🌹'];
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.className = 'absolute animate-confetti select-none pointer-events-none';
      el.style.left = Math.random() * 100 + '%';
      el.style.fontSize = Math.random() * 20 + 15 + 'px';
      el.style.animationDuration = Math.random() * 2 + 3 + 's';
      container.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    };

    for (let i = 0; i < 30; i++) setTimeout(createParticle, i * 100);
    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-x-hidden">
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti { animation-name: confetti; animation-timing-function: linear; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .premium-shadow {
          box-shadow: 0 20px 40px -10px rgba(225, 29, 72, 0.15);
        }
      `}</style>

      {/* Background Decorativo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px]" />
        <div className="confetti-container absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
        <button
          onClick={() => setStep('landing')}
          className="fixed top-6 left-6 z-50 bg-white/40 backdrop-blur-md hover:bg-white/30 text-dark p-3 rounded-full transition-all border border-white/10 group"
          title="Voltar"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        {/* Header de Sucesso */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            Tudo pronto! <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">Parabéns.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Sua página de amor foi criada e publicada com sucesso. <br className="hidden md:block" />
            O link abaixo já está ativo e pronto para ser compartilhado.
          </p>
        </div>

        <div className="w-full grid lg:grid-cols-12 gap-8">

          {/* Coluna Principal */}
          <div className="lg:col-span-8 space-y-6">

            {/* Card do Link */}
            <div className="glass-panel rounded-3xl p-8 premium-shadow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                  <Globe size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Link Oficial</h2>
                  <p className="text-sm text-slate-500">Este link funciona em qualquer lugar do mundo</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    readOnly
                    value={pageUrl}
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                  />
                </div>
                <button
                  onClick={handleCopyUrl}
                  className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[160px] shadow-lg transform active:scale-95 ${copied
                      ? 'bg-green-500 text-white shadow-green-200'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
                    }`}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="grid sm:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold shadow-lg shadow-green-100 transition-all transform hover:-translate-y-1"
              >
                <span>💬 Enviar no WhatsApp</span>
              </a>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-3 p-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold shadow-sm transition-all"
              >
                <Share2 size={20} /> Outras Opções
              </button>
            </div>

            {/* Card de Visualização */}
            <div className="glass-panel rounded-3xl p-8 premium-shadow text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Veja como ficou</h3>
              <p className="text-slate-600 mb-8">Acesse a página final como seu amor a verá.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleViewPage}
                  className="px-8 py-4 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-rose-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} /> Abrir Página Oficial
                </button>
                <button
                  onClick={onBack}
                  className="px-8 py-4 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-lg transition-colors"
                >
                  Voltar ao Editor
                </button>
              </div>
            </div>

          </div>

          {/* Coluna Lateral */}
          <div className="lg:col-span-4 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

            {/* QR Code Real com Download */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <div className="mb-4">
                <h3 className="font-bold text-slate-800">QR Code</h3>
                <p className="text-xs text-slate-500">Escaneie para testar no celular</p>
              </div>

              <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-inner mb-4 relative group">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-40 h-40 object-contain rounded-lg"
                />
              </div>

              {/* Botões do QR Code */}
              <div className="flex flex-col gap-2 w-full">
                <button
                  onClick={handleDownloadQRCode}
                  disabled={isDownloading}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {isDownloading ? 'Baixando...' : 'Baixar Imagem'}
                </button>

                <button
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="text-rose-600 text-xs font-semibold hover:underline mt-1"
                >
                  {showQRCode ? 'Ocultar Detalhes' : 'Mais Opções'}
                </button>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Gift className="text-yellow-400" size={20} />
                </div>
                <h3 className="font-bold">Dicas de Namoro</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Receba ideias criativas para surpreender seu amor em datas especiais.
              </p>

              <form onSubmit={handleEmailSubscription} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-slate-400" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-rose-50 transition-colors"
                >
                  {isSubscribed ? 'Inscrito com sucesso! ✨' : 'Quero receber dicas'}
                </button>
              </form>
            </div>

            {/* Stats Mockup */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
              <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                <span>Status da Página</span>
                <span className="flex items-center gap-1 text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full text-xs">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                </span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 text-center">
                  <Eye size={16} className="mx-auto text-blue-500 mb-1" />
                  <span className="block font-bold text-slate-800">0</span>
                  <span className="text-[10px] text-slate-400 uppercase">Views</span>
                </div>
                <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 text-center">
                  <ThumbsUp size={16} className="mx-auto text-rose-500 mb-1" />
                  <span className="block font-bold text-slate-800">0</span>
                  <span className="text-[10px] text-slate-400 uppercase">Likes</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-slate-400 text-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="flex items-center justify-center gap-2">
            Feito com <Heart size={14} className="text-rose-500 fill-current" /> para casais apaixonados
          </p>
        </div>

      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 transform ${copied ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-1">
            <Check size={12} strokeWidth={4} />
          </div>
          <span className="font-medium">Link copiado para a área de transferência!</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;