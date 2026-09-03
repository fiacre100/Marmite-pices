import { useState, useMemo } from 'react';
import { Search as SearchIcon, X, SlidersHorizontal, Sparkles, Lightbulb, Clock } from 'lucide-react';
import { Recipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';

interface SearchViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  initialQuery?: string;
}

export function SearchView({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  initialQuery = ''
}: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedTime, setSelectedTime] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'duration' | 'rating' | 'alpha'>('relevance');

  const inspirationTags = [
    'Poulet Yassa',
    'Amiwo béninois',
    'Sauce arachide',
    'Thiéboudienne',
    'Ndolé',
    'Riz Jollof',
    'Dakouin',
    'Attiéké'
  ];

  // Filtering logic
  const filteredRecipes = useMemo(() => {
    let list = recipes.filter((r) => {
      // Search term in title, description, tags, country, or ingredients
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q);
        const matchesCountry = r.country.toLowerCase().includes(q);
        const matchesTag = r.tags.some((t) => t.toLowerCase().includes(q));
        const matchesIng = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCountry && !matchesTag && !matchesIng) {
          return false;
        }
      }

      // Country filter
      if (selectedCountry !== 'all') {
        if (r.country.toLowerCase() !== selectedCountry.toLowerCase()) return false;
      }

      // Time filter
      if (selectedTime === 'under30' && r.durationMinutes > 30) return false;
      if (selectedTime === '30to60' && (r.durationMinutes < 30 || r.durationMinutes > 60)) return false;
      if (selectedTime === 'over60' && r.durationMinutes <= 60) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && r.difficulty !== selectedDifficulty) return false;

      return true;
    });

    // Sorting
    if (sortBy === 'duration') {
      list = [...list].sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'alpha') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [recipes, searchQuery, selectedCountry, selectedTime, selectedDifficulty, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedTime('all');
    setSelectedDifficulty('all');
  };

  return (
    <div id="search-view" className="space-y-6 pb-12">
      {/* Header */}
      <section className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C85A32]">
            Recherche Gourmande
          </span>
          <span className="text-[11px] font-semibold text-[#736D66] bg-[#FAF4E8] text-[#D99B26] px-2 py-0.5 rounded-full border border-[#D99B26]/20">
            {recipes.length} recettes dispo
          </span>
        </div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] tracking-tight leading-tight">
          Que cherches-tu ?
        </h1>
        <p className="text-xs sm:text-sm text-[#736D66]">
          Trouve l'inspiration parmi nos trésors culinaires et épices solaires.
        </p>

        {/* Search Input Bar */}
        <div className="pt-2">
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C85A32]" />
            <input
              id="search-input-field"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex. Yassa, Amiwo, arachide, mérou, plantain..."
              className="w-full h-12 bg-white rounded-xl border border-[#EBE5DC] pl-10 pr-10 text-sm text-[#1C1A18] placeholder:text-[#736D66]/70 focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:border-transparent shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Effacer la recherche"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#736D66] hover:text-[#1C1A18]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Inspirations du moment */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D99B26]" />
            Inspirations du moment :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {inspirationTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#EBE5DC] text-[11px] text-[#736D66] hover:border-[#C85A32] hover:text-[#C85A32] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Row */}
      <section className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between text-xs text-[#736D66]">
          <span className="font-semibold flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C85A32]" />
            Filtres de terroir
          </span>
          {(selectedCountry !== 'all' || selectedTime !== 'all' || selectedDifficulty !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-semibold text-[#C85A32] hover:underline"
            >
              Réinitialiser
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Country select */}
          <select
            id="filter-country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-white border border-[#EBE5DC] rounded-xl px-2.5 py-2 text-xs text-[#1C1A18] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
          >
            <option value="all">🌍 Origine (Tout)</option>
            <option value="Bénin">🇧🇯 Bénin</option>
            <option value="Sénégal">🇸🇳 Sénégal</option>
            <option value="Cameroun">🇨🇲 Cameroun</option>
            <option value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
            <option value="Mali">🇲🇱 Mali</option>
            <option value="Nigeria">🇳🇬 Nigeria</option>
            <option value="Maroc">🇲🇦 Maroc</option>
          </select>

          {/* Time select */}
          <select
            id="filter-time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full bg-white border border-[#EBE5DC] rounded-xl px-2.5 py-2 text-xs text-[#1C1A18] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
          >
            <option value="all">⏱ Temps (Tous)</option>
            <option value="under30">&lt; 30 min</option>
            <option value="30to60">30 - 60 min</option>
            <option value="over60">&gt; 60 min</option>
          </select>

          {/* Difficulty select */}
          <select
            id="filter-difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-white border border-[#EBE5DC] rounded-xl px-2.5 py-2 text-xs text-[#1C1A18] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
          >
            <option value="all">👨‍🍳 Niveau (Tous)</option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </section>

      {/* Results Header: Count & Sort */}
      <div className="flex items-center justify-between pt-1 border-t border-[#EBE5DC]">
        <h2 className="text-xs font-semibold text-[#1C1A18]">
          Recettes trouvées ({filteredRecipes.length})
        </h2>

        <div className="flex items-center gap-1.5 text-xs text-[#736D66]">
          <span>Trier :</span>
          <select
            id="search-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'relevance' | 'duration' | 'rating' | 'alpha')}
            className="bg-transparent font-semibold text-[#C85A32] focus:outline-none cursor-pointer"
          >
            <option value="relevance">Pertinence</option>
            <option value="duration">Durée croissante</option>
            <option value="rating">Mieux notées</option>
            <option value="alpha">Nom (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredRecipes.map((recipe) => (
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
      ) : (
        <div className="py-12 px-4 text-center rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#F8EFEB] text-[#C85A32] flex items-center justify-center">
            <SearchIcon className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-base font-bold text-[#1C1A18]">
            Aucune recette trouvée
          </h3>
          <p className="text-xs text-[#736D66] max-w-xs mx-auto">
            Nous n'avons pas trouvé de plat correspondant à vos critères actuels. Essayez avec un ingrédient ou un pays différent.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#C85A32] text-white text-xs font-semibold shadow-xs"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Astuce du Chef Bottom Card */}
      <section className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7F5E]">
            Astuce du Chef
          </span>
          <p className="text-xs text-[#736D66] leading-relaxed">
            Tape un ingrédient solitaire de ton garde-manger (ex : « plantain », « gari » ou « moutarde ») pour révéler tous les plats traditionnels qui le subliment.
          </p>
        </div>
      </section>
    </div>
  );
}
