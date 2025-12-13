import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Checkout from './components/Checkout';
import ExampleView from './components/ExampleView';
import LovePageViewer from './components/LovePageViewer';
import Dashboard from './components/Dashboard'; // Importação adicionada
import { useLovePage } from './hooks/useLovePage';

export default function App() {
  const [step, setStep] = useState('landing');
  
  // Estado inicial dos dados da página
  const [pageData, setPageData] = useState({
    name1: '',
    name2: '',
    startDate: new Date().toISOString().slice(0, 16),
    message: 'Escreva sua mensagem especial aqui...\n\nPrometo te amar em todas as versões de nós mesmos que ainda vamos conhecer. 💖',
    themeId: 'rose',
    fontName: 'Modern Sans',
    spotifyUrl: '',
    photoUrl: '',
    enableStickers: true,
    sticker: '❤️'
  });

  const { createPage, currentPage, loading: pageLoading } = useLovePage();

  const handleInputChange = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  // Verificar se há página na URL (Roteamento simples)
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/love/')) {
      const slug = path.split('/love/')[1];
      if (slug) {
        setStep('view');
      }
    }
  }, []);

  // Função para criar a página
  const handleCreatePage = async () => {
    // Validar dados mínimos
    if (!pageData.name1.trim() || !pageData.name2.trim()) {
      alert('Por favor, preencha os nomes do casal!');
      return;
    }

    const result = await createPage(pageData);

    if (result.success) {
      setStep('success');
      // Atualizar URL sem recarregar a página
      window.history.pushState({}, '', `/love/${result.slug}`);
    } else {
      alert(`Erro ao criar página: ${result.error}`);
    }
  };

  // Renderizar o passo atual
  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <LandingPage setStep={setStep} />;

      case 'dashboard': // --- NOVO STEP: DASHBOARD ---
        return (
          <Dashboard 
            onBack={() => setStep('landing')}
            onCreateNew={() => setStep('builder')}
          />
        );

      case 'example':
        return <ExampleView setStep={setStep} />;

      case 'builder':
        return (
          <Editor
            pageData={pageData}
            handleInputChange={handleInputChange}
            setStep={setStep}
          />
        );

      case 'checkout':
        return (
          <Checkout
            pageData={pageData}
            onCreatePage={handleCreatePage}
            onBack={() => setStep('builder')}
            loading={pageLoading}
          />
        );

      case 'success':
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Página Criada com Sucesso! 🎉
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Sua página de amor já está no ar e pronta para compartilhar!
              </p>
              {currentPage && (
                <div className="space-y-4">
                  <a
                    href={`/love/${currentPage.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-lg transition-colors"
                  >
                    Ver Minha Página
                  </a>
                  <button
                    onClick={() => {
                      setStep('landing');
                      // Resetar formulário
                      setPageData({
                        name1: '',
                        name2: '',
                        startDate: new Date().toISOString().slice(0, 16),
                        message: 'Escreva sua mensagem especial aqui...',
                        themeId: 'rose',
                        fontName: 'Modern Sans',
                        spotifyUrl: '',
                        photoUrl: '',
                        enableStickers: true,
                        sticker: '❤️'
                      });
                    }}
                    className="block mx-auto text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Criar outra página
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'view':
        return <LovePageViewer />;

      default:
        return <LandingPage setStep={setStep} />;
    }
  };

  return (
    <>
      <style>{`
        .landing-page-selection::selection {
          background-color: #fce7f3;
          color: #9d174d;
        }
        
        .landing-page-selection::-moz-selection {
          background-color: #fce7f3;
          color: #9d174d;
        }
      `}</style>

      {renderStep()}
    </>
  );
}