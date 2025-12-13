import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Checkout from './components/Checkout';
import ExampleView from './components/ExampleView';
import { STICKERS, THEMES, FONTS } from './data/constants';

export default function App() {
  const [step, setStep] = useState('landing');
  const [pageData, setPageData] = useState({
    name1: 'Luffy',
    name2: 'Boa',
    startDate: '2023-01-01T00:00',
    message: 'Você é a única coisa que eu não quero consertar, porque é perfeita. Te amo 3000.',
    themeId: 'rose',
    fontName: 'Modern Sans',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/352FuGmGJClPjojSYjNrXG?si=028d4dd076ab4c7f',
    photoUrl: 'https://i.pinimg.com/736x/42/cb/91/42cb91bdad4ff739da889485f1255419.jpg',
    enableStickers: true,
    sticker: '❤️'
  });

  const handleInputChange = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blob { 
          0% { transform: translate(0px, 0px) scale(1); } 
          33% { transform: translate(30px, -50px) scale(1.1); } 
          66% { transform: translate(-20px, 20px) scale(0.9); } 
          100% { transform: translate(0px, 0px) scale(1); } 
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in-up 0.4s ease-out forwards; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 6s ease infinite; }
        .bg-300% { background-size: 300% 300%; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::selection {
          background-color: #fbcfe8; /* rose-200 */
          color: #be185d; /* rose-700 */
        }
        
        ::-moz-selection {
          background-color: #fbcfe8; /* rose-200 */
          color: #be185d; /* rose-700 */
        }
        
        /* Estilo específico para a landing page */
        .landing-page-text::selection {
          background-color: #fce7f3; /* rose-100 mais clarinho */
          color: #9d174d; /* rose-800 */
        }
        
        .landing-page-text::-moz-selection {
          background-color: #fce7f3; /* rose-100 mais clarinho */
          color: #9d174d; /* rose-800 */
        }
      `}</style>
      
      {step === 'landing' && <LandingPage setStep={setStep} />}
      {step === 'example' && <ExampleView setStep={setStep} />}
      {step === 'builder' && (
        <Editor 
          pageData={pageData} 
          setPageData={setPageData}
          handleInputChange={handleInputChange}
          setStep={setStep}
        />
      )}
      {step === 'checkout' && <Checkout setStep={setStep} />}
    </>
  );
}