import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Checkout from './components/Checkout';
import ExampleView from './components/ExampleView';
import LovePageViewer from './components/LovePageViewer';
import Dashboard from './components/Dashboard';
import { useLovePage } from './hooks/useLovePage';
import LoveFeed from './components/LoveFeed';

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

  // --- NOVA FUNÇÃO DE CONTROLE (CORREÇÃO DO NULL) ---
  const handlePageCreated = (newSlug) => {
    console.log("Página criada com slug:", newSlug); // Debug
    setCurrentSlug(newSlug);
    // Também atualizamos o pageData para garantir consistência
    handleInputChange('slug', newSlug);
    setStep('checkout');
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
            // Passamos a nova função robusta
            onPageCreated={handlePageCreated}
          />
        );

      case 'checkout':
        return (
          <Checkout
            pageData={pageData}
            // Usa o currentSlug ou o slug dentro do pageData como fallback
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