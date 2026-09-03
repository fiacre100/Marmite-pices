import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  LogIn,
  UserPlus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export type AuthMode = 'signup' | 'login';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onSuccess: (userData: { name: string; email: string }) => void;
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signup',
  onSuccess
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isForgotPasswordView, setIsForgotPasswordView] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Sync mode with initialMode prop whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setSuccess(null);
      setIsForgotPasswordView(false);
      setForgotSent(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Veuillez saisir une adresse email valide.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Veuillez renseigner votre prénom ou nom de chef.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name.trim()
            }
          }
        });

        if (signupError) throw signupError;

        setSuccess(`Bienvenue ${name.trim()} ! Votre compte est créé.`);
        setTimeout(() => {
          onSuccess({
            name: name.trim(),
            email: email.trim()
          });
          onClose();
        }, 700);
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (loginError) throw loginError;

        const displayName = data.user?.user_metadata?.name || email.split('@')[0];
        setSuccess(`Ravi de vous revoir ${displayName} ! Connexion réussie.`);
        setTimeout(() => {
          onSuccess({
            name: displayName,
            email: email.trim()
          });
          onClose();
        }, 700);
      }
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) throw error;
      // OAuth typically redirects the page.
    } catch (err: any) {
      setError(err.message || "Erreur avec Google Auth.");
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Veuillez saisir votre email pour réinitialiser le mot de passe.');
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setForgotSent(true);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi de l'email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="auth-modal-container"
        className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EBE5DC] relative overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Decorative subtle background accents */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#D35400]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#8FA382]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          id="auth-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#EBE5DC] text-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Icon & Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D35400] to-[#B84700] text-white flex items-center justify-center mx-auto shadow-md shadow-[#D35400]/25">
            {mode === 'signup' ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
            {isForgotPasswordView
              ? 'Mot de passe oublié'
              : mode === 'signup'
              ? 'Créer un compte'
              : 'Se connecter'}
          </h2>

          <p className="text-xs text-[#736D66] max-w-sm mx-auto leading-relaxed">
            {isForgotPasswordView
              ? 'Entrez votre email pour recevoir le lien de réinitialisation.'
              : mode === 'signup'
              ? 'Rejoignez Marmite & Épices pour enregistrer vos recettes de cœur et adapter vos cuissons.'
              : 'Retrouvez votre carnet de recettes, vos favoris et vos réglages de foyer.'}
          </p>
        </div>

        {/* Mode Switcher Tabs (Only if not in forgot password view) */}
        {!isForgotPasswordView && (
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] mb-5">
            <button
              id="auth-tab-signup"
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#D35400] shadow-xs'
                  : 'text-[#736D66] hover:text-[#1A1A1A]'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>S'inscrire</span>
            </button>

            <button
              id="auth-tab-login"
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#D35400] shadow-xs'
                  : 'text-[#736D66] hover:text-[#1A1A1A]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Se connecter</span>
            </button>
          </div>
        )}

        {/* Success Banner */}
        {success && (
          <div className="p-4 rounded-2xl bg-[#EBF0E6] border border-[#6B7F5E]/30 text-[#4E6142] text-xs font-bold text-center flex items-center justify-center gap-2 mb-4 animate-in zoom-in-95">
            <CheckCircle2 className="w-4 h-4 text-[#6B7F5E]" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Forgot Password View */}
        {isForgotPasswordView ? (
          <div className="space-y-4">
            {forgotSent ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-12 h-12 rounded-full bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1A1A1A]">Email envoyé !</h4>
                  <p className="text-xs text-[#736D66]">
                    Vérifiez votre boîte de réception à l'adresse <strong>{email}</strong> pour réinitialiser votre accès.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordView(false)}
                  className="px-5 py-2.5 rounded-full bg-[#1C1A18] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Retour à la connexion
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Votre adresse email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="vous@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#EBE5DC] text-xs focus:outline-none focus:border-[#D35400] bg-[#FAF6F0]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white font-bold text-xs shadow-md shadow-[#D35400]/25 transition-all cursor-pointer"
                >
                  Envoyer le lien de réinitialisation
                </button>

                <button
                  type="button"
                  onClick={() => setIsForgotPasswordView(false)}
                  className="w-full text-center text-xs font-semibold text-[#736D66] hover:text-[#1A1A1A] py-1 cursor-pointer"
                >
                  Annuler et revenir à la connexion
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Main Auth Form */
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name Field (Sign-up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Prénom ou nom de chef
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex. Amina, Koffi, Sarah..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#EBE5DC] text-xs focus:outline-none focus:border-[#D35400] bg-[#FAF6F0]"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#EBE5DC] text-xs focus:outline-none focus:border-[#D35400] bg-[#FAF6F0]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#1A1A1A]">
                  Mot de passe
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPasswordView(true);
                      setError(null);
                    }}
                    className="text-[11px] font-semibold text-[#D35400] hover:underline cursor-pointer"
                  >
                    Mot de passe oublié ?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="6 caractères minimum"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#EBE5DC] text-xs focus:outline-none focus:border-[#D35400] bg-[#FAF6F0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 text-[#736D66] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#EBE5DC] text-[#D35400] focus:ring-[#D35400]"
                />
                <span>Se souvenir de moi</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-[#D35400] hover:bg-[#B84700] disabled:bg-stone-400 text-white font-bold text-xs shadow-md shadow-[#D35400]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : mode === 'signup' ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Créer mon compte gratuitement</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Se connecter</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative py-2 text-center text-[10px] text-stone-400 uppercase tracking-widest before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-2/5 before:h-px before:bg-[#EBE5DC] after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-2/5 after:h-px after:bg-[#EBE5DC]">
              ou
            </div>

            {/* Google Fast Auth */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-white border border-[#EBE5DC] hover:border-[#1A1A1A] text-xs font-bold text-[#1A1A1A] flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continuer avec Google</span>
            </button>

            {/* Navigation toggle links */}
            <div className="pt-2 text-center">
              {mode === 'signup' ? (
                <div className="py-2.5 px-4 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC] text-xs text-[#736D66]">
                  Déjà un compte ?{' '}
                  <button
                    id="switch-to-login-btn"
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError(null);
                    }}
                    className="font-bold text-[#D35400] hover:text-[#B84700] hover:underline cursor-pointer inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Connectez-vous</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="py-2.5 px-4 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC] text-xs text-[#736D66]">
                  Pas de compte ?{' '}
                  <button
                    id="switch-to-signup-btn"
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setError(null);
                    }}
                    className="font-bold text-[#D35400] hover:text-[#B84700] hover:underline cursor-pointer inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Inscrivez-vous</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
