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
  Download,
  Calendar,
  Eye,
  ThumbsUp,
  Lock,
  Mail,
  Gift,
  Star
} from 'lucide-react';

const Checkout = ({ pageData, pageId, slug, onBack, onFinish }) => {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const pageUrl = `${window.location.origin}/love/${slug}`;
  const whatsappMessage = `Acabei de criar nossa página de amor especial! ❤️\n\nConfira aqui: ${pageUrl}\n\nCom carinho, ${pageData?.name1 || 'Eu'}`;
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
          text: `Confira nossa página de amor especial! ❤️`,
          url: pageUrl,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      handleCopyUrl();
    }
  };

  const handleEmailSubscription = (e) => {
    e.preventDefault();
    if (email) {
      // Aqui você integraria com um serviço de email como Mailchimp
      console.log('Email cadastrado:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish();
    } else {
      window.location.href = pageUrl;
    }
  };

  // Efeitos de confete
  useEffect(() => {
    const createConfetti = () => {
      const confetti = ['❤️', '💖', '✨', '🎉', '🎊', '💕', '🥰', '🎈'];
      const container = document.querySelector('.confetti-container');
      
      for (let i = 0; i < 20; i++) {
        const emoji = confetti[Math.floor(Math.random() * confetti.length)];
        const confettiEl = document.createElement('div');
        confettiEl.textContent = emoji;
        confettiEl.className = 'absolute animate-confetti';
        confettiEl.style.left = `${Math.random() * 100}%`;
        confettiEl.style.fontSize = `${Math.random() * 20 + 15}px`;
        confettiEl.style.opacity = Math.random() * 0.5 + 0.5;
        confettiEl.style.animationDelay = `${Math.random() * 2}s`;
        container?.appendChild(confettiEl);
        
        // Remover após animação
        setTimeout(() => confettiEl.remove(), 3000);
      }
    };

    createConfetti();
    const interval = setInterval(createConfetti, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
        .gradient-border {
          position: relative;
          background: linear-gradient(white, white) padding-box,
                    linear-gradient(45deg, #f472b6, #c084fc, #60a5fa) border-box;
          border: 3px solid transparent;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Confetti Container */}
        <div className="confetti-container fixed inset-0 pointer-events-none z-0" />
        
        {/* Efeitos de brilho */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-200 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />

        {/* Conteúdo Principal */}
        <div className="w-full max-w-4xl z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-500 rounded-2xl shadow-2xl shadow-rose-200 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Sua página está pronta! 🎉
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Criamos algo especial para vocês dois. Agora é só compartilhar e celebrar o amor!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Card Principal - URL da Página */}
            <div className="lg:col-span-2">
              <div className="gradient-border bg-white rounded-3xl p-2 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="bg-gradient-to-br from-rose-500/5 to-purple-500/5 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="text-rose-600" size={24} />
                    <h2 className="text-2xl font-bold text-slate-800">Sua URL Personalizada</h2>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-slate-600 mb-3">Compartilhe este link especial:</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 overflow-x-auto">
                        <code className="text-slate-800 font-mono text-sm md:text-base break-all">
                          {pageUrl}
                        </code>
                      </div>
                      <button
                        onClick={handleCopyUrl}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 min-w-[140px] ${
                          copied 
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-slate-800 hover:bg-black text-white'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check size={18} /> Copiado!
                          </>
                        ) : (
                          <>
                            <Copy size={18} /> Copiar URL
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="mb-8">
                    <button
                      onClick={() => setShowQRCode(!showQRCode)}
                      className="flex items-center gap-2 text-slate-700 hover:text-rose-600 transition-colors mb-3"
                    >
                      <QrCode size={18} />
                      <span className="font-medium">Gerar QR Code para celular</span>
                    </button>
                    
                    {showQRCode && (
                      <div className="bg-white p-6 rounded-xl border border-slate-200 inline-block">
                        <div className="w-48 h-48 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                          {/* QR Code Placeholder - Em produção, use uma lib como qrcode.react */}
                          <div className="text-center">
                            <div className="text-4xl mb-2">📱</div>
                            <p className="text-xs text-slate-500">QR Code gerado</p>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                          <Download size={16} /> Baixar QR Code
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Botões de Compartilhamento */}
                  <div>
                    <p className="text-slate-600 mb-3">Compartilhar diretamente:</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                      >
                        💬 WhatsApp
                      </a>
                      <button
                        onClick={handleShare}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                      >
                        <Share2 size={18} /> Outros Apps
                      </button>
                      <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                        💌 Instagram
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Recursos Gratuitos */}
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Card de Recursos */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Gift className="text-rose-600" /> Tudo Incluído (Grátis!)
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: '🌐', text: 'Hospedagem vitalícia' },
                    { icon: '📊', text: 'Estatísticas de visita' },
                    { icon: '🎵', text: 'Player do Spotify' },
                    { icon: '⏱️', text: 'Contador ao vivo' },
                    { icon: '🎨', text: 'Temas personalizáveis' },
                    { icon: '✨', text: 'Stickers animados' },
                    { icon: '🔒', text: 'Sem anúncios' },
                    { icon: '📱', text: 'Design responsivo' },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-700">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card de Dicas */}
              <div className="bg-gradient-to-br from-rose-500 to-purple-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star size={20} /> Dica Romântica
                </h3>
                <p className="text-rose-100 mb-4">
                  Surpreenda seu amor enviando o link em uma data especial! 📅
                </p>
                <div className="text-sm text-rose-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> Aniversário de namoro
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={14} /> Dia dos Namorados
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} /> Como presente virtual
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Ação Final */}
          <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl p-8 border border-rose-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Pronto para ver sua criação?
                </h3>
                <p className="text-slate-600">
                  Clique no botão abaixo para visualizar sua página de amor completa
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleFinish}
                  className="px-8 py-4 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  <Heart size={24} fill="currentColor" />
                  Ver Minha Página Agora
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onBack}
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  Voltar para Edição
                </button>
              </div>

              {/* Newsletter */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <form onSubmit={handleEmailSubscription} className="flex gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu email para novidades"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-800 hover:bg-black text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
                  >
                    {isSubscribed ? 'Inscrito! ✓' : 'Avisar-me'}
                  </button>
                </form>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  ✨ Avisaremos sobre novos recursos românticos (prometemos não enviar spam)
                </p>
              </div>
            </div>

            {/* Estatísticas Preview */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
                <Eye className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">0</p>
                <p className="text-xs text-slate-500">Visualizações</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
                <ThumbsUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">0</p>
                <p className="text-xs text-slate-500">Curtidas</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
                <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">Agora</p>
                <p className="text-xs text-slate-500">Publicada</p>
              </div>
            </div>
          </div>

          {/* Rodapé Informativo */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center gap-2 text-slate-500 mb-4">
              <Lock size={16} />
              <span className="text-sm">Sua página é 100% privada e só quem tem o link pode acessar</span>
            </div>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              💝 <strong>Amor não tem preço!</strong> Estamos felizes em oferecer esse serviço gratuitamente. 
              Se você gostou, considere compartilhar com outros casais apaixonados!
            </p>
            <div className="mt-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold text-sm"
              >
                <Heart size={16} /> Criar outra página de amor
              </a>
            </div>
          </div>
        </div>

        {/* Toast de Sucesso */}
        {copied && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up z-50">
            <Check size={18} />
            <span>URL copiada para a área de transferência!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;