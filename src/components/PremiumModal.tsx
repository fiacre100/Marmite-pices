import { useState } from 'react';
import { X, Sparkles, Flame, Check, BookOpen, Clock, Heart, Crown } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivatePremium: () => void;
  isAlreadyPremium: boolean;
}

export function PremiumModal({
  isOpen,
  onClose,
  onActivatePremium,
  isAlreadyPremium
}: PremiumModalProps) {
  const [justActivated, setJustActivated] = useState(false);

  if (!isOpen) return null;

  const handleActivate = () => {
    onActivatePremium();
    setJustActivated(true);
    setTimeout(() => {
      setJustActivated(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      id="premium-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in"
    >
      <div
        id="premium-modal-container"
        className="w-full max-w-md bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl border border-[#EBE5DC] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col relative"
      >
        {/* Floating Close Button */}
        <button
          id="close-premium-modal-btn"
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-0 pb-6 space-y-6">
          {/* Hero Earthenware Image Header */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80"
              alt="Marmite de cuisson mijotée"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-black/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4E8] text-[#D99B26] border border-[#D99B26]/30 text-xs font-bold shadow-xs">
                <Crown className="w-3.5 h-3.5 fill-[#D99B26]" />
                <span>Édition Réserve</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-5 right-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D99B26] block mb-1">
                Carnet de Transmission Culinaire
              </span>
              <h2 className="font-editorial text-2xl font-bold text-white leading-tight">
                L'art des saveurs intemporelles au creux de vos mains.
              </h2>
            </div>
          </div>

          {/* Invitation Text */}
          <div className="px-5 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
              <Sparkles className="w-3 h-3" />
              <span>Une Invitation Rare</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#1C1A18] leading-snug">
              Sublimez votre quotidien en cuisine
            </h3>
            <p className="text-xs text-[#736D66] leading-relaxed">
              Rejoignez le cercle des passionnés et accédez à tout notre patrimoine culinaire sans aucune limite.
            </p>
          </div>

          {/* 4 Feature Benefits Cards */}
          <div className="px-5 space-y-3">
            {/* Feature 1 */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#F8EFEB] text-[#C85A32] flex items-center justify-center flex-shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-editorial text-sm font-bold text-[#1C1A18]">
                  Catalogue intégral débloqué
                </h4>
                <p className="text-[11px] text-[#736D66] leading-relaxed">
                  Plus de 200 recettes rares d'Afrique et du monde, transmises par des chefs et grands-mères gardiennes des recettes.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-editorial text-sm font-bold text-[#1C1A18]">
                  Mode Cuisine guidé sans publicité
                </h4>
                <p className="text-[11px] text-[#736D66] leading-relaxed">
                  Écran allumé en continu, minuteurs interactifs et pas-à-pas vocal fluide pour cuisiner l'esprit totalement libre.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-editorial text-sm font-bold text-[#1C1A18]">
                  Suggestions d'ingrédients illimitées
                </h4>
                <p className="text-[11px] text-[#736D66] leading-relaxed">
                  Cuisinez avec ce que vous avez, jusqu'à 15 ingrédients combinés et astuces de substitution adaptées aux marchés locaux.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] text-[#1C1A18] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-editorial text-sm font-bold text-[#1C1A18]">
                  Carnets thématiques exclusifs
                </h4>
                <p className="text-[11px] text-[#736D66] leading-relaxed">
                  Dossiers spéciaux mensuels sur les épices rares, marinades secrètes et fermentations ancestrales.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial manifesto quote */}
          <div className="mx-5 p-4 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] text-center">
            <p className="font-editorial text-xs italic text-[#736D66] leading-relaxed">
              « Une expérience conçue comme une belle revue à feuilleter tranquillement au comptoir. »
            </p>
          </div>

          {/* CTA Button */}
          <div className="px-5 space-y-2.5">
            <button
              id="activate-premium-btn"
              type="button"
              onClick={handleActivate}
              disabled={isAlreadyPremium}
              className={`w-full h-13 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                isAlreadyPremium
                  ? 'bg-emerald-700 text-white cursor-default'
                  : 'bg-[#C85A32] hover:bg-[#A64420] text-white shadow-[#C85A32]/25 active:scale-[0.98]'
              }`}
            >
              {justActivated ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Bienvenue dans l'Atelier Gastronomique !</span>
                </>
              ) : isAlreadyPremium ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Votre accès Atelier est déjà actif</span>
                </>
              ) : (
                <>
                  <span>Découvrir Premium</span>
                  <Crown className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-[#736D66] text-center leading-relaxed">
              Exploration libre et sans engagement. Vous pouvez continuer à cuisiner avec la sélection découverte à tout moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
