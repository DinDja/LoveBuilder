import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Checkout from './components/Checkout';
import ExampleView from './components/ExampleView';
import LovePageViewer from './components/LovePageViewer';
import Dashboard from './components/Dashboard';
import { useLovePage } from './hooks/useLovePage';
import LoveFeed from './components/LoveFeed';
import ZodiacMatch from './components/ZodiacMatch';
import { TarotTable } from './components/TarotTable'; 
import Match from "./components/Match"

export default function App() {
  const [step, setStep] = useState('landing');
  const [currentSlug, setCurrentSlug] = useState(null);

  const [pageData, setPageData] = useState({
    name1: 'Luffy',
    name2: 'Boa',
    startDate: new Date().toISOString().slice(0, 16),
    message: 'Escreva sua mensagem especial aqui...\n\nPrometo te amar em todas as versões de nós mesmos que ainda vamos conhecer. 💖',
    themeId: 'rose',
    fontName: 'Modern Sans',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/0tgVpDi06FyKpA1z0VMD4v?si=489a278282164c87',
    photoUrl: '',
    enableStickers: true,
    sticker: '❤️'
  });

  const { createPage, currentPage, loading: pageLoading } = useLovePage();

  const handleInputChange = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const handlePageCreated = (newSlug) => {
    console.log("Página criada com slug:", newSlug);
    setCurrentSlug(newSlug);
    handleInputChange('slug', newSlug);
    setStep('checkout');
  };

  // Lógica para processar o resultado do Zodíaco
  const handleZodiacResult = (result) => {
    const formattedMessage = `✨ Destino Astral: ${result.sign1Data.name} & ${result.sign2Data.name} ✨\n` +
      `🔥 Compatibilidade: ${result.percentage}%\n` +
      `📜 ${result.title}\n\n` +
      `${result.summary}\n\n` +
      `💡 ${result.sections.mental.text}\n` +
      `🔮 ${result.sections.longTerm.text}`;

    setPageData(prev => ({
      ...prev,
      name1: result.sign1Data.name,
      name2: result.sign2Data.name,
      message: formattedMessage,
      sticker: result.sign1Data.element === 'fogo' ? '🔥' : result.sign1Data.element === 'agua' ? '💧' : result.sign1Data.element === 'terra' ? '🌱' : '💨'
    }));

    // Opcional: Ir direto para o editor após o match
    setStep('builder');
  };

  // Lógica para processar o resultado do Tarot
  const handleTarotResult = (reading) => {
    // Formata a leitura das cartas para a mensagem
    let tarotMessage = "✨ O Oráculo Revelou Nossa Jornada ✨\n\n";

    reading.forEach((card, index) => {
      const position = index === 0 ? "Passado" : index === 1 ? "Presente" : "Futuro";
      tarotMessage += `🎴 ${position}: ${card.name} ${card.isReversed ? '(Invertida)' : ''}\n`;
      tarotMessage += `"${card.isReversed ? card.meanings.reversed : card.meanings.upright}"\n\n`;
    });

    tarotMessage += "Que as estrelas guiem nosso amor! 🌟";

    setPageData(prev => ({
      ...prev,
      message: tarotMessage,
      sticker: '🔮' // Define o sticker místico
    }));

    // Vai para o editor para finalizar a página
    setStep('builder');
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/love/')) {
      const slug = path.split('/love/')[1];
      if (slug) {
        setCurrentSlug(slug);
        setStep('view');
      }
    }
  }, []);

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <LandingPage setStep={setStep} />;

      case 'feed':
        return <LoveFeed onBack={() => setStep('landing')} />;
      case 'Match':
        return <Match />
      case 'dashboard':
        return (
          <Dashboard
            onBack={() => setStep('landing')}
            onCreateNew={() => {
              setCurrentSlug(null);
              setStep('builder');
            }}
            setStep={setStep}
          />
        );

      case 'builder':
        return (
          <Editor
            pageData={pageData}
            handleInputChange={handleInputChange}
            setStep={setStep}
            onPageCreated={handlePageCreated}
          />
        );

      case 'Zodiac':
        return (
          <ZodiacMatch
            onBack={() => setStep('landing')}
            onMatchCreate={handleZodiacResult}
          />
        );

      case 'tarot':
        return (
          <TarotTable
            onBack={() => setStep('landing')}
            onReadingComplete={handleTarotResult}
          />
        );

      case 'checkout':
        return (
          <Checkout
            pageData={pageData}
            slug={currentSlug || pageData.slug}
            onBack={() => setStep('builder')}
            onFinish={() => setStep('view')}
            setStep={setStep}
          />
        );
      case "example":
        return <ExampleView setStep={setStep} />

      case 'view':
        return <LovePageViewer slugProp={currentSlug} />;

      default:
        return <LandingPage setStep={setStep} />;
    }
  };

  return (
    <>
      <style>{`
        .landing-page-selection::selection { background-color: #fce7f3; color: #9d174d; }
        .landing-page-selection::-moz-selection { background-color: #fce7f3; color: #9d174d; }
      `}</style>
      {renderStep()}
    </>
  );
}