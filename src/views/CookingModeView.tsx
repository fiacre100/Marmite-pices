import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  X,
  Smartphone,
  Play,
  Pause,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Volume2,
  Trophy,
  CheckCircle2,
  SlidersHorizontal,
  Lightbulb,
  Eye
} from 'lucide-react';
import { Recipe, CookingConditions, DEFAULT_COOKING_CONDITIONS, CookingStep } from '../types';
import { playKitchenChime } from '../utils/audio';
import { STOVE_OPTIONS } from '../components/CookingConditionsModal';

interface CookingModeViewProps {
  recipe: Recipe;
  onExit: () => void;
  onFinishRecipe: (recipe: Recipe) => void;
  soundAlertsEnabled: boolean;
  conditions?: CookingConditions;
  onOpenConditionsModal?: () => void;
}

export function CookingModeView({
  recipe,
  onExit,
  onFinishRecipe,
  soundAlertsEnabled,
  conditions = DEFAULT_COOKING_CONDITIONS,
  onOpenConditionsModal
}: CookingModeViewProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedStepIngredients, setCheckedStepIngredients] = useState<Record<string, boolean>>({});
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentStove = STOVE_OPTIONS.find((s) => s.id === conditions.stoveType) || STOVE_OPTIONS[0];

  // Timer state for current step
  const currentStep = recipe.steps[currentStepIndex] || recipe.steps[0];
  const initialSeconds =
    currentStep.timerSeconds || (currentStep.durationMinutes ? currentStep.durationMinutes * 60 : 300);

  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const wakeLockRef = useRef<any>(null);

  // Reset timer whenever step changes
  useEffect(() => {
    const nextSeconds =
      currentStep.timerSeconds || (currentStep.durationMinutes ? currentStep.durationMinutes * 60 : 300);
    setTimeLeft(nextSeconds);
    setIsTimerRunning(false);
  }, [currentStepIndex, currentStep]);

  // Timer interval countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (soundAlertsEnabled) {
              playKitchenChime();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, soundAlertsEnabled]);

  // Screen Wake Lock API
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
        }
      } catch {
        setWakeLockActive(false);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
      }
    };
  }, []);

  const toggleWakeLock = async () => {
    if (wakeLockActive && wakeLockRef.current) {
      await wakeLockRef.current.release().catch(() => {});
      wakeLockRef.current = null;
      setWakeLockActive(false);
    } else {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
        }
      } catch {
        setWakeLockActive(false);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowCelebration(true);
      if (soundAlertsEnabled) {
        playKitchenChime();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleStepIngredient = (name: string) => {
    setCheckedStepIngredients((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / recipe.steps.length) * 100);

  // Phase helper
  const getPhaseTag = (step: CookingStep, index: number, total: number) => {
    if (step.phase === 'preparation' || index === 0) {
      return { label: 'Phase 1 • Préparation & Découpe', color: 'bg-blue-100 text-blue-800' };
    }
    if (step.phase === 'saisie' || (index === 1 && total > 2)) {
      return { label: 'Phase 2 • Saisie vive & Sucs', color: 'bg-amber-100 text-amber-900' };
    }
    if (step.phase === 'mijotage' || (index >= 2 && index < total - 1) || (index === 1 && total === 2)) {
      return { label: 'Phase 3 • Mijotage & Réduction', color: 'bg-orange-100 text-orange-900' };
    }
    return { label: 'Phase 4 • Finition & Dressage', color: 'bg-emerald-100 text-emerald-900' };
  };

  const phaseTag = getPhaseTag(currentStep, currentStepIndex, recipe.steps.length);
  const stepStoveTip =
    currentStep.stoveGuidance?.[conditions.stoveType] ||
    (currentStep.heatLevel ? `${currentStove.label} : ${currentStep.heatLevel}. ${currentStove.heatTip}` : null);

  return (
    <div id="cooking-mode-view" className="min-h-screen bg-[#FDFBF7] text-[#1C1A18] pb-32">
      {/* Top Fixed Control Bar */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EBE5DC] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C85A32] text-white flex items-center justify-center shadow-xs">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="font-editorial text-sm font-bold text-[#1C1A18] block leading-none">
                Mode Cuisine en Direct
              </span>
              <span className="text-[10px] text-[#736D66] line-clamp-1">
                {recipe.title} • {currentStove.icon} {currentStove.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="wake-lock-toggle"
              type="button"
              onClick={toggleWakeLock}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 transition-colors ${
                wakeLockActive
                  ? 'bg-[#FAF4E8] text-[#D99B26] border-[#D99B26]/30'
                  : 'bg-white text-[#736D66] border-[#EBE5DC]'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>{wakeLockActive ? 'Écran allumé' : 'Veille'}</span>
            </button>

            {onOpenConditionsModal && (
              <button
                type="button"
                onClick={onOpenConditionsModal}
                title="Ajuster foyer et portions"
                className="w-8 h-8 rounded-full bg-white border border-[#EBE5DC] flex items-center justify-center text-[#736D66] hover:text-[#1C1A18] active:scale-95"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              id="exit-cooking-mode-btn"
              type="button"
              onClick={onExit}
              className="w-8 h-8 rounded-full bg-white border border-[#EBE5DC] flex items-center justify-center text-[#736D66] hover:text-[#1C1A18] active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terracotta Progress Bar */}
        <div className="max-w-md mx-auto mt-2.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#736D66]">
            <span>
              Étape {currentStepIndex + 1} sur {recipe.steps.length}
            </span>
            <span className="text-[#C85A32]">{progressPercent}% complété</span>
          </div>
          <div className="w-full h-1.5 bg-[#EBE5DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C85A32] to-[#D99B26] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Step Card Container */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Step Banner & Number */}
        <div className="bg-white rounded-3xl p-5 border border-[#EBE5DC] shadow-[0_4px_24px_rgba(40,20,10,0.04)] space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-black text-[#C85A32]">
                {currentStep.stepNumber < 10 ? `0${currentStep.stepNumber}` : currentStep.stepNumber}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${phaseTag.color}`}>
                {phaseTag.label}
              </span>
            </div>

            {currentStep.heatLevel && (
              <span className="px-2.5 py-1 rounded-full bg-[#F8EFEB] text-[#C85A32] text-xs font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                {currentStep.heatLevel}
              </span>
            )}
          </div>

          <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1A18] leading-tight">
            {currentStep.title}
          </h2>

          {/* Step Photo */}
          {currentStep.image && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={currentStep.image}
                alt={currentStep.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* High-Legibility Kitchen Instructions */}
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC]/80">
            <p className="text-base sm:text-lg text-[#1C1A18] font-normal leading-relaxed">
              {currentStep.text}
            </p>
          </div>

          {/* Stove guidance for current active foyer */}
          {stepStoveTip && (
            <div className="p-3 rounded-2xl bg-[#F8EFEB] border border-[#C85A32]/20 flex items-start gap-2.5 text-xs text-[#8C3415]">
              <span className="text-base">{currentStove.icon}</span>
              <div>
                <strong className="block text-[#C85A32] font-bold">
                  Sur votre {currentStove.label} :
                </strong>
                <p className="text-[#8C3415] mt-0.5 leading-relaxed">
                  {stepStoveTip}
                </p>
              </div>
            </div>
          )}

          {/* Visual & Sensory Cues */}
          {currentStep.detailedGuidance && (
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                <Eye className="w-3 h-3" /> Repère visuel & olfactif :
              </span>
              <p className="text-blue-950/80 leading-relaxed">
                {currentStep.detailedGuidance}
              </p>
            </div>
          )}

          {/* Pro Tip if available */}
          {currentStep.proTip && (
            <div className="p-3 rounded-2xl bg-[#FAF4E8] border border-[#D99B26]/30 text-xs text-[#1C1A18] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B26] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Astuce anti-raté du Chef :
              </span>
              <p className="text-[#736D66] leading-relaxed">
                {currentStep.proTip}
              </p>
            </div>
          )}

          {/* Interactive Minuteur */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF4E8] to-[#F8EFEB] border border-[#D99B26]/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1C1A18]">
              <span className="flex items-center gap-1.5 text-[#D99B26]">
                <Sparkles className="w-4 h-4" />
                Minuteur recommandé
              </span>
              {soundAlertsEnabled && (
                <span className="text-[10px] text-[#736D66] flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  Sonnerie active
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="font-editorial text-3xl sm:text-4xl font-black text-[#1C1A18] tracking-wider">
                {formatTime(timeLeft)}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`h-11 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 ${
                    isTimerRunning ? 'bg-amber-600 text-white' : 'bg-[#C85A32] text-white'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Lancer le chrono</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimeLeft(initialSeconds);
                  }}
                  aria-label="Réinitialiser le chrono"
                  className="w-11 h-11 rounded-xl bg-white border border-[#EBE5DC] flex items-center justify-center text-[#736D66] hover:text-[#1C1A18] active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Ingrédients pour cette étape */}
          {currentStep.stepIngredients && currentStep.stepIngredients.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A18]">
                Ingrédients pour cette étape :
              </span>
              <div className="space-y-1.5">
                {currentStep.stepIngredients.map((item) => {
                  const isDone = !!checkedStepIngredients[item];
                  return (
                    <div
                      key={item}
                      onClick={() => toggleStepIngredient(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ') toggleStepIngredient(item);
                      }}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                        isDone
                          ? 'bg-[#EBF0E6] border-emerald-300 text-emerald-900'
                          : 'bg-white border-[#EBE5DC] text-[#1C1A18]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-white ${
                          isDone ? 'bg-emerald-600' : 'border border-[#EBE5DC]'
                        }`}
                      >
                        {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`text-xs ${isDone ? 'line-through text-emerald-800/70' : 'font-medium'}`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Tap Gesture Tip */}
        <p className="text-[11px] text-[#736D66] text-center italic">
          👆 Astuce : Vous pouvez poser votre téléphone sur le plan de travail et passer aux étapes suivantes avec les gros boutons ci-dessous.
        </p>
      </main>

      {/* Sticky Bottom Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EBE5DC] pb-safe shadow-[0_-4px_20px_rgba(40,20,10,0.06)]">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`h-13 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              currentStepIndex === 0
                ? 'opacity-40 border-[#EBE5DC] text-[#736D66] cursor-not-allowed'
                : 'border-[#EBE5DC] bg-white text-[#1C1A18] hover:bg-stone-50 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="h-13 rounded-2xl bg-[#C85A32] hover:bg-[#A64420] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#C85A32]/25 active:scale-95 transition-all"
          >
            <span>
              {currentStepIndex === recipe.steps.length - 1
                ? '🎉 Terminer la recette'
                : 'Étape suivante'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-[#EBE5DC]">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF4E8] text-[#D99B26] border-2 border-[#D99B26]/30 flex items-center justify-center animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C85A32]">
                Félicitations au Chef !
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1C1A18]">
                Recette réussie à merveille !
              </h3>
              <p className="text-xs text-[#736D66] leading-relaxed">
                Votre plat <strong className="text-[#1C1A18]">{recipe.title}</strong> est prêt à être servi bien chaud pour vos convives.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCelebration(false);
                  onFinishRecipe(recipe);
                }}
                className="w-full h-12 rounded-xl bg-[#C85A32] text-white text-xs font-bold shadow-xs hover:bg-[#A64420] transition-colors"
              >
                Retourner au carnet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
