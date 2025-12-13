import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase/config'; // Certifique-se que o caminho está correto
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const { signup, login, loginWithGoogle, error, clearError } = useAuth();

  if (!isOpen) return null;

  // Função auxiliar para garantir que o usuário seja salvo no Firestore
  const saveUserToFirestore = async (user, additionalData = {}) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // Só cria/atualiza se não existir ou para atualizar lastLogin
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || additionalData.displayName || "Usuário",
          photoURL: user.photoURL || "",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          ...additionalData
        });
      } else {
        // Opcional: Atualizar apenas o último login se já existir
        await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
      }
    } catch (err) {
      console.error("Erro ao salvar usuário no Firestore:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await signup(email, password, displayName);
      }

      if (result.success) {
        // Se for cadastro, salvamos explicitamente. Se for login, atualizamos o lastLogin.
        await saveUserToFirestore(result.user, { displayName });
        onSuccess?.(result.user);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    setIsLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        // CRUCIAL: Salvar dados do Google no Firestore
        await saveUserToFirestore(result.user);
        onSuccess?.(result.user);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop com Blur Premium */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Card Principal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up border border-white/20 ring-1 ring-black/5">
        
        {/* Efeitos de Fundo Decorativos */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        {/* Header */}
        <div className="relative p-8 pb-0 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              {isLogin ? 'Bem-vindo de volta' : 'Criar sua conta'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isLogin ? 'Continue sua história de amor.' : 'Comece a eternizar seus momentos.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="relative p-8 space-y-5 z-10">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-shake">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                Seu Nome
              </label>
              <div className="relative transition-all duration-300 focus-within:transform focus-within:-translate-y-1">
                <User className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={20} />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-rose-100 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                  placeholder="Como você quer ser chamado?"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Email
            </label>
            <div className="relative transition-all duration-300 focus-within:transform focus-within:-translate-y-1">
              <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-rose-100 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Senha
            </label>
            <div className="relative transition-all duration-300 focus-within:transform focus-within:-translate-y-1">
              <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-rose-100 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? 'Entrar' : 'Começar Agora'}
                <ArrowRight size={20} className="opacity-80" />
              </>
            )}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide font-bold text-slate-400">
              <span className="px-4 bg-white">Ou continue com</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Google
          </button>
        </form>

        {/* Footer */}
        <div className="relative p-6 bg-slate-50/80 border-t border-slate-100 text-center backdrop-blur-sm">
          <p className="text-sm text-slate-600 font-medium">
            {isLogin ? 'Ainda não tem uma conta?' : 'Já possui cadastro?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                clearError();
              }}
              className="ml-2 text-rose-600 font-bold hover:text-orange-500 transition-colors underline decoration-2 underline-offset-2 decoration-transparent hover:decoration-current"
            >
              {isLogin ? 'Criar conta gratuitamente' : 'Fazer login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;