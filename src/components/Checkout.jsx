import React, { useState, useEffect } from 'react';
import { Heart, Check, Lock, ArrowRight, Copy, MessageCircle } from 'lucide-react';

// --- FUNÇÃO GERADORA DE PAYLOAD PIX (PADRÃO BACEN) ---
const generatePixPayload = ({ key, name, city, amount, txid = '***' }) => {
  const formatField = (id, value) => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  };
  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const payloadKey = formatField('00', 'BR.GOV.BCB.PIX') + formatField('01', key);
  const merchantName = removeAccents(name).substring(0, 25);
  const merchantCity = removeAccents(city).substring(0, 15);
  const amountStr = amount.toFixed(2);
  let payload = [
    formatField('00', '01'), formatField('26', payloadKey), formatField('52', '0000'),
    formatField('53', '986'), formatField('54', amountStr), formatField('58', 'BR'),
    formatField('59', merchantName), formatField('60', merchantCity),
    formatField('62', formatField('05', txid)), '6304'
  ].join('');
  const polynomial = 0x1021;
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) { crc = (crc << 1) ^ polynomial; } else { crc = crc << 1; }
    }
  }
  const crcHex = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return payload + crcHex;
};

const Checkout = ({ setStep }) => {
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState('');

  // ---------------------------------------------------------
  // ⚙️ SEUS DADOS:
  const MY_PIX_KEY = "seu-pix@email.com"; 
  const MY_NAME = "Tony Stark"; 
  const MY_CITY = "Salvador"; 
  const MY_WHATSAPP = "5571999999999"; // Apenas números (DDI+DDD+Número)
  const PRICE = 29.90;
  // ---------------------------------------------------------

  useEffect(() => {
    const payload = generatePixPayload({
      key: MY_PIX_KEY, name: MY_NAME, city: MY_CITY, amount: PRICE, txid: 'LOVE001'
    });
    setPixCode(payload);
  }, []);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    const message = `Olá! Acabei de fazer o Pix de R$ ${PRICE} para o LoveBuilder. Segue o comprovante!`;
    const url = `https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFD] flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up border border-slate-100">
        
        {/* Lado Esquerdo - Resumo */}
        <div className="w-full md:w-1/2 bg-slate-50 p-10 flex flex-col justify-between border-r border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-purple-500"></div>
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xl mb-8">
              <Heart fill="currentColor" /> LoveBuilder
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Quase lá!</h2>
            <p className="text-slate-500 mb-8">Você está a um passo de eternizar seu amor.</p>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">Página Love Forever</span>
                <span className="font-bold text-slate-900">R$ {PRICE.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="w-full h-px bg-slate-100"></div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500"/> Hospedagem Vitalícia</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500"/> Sem anúncios</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500"/> QR Code Compartilhável</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm">
            <Lock size={14} /> Pagamento 100% Seguro
          </div>
        </div>

        {/* Lado Direito - Pagamento (Apenas PIX) */}
        <div className="w-full md:w-1/2 p-10 bg-white flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Pagamento via Pix</h3>
            <p className="text-slate-500 text-sm mt-1">Escaneie ou copie o código abaixo</p>
          </div>

          <div className="space-y-6 animate-fade-in text-center">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 mb-4 relative">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pixCode)}`} 
                  alt="QR Code Pix" 
                  className="w-40 h-40"
                />
              </div>
              
              <div className="w-full relative group">
                <input 
                  type="text" 
                  value={pixCode} 
                  readOnly 
                  className="w-full p-3 pr-12 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 outline-none focus:border-emerald-500 transition-colors"
                />
                <button 
                  onClick={handleCopyPix}
                  className="absolute right-2 top-2 p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
                  title="Copiar código Pix"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
              {copied && <span className="text-xs text-emerald-600 mt-2 font-medium animate-pulse">Código copiado! Abra o app do seu banco.</span>}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleConfirmPayment}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex justify-between px-6 items-center group">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span>Enviar Comprovante</span>
              </div>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setStep('builder')}
              className="w-full py-3 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
              Voltar para Edição
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;