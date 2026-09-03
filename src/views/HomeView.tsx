import { useState } from 'react';
import {
  Search,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Wallet,
  SlidersHorizontal,
  Dice5
} from 'lucide-react';
import { Recipe, TabDestination, CookingConditions, DEFAULT_COOKING_CONDITIONS } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { COUNTRIES } from '../data/recipes';
import { CookingConditionsBar } from '../components/CookingConditionsBar';
import { WhatToEatTodayModal } from '../components/WhatToEatTodayModal';
import { STOVE_OPTIONS, BUDGET_OPTIONS } from '../components/CookingConditionsModal';

interface HomeViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigateToTab: (tab: TabDestination) => void;
  onOpenSearch: (initialQuery?: string) => void;
  onSelectCategoryFilter?: (filter: string) => void;
  onStartCooking?: (recipe: Recipe) => void;
  conditions?: CookingConditions;
  onOpenConditionsModal?: () => void;
}

export function HomeView({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  onNavigateToTab,
  onOpenSearch,
  onStartCooking,
  conditions = DEFAULT_COOKING_CONDITIONS,
  onOpenConditionsModal
}: HomeViewProps) {
  const [activePill, setActivePill] = useState<string>('all');
  const [isWhatToEatOpen, setIsWhatToEatOpen] = useState(false);

  const heroRecipe = recipes.find((r) => r.isDailyIdea) || recipes[0];
  const beninRecipes = recipes.filter((r) => r.country === 'Bénin' || r.region === 'benin');
  const westAfricaRecipes = recipes.filter((r) => r.region === 'west-africa');
  const quickRecipes = recipes.filter((r) => r.durationMinutes <= 35);

  const currentStove = STOVE_OPTIONS.find((s) => s.id === conditions.stoveType) || STOVE_OPTIONS[0];
  const currentBudget = BUDGET_OPTIONS.find((b) => b.id === conditions.budget) || BUDGET_OPTIONS[1];

  const pills = [
    { id: 'all', label: '✨ Tout explorer' },
    { id: 'benin', label: '🇧🇯 Plats du Bénin' },
    { id: 'west-africa', label: '🌍 Afrique de l\'Ouest' },
    { id: 'quick', label: '⚡ Rapides (<35 min)' },
    { id: 'signature', label: '⭐ Recettes Signatures' }
  ];

  const filteredPillRecipes = recipes.filter((r) => {
    if (activePill === 'benin') return r.country === 'Bénin' || r.region === 'benin';
    if (activePill === 'west-africa') return r.region === 'west-africa';
    if (activePill === 'quick') return r.durationMinutes <= 35;
    if (activePill === 'signature') return r.isSignature;
    return true;
  });

  return (
    <div id="home-view" className="space-y-7 pb-12">
      {/* Title & Conditions Bar */}
      <section className="space-y-3 pt-1">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C85A32]">
            Carnet Culinaire Inspirant
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] tracking-tight leading-tight">
            Qu'est-ce qu'on cuisine aujourd'hui ?
          </h1>
          <p className="text-xs sm:text-sm text-[#736D66] font-normal leading-relaxed">
            Plats locaux authentiques et recettes du monde qui s'adaptent à vos conditions réelles.
          </p>
        </div>

        {/* Dynamic Cooking Conditions Summary Bar */}
        {onOpenConditionsModal && (
          <CookingConditionsBar
            conditions={conditions}
            onOpenModal={onOpenConditionsModal}
          />
        )}

        {/* Quick Search Bar */}
        <div className="pt-1">
          <button
            id="home-search-trigger"
            type="button"
            onClick={() => onOpenSearch()}
            className="w-full h-12 bg-white rounded-xl border border-[#EBE5DC] px-4 flex items-center justify-between text-left text-sm text-[#736D66] shadow-[0_2px_8px_rgba(40,20,10,0.02)] transition-all hover:border-[#C85A32]/50 hover:shadow-sm group"
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[#C85A32] group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm text-[#736D66]">
                Rechercher Télibô, Amiwo, Dakouin, Yassa, épices...
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#C85A32] bg-[#F8EFEB] px-2 py-1 rounded-md">
              Explorer
            </span>
          </button>
        </div>
      </section>

      {/* ANTI-PANIQUE DECIDER CARD: "Tu ne vas plus jamais te demander qu'est-ce qu'on mange aujourd'hui" */}
      <section
        id="home-anti-panic-card"
        className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#1C1A18] via-[#2D231E] to-[#1C1A18] text-white shadow-xl space-y-3.5 relative overflow-hidden"
      >
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#C85A32]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Moteur Anti-Panique du Quotidien
            </span>
            <h2 className="font-editorial text-lg sm:text-xl font-bold text-white leading-tight">
              Ne te demande plus jamais quoi manger
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              L'application analyse ton foyer ({currentStove.label}), ton budget ({currentBudget.label}) et tes convives ({conditions.servings} pers) pour te donner un plan d'action prêt à cuisiner.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-2xl flex-shrink-0">
            🎲
          </div>
        </div>

        <div className="pt-1 flex items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={() => setIsWhatToEatOpen(true)}
            className="flex-1 h-12 rounded-2xl bg-[#C85A32] hover:bg-[#A64420] text-white text-xs font-bold shadow-md shadow-[#C85A32]/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Dice5 className="w-4 h-4" />
            <span>Décide pour moi aujourd'hui</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenConditionsModal && (
            <button
              type="button"
              onClick={onOpenConditionsModal}
              title="Modifier mes critères"
              className="h-12 px-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Ajuster</span>
            </button>
          )}
        </div>
      </section>

      {/* Hero Card: Idée du jour */}
      {heroRecipe && (
        <section aria-labelledby="heading-idea-of-day" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66]">
              Suggestion personnalisée du jour
            </span>
            <span className="text-[11px] text-[#C85A32] font-semibold flex items-center gap-1">
              <span>{currentStove.icon}</span>
              <span>{currentStove.label}</span>
            </span>
          </div>
          <RecipeCard
            recipe={heroRecipe}
            isFavorite={favorites.includes(heroRecipe.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectRecipe={onSelectRecipe}
            variant="hero"
          />
        </section>
      )}

      {/* PLATS LOCAUX DU BÉNIN: SECTION VEDETTE */}
      <section className="space-y-3" aria-labelledby="heading-benin-specialties">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B26] flex items-center gap-1">
              <span>🇧🇯</span> Patrimoine & Traditions
            </span>
            <h2 id="heading-benin-specialties" className="font-editorial text-lg font-bold text-[#1C1A18]">
              Plats locaux & authentiques du Bénin
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenSearch('Bénin')}
            className="text-xs font-semibold text-[#C85A32] hover:underline flex items-center gap-0.5"
          >
            <span>Voir tout ({beninRecipes.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {beninRecipes.slice(0, 4).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              variant="grid"
            />
          ))}
        </div>
      </section>

      {/* Exploration 4 Categories: 2x2 Grid */}
      <section className="space-y-3" aria-labelledby="heading-exploration">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66]">
              Exploration culinaire
            </span>
            <h2 id="heading-exploration" className="font-editorial text-lg font-bold text-[#1C1A18]">
              Par quoi veux-tu commencer ?
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Bénin */}
          <button
            id="cat-benin"
            type="button"
            onClick={() => onOpenSearch('Bénin')}
            className="group text-left p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] hover:border-[#C85A32]/40 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
              🇧🇯
            </div>
            <h3 className="font-editorial text-sm font-bold text-[#1C1A18] leading-tight mb-1 flex items-center justify-between">
              <span>Cuisine béninoise</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#736D66] group-hover:translate-x-0.5 group-hover:text-[#C85A32] transition-all" />
            </h3>
            <p className="text-[11px] text-[#736D66] line-clamp-2 leading-relaxed">
              Télibô, Amiwo, Atassi, Dakouin et sauces feuilles royales.
            </p>
          </button>

          {/* Afrique de l'Ouest */}
          <button
            id="cat-west-africa"
            type="button"
            onClick={() => onOpenSearch('Afrique')}
            className="group text-left p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] hover:border-[#C85A32]/40 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-[#F8EFEB] text-[#C85A32] flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
              🌍
            </div>
            <h3 className="font-editorial text-sm font-bold text-[#1C1A18] leading-tight mb-1 flex items-center justify-between">
              <span>Afrique de l'Ouest</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#736D66] group-hover:translate-x-0.5 group-hover:text-[#C85A32] transition-all" />
            </h3>
            <p className="text-[11px] text-[#736D66] line-clamp-2 leading-relaxed">
              Yassa, mafé fondant, jollof braisé & sauces onctueuses.
            </p>
          </button>

          {/* Afrique */}
          <button
            id="cat-africa"
            type="button"
            onClick={() => onNavigateToTab('discover')}
            className="group text-left p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] hover:border-[#C85A32]/40 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
              ☀️
            </div>
            <h3 className="font-editorial text-sm font-bold text-[#1C1A18] leading-tight mb-1 flex items-center justify-between">
              <span>Grands Mijotés</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#736D66] group-hover:translate-x-0.5 group-hover:text-[#C85A32] transition-all" />
            </h3>
            <p className="text-[11px] text-[#736D66] line-clamp-2 leading-relaxed">
              Ndolé aux gambas, tajines parfumés & sauces arachides confites.
            </p>
          </button>

          {/* Monde */}
          <button
            id="cat-world"
            type="button"
            onClick={() => onOpenSearch('Monde')}
            className="group text-left p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] hover:border-[#C85A32]/40 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] text-[#736D66] flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
              ✈️
            </div>
            <h3 className="font-editorial text-sm font-bold text-[#1C1A18] leading-tight mb-1 flex items-center justify-between">
              <span>Cuisines du Monde</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#736D66] group-hover:translate-x-0.5 group-hover:text-[#C85A32] transition-all" />
            </h3>
            <p className="text-[11px] text-[#736D66] line-clamp-2 leading-relaxed">
              Currys doux, woks express aux épices & inspirations nomades.
            </p>
          </button>
        </div>
      </section>

      {/* Pill Filter Bar */}
      <section className="space-y-3" aria-labelledby="heading-curated-list">
        <div className="flex items-center justify-between">
          <h2 id="heading-curated-list" className="font-editorial text-lg font-bold text-[#1C1A18]">
            Sélection selon tes envies
          </h2>
          <span className="text-xs text-[#736D66]">
            {filteredPillRecipes.length} recettes trouvées
          </span>
        </div>

        {/* Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {pills.map((pill) => {
            const isActive = activePill === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActivePill(pill.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1C1A18] text-white shadow-xs'
                    : 'bg-white text-[#736D66] border border-[#EBE5DC] hover:border-stone-300'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {filteredPillRecipes.slice(0, 6).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              variant="grid"
            />
          ))}
        </div>
      </section>

      {/* Modal Anti-Panique */}
      <WhatToEatTodayModal
        isOpen={isWhatToEatOpen}
        onClose={() => setIsWhatToEatOpen(false)}
        recipes={recipes}
        conditions={conditions}
        onSelectRecipe={onSelectRecipe}
        onStartCooking={(recipe) => {
          if (onStartCooking) {
            onStartCooking(recipe);
          } else {
            onSelectRecipe(recipe);
          }
        }}
      />
    </div>
  );
}
