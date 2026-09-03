import { useState, useMemo } from 'react';
import { Heart, Sparkles, Compass, ArrowRight, Utensils } from 'lucide-react';
import { Recipe, TabDestination } from '../types';
import { RecipeCard } from '../components/RecipeCard';

interface FavoritesViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigateToTab: (tab: TabDestination) => void;
}

export function FavoritesView({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  onNavigateToTab
}: FavoritesViewProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'quick' | 'party' | 'discovery'>('all');

  const favoriteRecipes = useMemo(() => {
    return recipes.filter((r) => favorites.includes(r.id));
  }, [recipes, favorites]);

  const filteredFavorites = useMemo(() => {
    return favoriteRecipes.filter((r) => {
      if (activeCategory === 'quick') return r.durationMinutes <= 35;
      if (activeCategory === 'party') return r.category === 'plat-de-fete' || r.isSignature;
      if (activeCategory === 'discovery') return r.region === 'africa' || r.region === 'world';
      return true;
    });
  }, [favoriteRecipes, activeCategory]);

  return (
    <div id="favorites-view" className="space-y-6 pb-12">
      {/* Header */}
      <section className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C85A32]">
          <Heart className="w-3.5 h-3.5 fill-[#C85A32]" />
          <span>Carnet Gourmand</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] tracking-tight leading-tight">
            Mes favoris
          </h1>
          <span className="px-2.5 py-1 rounded-full bg-[#F8EFEB] text-[#C85A32] text-xs font-bold border border-[#C85A32]/20">
            {favoriteRecipes.length} recettes
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#736D66] font-normal leading-relaxed">
          Votre sélection personnelle de trésors mijotés et d'épices voyageuses.
        </p>

        {/* Filter Pills */}
        {favoriteRecipes.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3">
            {[
              { id: 'all', label: `Toutes (${favoriteRecipes.length})` },
              { id: 'quick', label: 'Repas rapides' },
              { id: 'party', label: 'Plats de fête' },
              { id: 'discovery', label: 'Découvertes' }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`fav-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveCategory(tab.id as 'all' | 'quick' | 'party' | 'discovery')}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#1C1A18] text-white shadow-xs'
                    : 'bg-white text-[#736D66] border border-[#EBE5DC] hover:border-[#736D66]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Grid of Favorites */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredFavorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              variant="grid"
            />
          ))}
        </div>
      ) : favoriteRecipes.length > 0 ? (
        <div className="py-12 px-4 text-center rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] space-y-2">
          <p className="text-xs text-[#736D66]">
            Aucune recette favorite dans cette catégorie.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="text-xs font-semibold text-[#C85A32] underline"
          >
            Afficher tous mes favoris
          </button>
        </div>
      ) : (
        /* Empty State */
        <div className="py-14 px-6 text-center rounded-3xl bg-white border border-[#EBE5DC] shadow-[0_4px_20px_rgba(40,20,10,0.03)] space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#F8EFEB] text-[#C85A32] flex items-center justify-center">
            <Heart className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-xs mx-auto">
            <h3 className="font-editorial text-lg font-bold text-[#1C1A18]">
              Votre carnet est encore vierge
            </h3>
            <p className="text-xs text-[#736D66] leading-relaxed">
              Explorez nos trésors culinaires et touchez l'icône de cœur pour conserver ici vos plats préférés et y accéder à tout moment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('home')}
            className="px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#A64420] text-white text-xs font-semibold shadow-xs flex items-center gap-2 mx-auto transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Explorer la carte des délices</span>
          </button>
        </div>
      )}

      {/* Recommendation Bottom Card */}
      <section className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B26] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Envie de nouvelles saveurs ?
          </span>
          <p className="text-xs text-[#736D66]">
            Découvrez nos suggestions du terroir fraîchement mijotées.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateToTab('discover')}
          className="flex-shrink-0 px-3 py-2 rounded-xl bg-white border border-[#EBE5DC] text-xs font-semibold text-[#1C1A18] hover:border-[#C85A32] hover:text-[#C85A32] transition-colors flex items-center gap-1 shadow-2xs"
        >
          <span>Découvrir</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
}
