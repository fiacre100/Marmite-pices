import { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  ChefHat,
  Users,
  Flame,
  Minus,
  Plus,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  SlidersHorizontal,
  Wallet,
  AlertCircle,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { Recipe, CookingConditions, DEFAULT_COOKING_CONDITIONS, CookingStep } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { STOVE_OPTIONS, BUDGET_OPTIONS } from '../components/CookingConditionsModal';

interface RecipeDetailViewProps {
  recipe: Recipe;
  allRecipes: Recipe[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onStartCooking: (recipe: Recipe) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  conditions?: CookingConditions;
  onOpenConditionsModal?: () => void;
  onUpdateConditions?: (newConditions: CookingConditions) => void;
}

export function RecipeDetailView({
  recipe,
  allRecipes,
  isFavorite,
  onToggleFavorite,
  onBack,
  onStartCooking,
  onSelectRecipe,
  conditions = DEFAULT_COOKING_CONDITIONS,
  onOpenConditionsModal,
  onUpdateConditions
}: RecipeDetailViewProps) {
  const [servings, setServings] = useState<number>(conditions.servings || recipe.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [showShareToast, setShowShareToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'plan' | 'ingredients' | 'astuces'>('plan');

  // Portion multiplier
  const scale = servings / (recipe.servings || 4);

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleServingsChange = (newCount: number) => {
    const val = Math.max(1, Math.min(12, newCount));
    setServings(val);
    if (onUpdateConditions) {
      onUpdateConditions({ ...conditions, servings: val });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${recipe.title} — Marmite & Épices`,
      text: `Découvre cette recette savoureuse : ${recipe.title} (${recipe.country})`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or not supported
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      } catch {
        // Clipboard blocked
      }
    }
  };

  // Stove & Budget data
  const currentStove = STOVE_OPTIONS.find((s) => s.id === conditions.stoveType) || STOVE_OPTIONS[0];
  const currentBudget = BUDGET_OPTIONS.find((b) => b.id === conditions.budget) || BUDGET_OPTIONS[1];

  // Specific stove tip for this recipe or default
  const stoveTip =
    recipe.stoveAdaptationTips?.[conditions.stoveType as 'charbon' | 'gaz' | 'induction'] ||
    currentStove.heatTip;

  // Specific budget tip
  const budgetTip =
    conditions.budget === 'eco'
      ? recipe.budgetAdaptation?.ecoTip || 'Astuce économique : privilégiez les morceaux avec os pour enrichir naturellement le bouillon sans ajout de bouillon cube.'
      : conditions.budget === 'festif'
      ? recipe.budgetAdaptation?.festiveTip || 'Version festive : incorporez des gambas fraîches poêlées au dernier moment pour une table royale.'
      : null;

  // Step Phase Helper
  const getPhaseInfo = (step: CookingStep, index: number, total: number) => {
    if (step.phase === 'preparation' || index === 0) {
      return {
        phaseTag: 'Phase 1 • Préparation & Mise en place',
        phaseDesc: 'Découpes, dosages, marinades et préparations préalables',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/60'
      };
    }
    if (step.phase === 'saisie' || (index === 1 && total > 2)) {
      return {
        phaseTag: 'Phase 2 • Démarrage du Foyer & Saisie vive',
        phaseDesc: 'Formation des sucs caramélisés et dorure des aromates',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/60'
      };
    }
    if (step.phase === 'mijotage' || (index >= 2 && index < total - 1) || (index === 1 && total === 2)) {
      return {
        phaseTag: 'Phase 3 • Mijotage & Réduction à cœur',
        phaseDesc: 'Cuisson étuvée, infusion des épices et liaison de la sauce',
        badgeColor: 'bg-orange-50 text-orange-700 border-orange-200/60'
      };
    }
    return {
      phaseTag: 'Phase 4 • Rectification & Finition',
      phaseDesc: 'Ajustement de l\'assaisonnement, herbes fraîches et dressage chaud',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
    };
  };

  // Similar recipes
  const similarRecipes = allRecipes
    .filter((r) => recipe.similarRecipeIds?.includes(r.id) && r.id !== recipe.id)
    .slice(0, 2);

  return (
    <div id="recipe-detail-view" className="relative pb-32 animate-in fade-in">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1C1A18] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top">
          <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
          <span>Lien copié dans le presse-papier !</span>
        </div>
      )}

      {/* Hero Header with Media */}
      <div className="relative -mx-4 -mt-3 aspect-[4/3] sm:aspect-[16/9] w-[calc(100%+2rem)] overflow-hidden bg-stone-900">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Floating Top Nav Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <button
            id="recipe-back-btn"
            type="button"
            onClick={onBack}
            aria-label="Retour"
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/85 backdrop-blur-md text-[#1C1A18] flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              id="recipe-share-btn"
              type="button"
              onClick={handleShare}
              aria-label="Partager la recette"
              className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md text-[#1C1A18] flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              id="recipe-fav-btn"
              type="button"
              onClick={() => onToggleFavorite(recipe.id)}
              aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : 'text-[#1C1A18]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Hero Bottom Origin Badge & Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1A18] text-xs font-bold shadow-xs">
            <span>{recipe.countryFlag}</span>
            <span>{recipe.country}</span>
            <span>•</span>
            <span className="text-[#C85A32]">{recipe.badgeLabel || 'Recette Authentique'}</span>
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6 pt-4">
        {/* Title & Introduction */}
        <div className="space-y-2">
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] leading-tight">
            {recipe.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#736D66] leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* ADAPTATION BANNER: ADAPTÉ À TES CONDITIONS */}
        <section
          id="recipe-conditions-summary"
          className="p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_12px_rgba(40,20,10,0.03)] space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center text-sm">
                ⚙️
              </div>
              <div>
                <span className="text-xs font-bold text-[#1C1A18] block leading-none">
                  Recette adaptée à tes conditions
                </span>
                <span className="text-[10px] text-[#736D66]">
                  Foyer, moyens, temps, niveau & convives
                </span>
              </div>
            </div>

            {onOpenConditionsModal && (
              <button
                type="button"
                onClick={onOpenConditionsModal}
                className="flex items-center gap-1 text-[11px] font-bold text-[#C85A32] bg-[#F8EFEB] px-2.5 py-1 rounded-lg hover:bg-[#C85A32] hover:text-white transition-all active:scale-95"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Modifier</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
            {/* Foyer */}
            <div className="p-2 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC]/80 space-y-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#736D66] flex items-center gap-1">
                <span>{currentStove.icon}</span> Foyer
              </span>
              <span className="text-xs font-bold text-[#1C1A18] block truncate">
                {currentStove.label}
              </span>
            </div>

            {/* Moyens */}
            <div className="p-2 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC]/80 space-y-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#736D66] flex items-center gap-1">
                <span>{currentBudget.icon}</span> Moyens
              </span>
              <span className="text-xs font-bold text-[#1C1A18] block truncate">
                {currentBudget.label}
              </span>
            </div>

            {/* Temps */}
            <div className="p-2 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC]/80 space-y-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#736D66] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C85A32]" /> Temps
              </span>
              <span className="text-xs font-bold text-[#1C1A18] block truncate">
                {recipe.durationMinutes} min
              </span>
            </div>

            {/* Niveau */}
            <div className="p-2 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC]/80 space-y-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#736D66] flex items-center gap-1">
                <ChefHat className="w-3 h-3 text-[#6B7F5E]" /> Niveau
              </span>
              <span className="text-xs font-bold text-[#1C1A18] block truncate">
                {recipe.difficulty}
              </span>
            </div>
          </div>

          {/* Dynamic Stove Heat Advice */}
          <div className="p-2.5 rounded-xl bg-[#FAF4E8] border border-[#D99B26]/30 flex items-start gap-2.5 text-xs text-[#1C1A18]">
            <Flame className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-[11px] text-[#C85A32] block">
                Consigne pour votre {currentStove.label} :
              </span>
              <p className="text-[11px] text-[#736D66] leading-relaxed">
                {stoveTip}
              </p>
            </div>
          </div>

          {/* Dynamic Budget Advice if active */}
          {budgetTip && (
            <div className="p-2.5 rounded-xl bg-[#EBF0E6] border border-[#6B7F5E]/30 flex items-start gap-2.5 text-xs text-[#1C1A18]">
              <Lightbulb className="w-4 h-4 text-[#6B7F5E] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-[11px] text-[#6B7F5E] block">
                  Conseil budget ({currentBudget.label}) :
                </span>
                <p className="text-[11px] text-[#556B49] leading-relaxed">
                  {budgetTip}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* View Switcher: Plan d'action vs Ingrédients */}
        <div className="flex border-b border-[#EBE5DC]">
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'plan'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#736D66] hover:text-[#1C1A18]'
            }`}
          >
            <span>Feuille de Route & Étapes</span>
            <span className="w-5 h-5 rounded-full bg-[#FAF6F0] text-[10px] flex items-center justify-center">
              {recipe.steps.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ingredients'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#736D66] hover:text-[#1C1A18]'
            }`}
          >
            <span>Ingrédients dosés</span>
            <span className="w-5 h-5 rounded-full bg-[#FAF6F0] text-[10px] flex items-center justify-center">
              {recipe.ingredients.length}
            </span>
          </button>
        </div>

        {/* TAB 1: PLAN D'ACTION CLAIR ET ÉTAPES PAS À PAS */}
        {activeTab === 'plan' && (
          <section className="space-y-4" aria-labelledby="heading-plan">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="heading-plan" className="font-editorial text-lg font-bold text-[#1C1A18]">
                  Plan d'action clair du Chef
                </h2>
                <p className="text-[11px] text-[#736D66]">
                  Chaque geste expliqué précisément, avec repères sensoriels
                </p>
              </div>

              <button
                type="button"
                onClick={() => onStartCooking(recipe)}
                className="px-3 py-1.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-[#A64420] active:scale-95 transition-all"
              >
                <span>Lancer le pas-à-pas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Detailed Steps */}
            <div className="space-y-4">
              {recipe.steps.map((step, idx) => {
                const phase = getPhaseInfo(step, idx, recipe.steps.length);
                const stepStoveTip = step.stoveGuidance?.[conditions.stoveType];

                return (
                  <div
                    key={step.stepNumber}
                    className="p-4 sm:p-5 rounded-3xl bg-white border border-[#EBE5DC] shadow-[0_2px_12px_rgba(40,20,10,0.02)] space-y-3 relative overflow-hidden"
                  >
                    {/* Phase Header Tag */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${phase.badgeColor}`}>
                        {phase.phaseTag}
                      </span>

                      <div className="flex items-center gap-2">
                        {step.heatLevel && (
                          <span className="text-[10px] font-semibold text-[#C85A32] bg-[#F8EFEB] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            {step.heatLevel}
                          </span>
                        )}
                        {step.durationMinutes && (
                          <span className="text-[10px] font-semibold text-[#736D66] bg-[#FAF6F0] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#C85A32]" />
                            {step.durationMinutes} min
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Step Title & Number */}
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-[#1C1A18] text-white font-editorial text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.stepNumber}
                      </span>
                      <div>
                        <h3 className="font-editorial text-base font-bold text-[#1C1A18] leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-[11px] text-[#736D66]">{phase.phaseDesc}</p>
                      </div>
                    </div>

                    {/* Step Photo */}
                    {step.image && (
                      <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Core Detailed Text */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC]/80">
                      <p className="text-xs sm:text-sm text-[#1C1A18] font-normal leading-relaxed">
                        {step.text}
                      </p>
                    </div>

                    {/* Visual & Sensory Cues (Repères de réussite) */}
                    {step.detailedGuidance && (
                      <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Repères visuels & sensoriels :
                        </span>
                        <p className="text-[11px] text-blue-950/80 leading-relaxed">
                          {step.detailedGuidance}
                        </p>
                      </div>
                    )}

                    {/* Pro Tip if available */}
                    {step.proTip && (
                      <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#D99B26]/30 text-xs text-[#1C1A18] space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B26] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Le geste infaillible du chef :
                        </span>
                        <p className="text-[11px] text-[#736D66] leading-relaxed">
                          {step.proTip}
                        </p>
                      </div>
                    )}

                    {/* Custom Stove tip for this step */}
                    {stepStoveTip && (
                      <div className="p-2.5 rounded-xl bg-[#F8EFEB] border border-[#C85A32]/20 text-[11px] text-[#8C3415] flex items-start gap-1.5">
                        <Flame className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#C85A32]" />
                        <div>
                          <strong>Réglage pour foyer {conditions.stoveType} :</strong> {stepStoveTip}
                        </div>
                      </div>
                    )}

                    {/* Step Ingredients list */}
                    {step.stepIngredients && step.stepIngredients.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66] block mb-1">
                          Ingrédients requis pour cette étape :
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.stepIngredients.map((item) => (
                            <span
                              key={item}
                              className="text-[11px] font-medium bg-stone-100 text-[#1C1A18] px-2.5 py-1 rounded-lg border border-stone-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: INGRÉDIENTS AVEC RECALCUL DES PORTIONS */}
        {activeTab === 'ingredients' && (
          <section className="space-y-4" aria-labelledby="heading-ingredients">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="heading-ingredients" className="font-editorial text-lg font-bold text-[#1C1A18]">
                  Ingrédients nécessaires
                </h2>
                <p className="text-[11px] text-[#736D66]">
                  Quantités calculées pour {servings} {servings > 1 ? 'personnes' : 'personne'}
                </p>
              </div>

              {/* Stepper for Servings */}
              <div className="flex items-center gap-1.5 bg-[#FAF6F0] p-1 rounded-xl border border-[#EBE5DC]">
                <button
                  type="button"
                  onClick={() => handleServingsChange(servings - 1)}
                  aria-label="Diminuer les portions"
                  className="w-7 h-7 rounded-lg bg-white border border-[#EBE5DC] flex items-center justify-center text-[#1C1A18] hover:bg-stone-50 active:scale-95 transition-transform"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#1C1A18] px-1 min-w-[50px] text-center">
                  {servings} pers
                </span>
                <button
                  type="button"
                  onClick={() => handleServingsChange(servings + 1)}
                  aria-label="Augmenter les portions"
                  className="w-7 h-7 rounded-lg bg-white border border-[#EBE5DC] flex items-center justify-center text-[#1C1A18] hover:bg-stone-50 active:scale-95 transition-transform"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Checklist */}
            <div className="rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] divide-y divide-[#EBE5DC]/80 overflow-hidden">
              {recipe.ingredients.map((ing) => {
                const isChecked = !!checkedIngredients[ing.name];
                const scaledQty = Math.round(ing.quantity * scale * 10) / 10;

                return (
                  <div
                    key={ing.name}
                    onClick={() => toggleIngredientCheck(ing.name)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') toggleIngredientCheck(ing.name);
                    }}
                    className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                      isChecked ? 'bg-[#FAF6F0]/60' : 'hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          isChecked ? 'bg-[#6B7F5E] text-white' : 'border border-[#EBE5DC] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span
                          className={`text-xs block ${
                            isChecked
                              ? 'line-through text-[#736D66]/70'
                              : 'text-[#1C1A18] font-medium'
                          }`}
                        >
                          {ing.name}
                        </span>
                        {conditions.budget === 'eco' && ing.ecoSubstitute && (
                          <span className="text-[10px] text-[#6B7F5E]">
                            Option éco : {ing.ecoSubstitute}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold ${
                        isChecked ? 'text-[#736D66]/60' : 'text-[#C85A32]'
                      }`}
                    >
                      {scaledQty} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Secret du Chef Card */}
        {recipe.chefSecret && (
          <section className="p-4 rounded-2xl bg-[#FAF4E8] border border-[#D99B26]/30 flex items-start gap-3.5 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#D99B26] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <ChefHat className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B26]">
                {recipe.chefSecret.author}
              </span>
              <p className="text-xs text-[#1C1A18] leading-relaxed font-medium">
                « {recipe.chefSecret.text} »
              </p>
            </div>
          </section>
        )}

        {/* ACCORDS TRADITIONNELS: À SERVIR AVEC */}
        {recipe.sideDishes && recipe.sideDishes.length > 0 && (
          <section className="space-y-3" aria-labelledby="heading-sides">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7F5E]">
                Accords traditionnels recommandés
              </span>
              <h2 id="heading-sides" className="font-editorial text-lg font-bold text-[#1C1A18]">
                À servir avec
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recipe.sideDishes.map((side) => (
                <div
                  key={side.name}
                  className="p-3 rounded-2xl bg-white border border-[#EBE5DC] flex items-center gap-3 shadow-2xs"
                >
                  <span className="text-2xl">{side.icon}</span>
                  <div>
                    <h4 className="font-editorial text-xs font-bold text-[#1C1A18]">
                      {side.name}
                    </h4>
                    <p className="text-[10px] text-[#736D66] line-clamp-1">
                      {side.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TU POURRAIS AUSSI AIMER */}
        {similarRecipes.length > 0 && (
          <section className="space-y-3" aria-labelledby="heading-similar">
            <h2 id="heading-similar" className="font-editorial text-lg font-bold text-[#1C1A18]">
              Tu pourrais aussi aimer
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {similarRecipes.map((item) => (
                <RecipeCard
                  key={item.id}
                  recipe={item}
                  isFavorite={false}
                  onToggleFavorite={onToggleFavorite}
                  onSelectRecipe={onSelectRecipe}
                  variant="grid"
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EBE5DC] pb-safe shadow-[0_-4px_20px_rgba(40,20,10,0.06)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {onOpenConditionsModal && (
            <button
              type="button"
              onClick={onOpenConditionsModal}
              title="Ajuster mes conditions"
              className="w-13 h-13 rounded-2xl bg-white border border-[#EBE5DC] text-[#736D66] hover:text-[#1C1A18] flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform shadow-2xs"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          )}

          <button
            id="start-cooking-mode-btn"
            type="button"
            onClick={() => onStartCooking(recipe)}
            className="flex-1 h-13 rounded-2xl bg-gradient-to-r from-[#C85A32] to-[#A64420] text-white font-bold text-sm shadow-md shadow-[#C85A32]/25 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <span>Lancer la préparation ({conditions.servings} pers)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
