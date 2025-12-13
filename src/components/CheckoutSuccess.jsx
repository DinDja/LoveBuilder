import React from 'react';
import { Heart, Check, Share2, ExternalLink, Star, Sparkles } from 'lucide-react';

const CheckoutSuccess = ({ pageUrl, pageData, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fade-in-up">
        {/* Ícone de sucesso */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Check className="w-12 h-12 text-white" />
        </div>

        {/* Mensagem de sucesso */}
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Página Publicada! 🎉
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Sua página de amor para <span className="font-bold text-rose-600">{pageData?.name1} & {pageData?.name2}</span> já está no ar!
        </p>

        {/* URL */}
        <div className="bg-slate-50 rounded-xl p-4 mb-8">
          <p className="text-slate-700 mb-2">Compartilhe este link especial:</p>
          <div className="flex items-center justify-center gap-2">
            <code className="bg-white px-4 py-2 rounded-lg text-slate-800 font-mono text-sm border border-slate-200">
              {pageUrl}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(pageUrl)}
              className="px-4 py-2 bg-slate-800 hover:bg-black text-white rounded-lg font-medium transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>

        {/* Ações */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink size={20} /> Ver Minha Página
          </a>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Página de Amor - ${pageData?.name1} & ${pageData?.name2}`,
                  text: 'Confira nossa página de amor especial! ❤️',
                  url: pageUrl,
                });
              }
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Share2 size={20} /> Compartilhar
          </button>
        </div>

        {/* Dicas */}
        <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-100">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center justify-center gap-2">
            <Sparkles className="text-amber-500" /> Dica Romântica
          </h3>
          <p className="text-slate-700">
            Envie o link como surpresa em uma data especial ou crie um QR code para colocar em um presente físico! 💝
          </p>
        </div>

        {/* Rodapé */}
        <div className="space-y-4">
          <button
            onClick={onBack}
            className="text-rose-600 hover:text-rose-700 font-semibold"
          >
            ← Criar outra página
          </button>
          <div className="text-slate-500 text-sm">
            Feito com ❤️ pelo LoveBuilder
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;