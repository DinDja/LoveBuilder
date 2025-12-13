import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RomanticPage from './RomanticPage';

export const ExampleView = ({ setStep }) => {
    const exampleData = {
        name1: 'Luffy',
        name2: 'Boa',
        startDate: '2020-06-12T19:30',
        message: `Eu não preciso de promessas grandiosas nem de tronos. Só de saber que você segue em frente sem nunca abandonar quem ama já faz meu coração escolher você, sempre. Eu te amo em silêncio quando precisa ser silêncio, e com toda a força do mundo quando for preciso lutar.

Prometo te amar em todas as versões de nós mesmos que ainda vamos conhecer — o garoto de chapéu de palha, o homem que vai conquistar os mares e o Rei dos Piratas que o mundo ainda vai aclamar.

Caminhar ao seu lado, Luffy, já é o meu felizes para sempre.💖`,
        themeId: 'night',
        fontName: 'Elegant Serif',
        photoUrl: 'https://i.pinimg.com/736x/42/cb/91/42cb91bdad4ff739da889485f1255419.jpg',
        spotifyUrl: 'https://open.spotify.com/intl-pt/track/0tgVpDi06FyKpA1z0VMD4v?si=489a278282164c87',
        enableStickers: true,
        sticker: '✨'
    };

    return (
        <div className="relative w-full h-screen overflow-y-auto bg-black">
            {/* Renderiza a página com dados de exemplo */}
            <RomanticPage data={exampleData} isPreview={false} />

            {/* Botão de Voltar Flutuante */}
            <button
                onClick={() => setStep('landing')}
                className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all border border-white/10 group"
                title="Voltar"
            >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* CTA Flutuante Inferior (Glassmorphism) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
                <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-2 rounded-2xl shadow-2xl flex items-center justify-between pl-6">
                    <div className="text-slate-800 text-sm font-medium">
                        Gostou do que viu?
                    </div>
                    <button
                        onClick={() => setStep('builder')}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-rose-200/50 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                    >
                        Criar o meu <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExampleView;