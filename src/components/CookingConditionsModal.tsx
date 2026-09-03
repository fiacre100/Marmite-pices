import {
  Flame,
  Wallet,
  Clock,
  ChefHat,
  Users,
  X,
  Check,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { CookingConditions, StoveType, BudgetLevel, TimeConstraint, SkillLevel } from '../types';

interface CookingConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  conditions: CookingConditions;
  onChangeConditions: (newConditions: CookingConditions) => void;
}

export const STOVE_OPTIONS: { id: StoveType; label: string; icon: string; desc: string; heatTip: string }[] = [
  {
    id: 'gaz',
    label: 'Cuisinière à Gaz',
    icon: '🔵',
    desc: 'Flamme modulable',
    heatTip: 'Flamme moyenne vive au départ, puis couronne douce pour le mijotage.'
  },
  {
    id: 'charbon',
    label: 'Foyer Charbon / Bois',
    icon: '🔥',
    desc: 'Braises & kanoun traditionnel',
    heatTip: 'Braises rougeoyantes aérées à l\'éventail. Écarter les braises en fin pour mijoter sans brûler.'
  },
  {
    id: 'induction',
    label: 'Plaque Induction / Vitro',
    icon: '⚡',
    desc: 'Thermostat précis 1-9',
    heatTip: 'Thermostat 7-8 pour rissoler, baisser à 3-4 sous couvercle pour compoter.'
  },
  {
    id: 'rechaud',
    label: 'Réchaud Mobile',
    icon: '🏕️',
    desc: 'Flamme concentrée',
    heatTip: 'Centrer la marmite sur le trépied. Préférer les marmites à fond épais pour éviter le point chaud.'
  }
];

export const BUDGET_OPTIONS: { id: BudgetLevel; label: string; icon: string; desc: string }[] = [
  {
    id: 'eco',
    label: 'Éco & Malin',
    icon: '🪙',
    desc: 'Ingrédients économiques, légumes de saison, anti-gaspillage.'
  },
  {
    id: 'standard',
    label: 'Équilibré Standard',
    icon: '⚖️',
    desc: 'Recette authentique équilibrée sans compromis sur le goût.'
  },
  {
    id: 'festif',
    label: 'Généreux & Fête',
    icon: '👑',
    desc: 'Morceaux nobles, crevettes fraîches, aromates d\'exception.'
  }
];

export const TIME_OPTIONS: { id: TimeConstraint; label: string; icon: string; desc: string }[] = [
  {
    id: 'express',
    label: 'Express (<25 min)',
    icon: '⚡',
    desc: 'Découpes fines, cuissons rapides, pas de perte de temps.'
  },
  {
    id: 'standard',
    label: 'Classique (35-45 min)',
    icon: '⏱️',
    desc: 'Le bon équilibre entre rissolage et réduction savoureuse.'
  },
  {
    id: 'mijote',
    label: 'Mijoté / Dimanche (1h+)',
    icon: '🍲',
    desc: 'Sauces confites doucement, viandes ultra-tendres.'
  }
];

export const SKILL_OPTIONS: { id: SkillLevel; label: string; icon: string; desc: string }[] = [
  {
    id: 'debutant',
    label: 'Débutant',
    icon: '🔰',
    desc: 'Guidage ultra-détaillé, repères visuels vulgarisés, zéro jargon.'
  },
  {
    id: 'intermediaire',
    label: 'Cuisinier régulier',
    icon: '🍳',
    desc: 'Techniques courantes, étapes bien rythmées.'
  },
  {
    id: 'chef',
    label: 'Passionné / Chef',
    icon: '👨‍🍳',
    desc: 'Tours de main subtils, torréfaction précise des épices.'
  }
];

export function CookingConditionsModal({
  isOpen,
  onClose,
  conditions,
  onChangeConditions
}: CookingConditionsModalProps) {
  if (!isOpen) return null;

  const update = (partial: Partial<CookingConditions>) => {
    onChangeConditions({ ...conditions, ...partial });
  };

  return (
    <div
      id="cooking-conditions-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
    >
      <div className="w-full max-w-lg bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl border border-[#EBE5DC] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE5DC] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF4E8] text-[#D99B26] border border-[#D99B26]/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C85A32]" />
            </div>
            <div>
              <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1A18] leading-tight">
                Adapte la cuisine à tes conditions
              </h3>
              <p className="text-[11px] text-[#736D66]">
                Foyer, budget, temps, niveau et nombre de personnes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#EBE5DC] flex items-center justify-center text-[#736D66] hover:text-[#1C1A18] active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-left">
          {/* 1. Foyer / Source de chaleur */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
                1. Ton Foyer de cuisson
              </span>
              <span className="text-[10px] text-[#736D66]">Adapte les temps & consignes de feu</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {STOVE_OPTIONS.map((stove) => {
                const isSelected = conditions.stoveType === stove.id;
                return (
                  <button
                    key={stove.id}
                    type="button"
                    onClick={() => update({ stoveType: stove.id })}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-[#F8EFEB] border-[#C85A32] shadow-xs'
                        : 'bg-white border-[#EBE5DC] hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl">{stove.icon}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#C85A32] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div className="font-editorial text-xs font-bold text-[#1C1A18] leading-tight">
                      {stove.label}
                    </div>
                    <div className="text-[10px] text-[#736D66] mt-0.5 line-clamp-1">
                      {stove.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Moyens & Budget */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#6B7F5E]" />
                2. Tes Moyens / Budget
              </span>
              <span className="text-[10px] text-[#736D66]">Alternatives & choix d'ingrédients</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {BUDGET_OPTIONS.map((b) => {
                const isSelected = conditions.budget === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => update({ budget: b.id })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#EBF0E6] border-[#6B7F5E] shadow-xs'
                        : 'bg-white border-[#EBE5DC] hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xl block mb-1">{b.icon}</span>
                    <div className="font-editorial text-xs font-bold text-[#1C1A18] leading-tight">
                      {b.label}
                    </div>
                    <div className="text-[9px] text-[#736D66] mt-0.5 line-clamp-2">
                      {b.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. Nombre de personnes / Convives */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#D99B26]" />
                3. Nombre de personnes
              </span>
              <span className="text-[10px] text-[#736D66]">Recalcul automatique au gramme près</span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-[#EBE5DC] flex items-center justify-between">
              <div>
                <span className="font-editorial text-lg font-bold text-[#1C1A18]">
                  {conditions.servings} {conditions.servings > 1 ? 'personnes' : 'personne'}
                </span>
                <p className="text-[10px] text-[#736D66]">
                  {conditions.servings <= 2
                    ? 'Petite portion express (petite casserole)'
                    : conditions.servings <= 5
                    ? 'Famille ou tablée standard (marmite moyenne)'
                    : 'Grande tablée conviviale (grande marmite)'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[1, 2, 4, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => update({ servings: num })}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      conditions.servings === num
                        ? 'bg-[#1C1A18] text-white shadow-xs'
                        : 'bg-[#FAF6F0] text-[#736D66] border border-[#EBE5DC] hover:text-[#1C1A18]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Temps disponible & Niveau */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Temps */}
            <section className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                4. Temps disponible
              </span>

              <div className="space-y-1.5">
                {TIME_OPTIONS.map((t) => {
                  const isSelected = conditions.timeAvailable === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => update({ timeAvailable: t.id })}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#F8EFEB] border-[#C85A32]'
                          : 'bg-white border-[#EBE5DC] hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{t.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-[#1C1A18]">{t.label}</div>
                          <div className="text-[9px] text-[#736D66]">{t.desc}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#C85A32]" />}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Niveau */}
            <section className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-[#D99B26]" />
                5. Ton Niveau en cuisine
              </span>

              <div className="space-y-1.5">
                {SKILL_OPTIONS.map((s) => {
                  const isSelected = conditions.skillLevel === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => update({ skillLevel: s.id })}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#FAF4E8] border-[#D99B26]'
                          : 'bg-white border-[#EBE5DC] hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{s.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-[#1C1A18]">{s.label}</div>
                          <div className="text-[9px] text-[#736D66]">{s.desc}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#D99B26]" />}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#EBE5DC] flex items-center justify-between">
          <div className="text-[11px] text-[#736D66] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Toutes les recettes s'ajusteront instantanément.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold shadow-xs hover:bg-[#A64420] active:scale-95 transition-all"
          >
            Appliquer mes conditions
          </button>
        </div>
      </div>
    </div>
  );
}
