import { useState } from 'react';
import { Compass, Globe, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Recipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { COUNTRIES } from '../data/recipes';

interface DiscoverViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenSearch: (query?: string) => void;
}

export function DiscoverView({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  onOpenSearch
}: DiscoverViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'countries' | 'africa' | 'world'>('all');

  const chefPicks = recipes.filter((r) => r.isSignature);
  const discoveryRecipes = recipes.filter((r) => r.badgeLabel?.includes('Découvrir') || r.badgeLabel?.includes('Horizons') || r.badgeLabel?.includes('Saveur'));

  return (
    <div id="discover-view" className="space-y-7 pb-10">
      {/* Header */}
      <section className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#6B7F5E]">
          <Compass className="w-3.5 h-3.5" />
          <span>Carnet d'Explorations</span>
        </div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] tracking-tight leading-tight">
          Découvrir
        </h1>
        <p className="text-xs sm:text-sm text-[#736D66] font-normal leading-relaxed">
          Parcourez les horizons culinaires du Bénin, d'Afrique et du monde entier.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3">
          {[
            { id: 'all', label: 'Tout' },
            { id: 'countries', label: '🌍 Par pays' },
            { id: 'africa', label: '☀️ Afrique' },
            { id: 'world', label: '✈️ Cuisines du monde' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`discover-tab-${tab.id}`}
              type="button"
              onClick={() => setActiveFilter(tab.id as 'all' | 'countries' | 'africa' | 'world')}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#1C1A18] text-white shadow-xs'
                  : 'bg-white text-[#736D66] border border-[#EBE5DC] hover:border-[#736D66]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grandes Traversées - 3 Big Banners */}
      <section className="space-y-3" aria-labelledby="heading-traverses">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66]">
          Grandes Traversées
        </span>
        <h2 id="heading-traverses" className="sr-only">Grandes Traversées</h2>

        <div className="space-y-3">
          {/* Banner 1: Terroirs Locaux & Bénin */}
          <div
            onClick={() => onOpenSearch('Bénin')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onOpenSearch('Bénin'); }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#EBE5DC] shadow-[0_4px_16px_rgba(40,20,10,0.04)] transition-all hover:shadow-md"
          >
            <div className="relative h-44 w-full overflow-hidden bg-[#FAF4E8]">
              <img
                src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80"
                alt="Terroirs du Bénin"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-[#D99B26] text-white text-[11px] font-bold">
                  🇧🇯 42 recettes
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-editorial text-lg font-bold text-white mb-0.5 group-hover:text-amber-200 transition-colors">
                  Terroirs Locaux & Bénin
                </h3>
                <p className="text-xs text-white/80 line-clamp-1">
                  Amiwo, Dakouin, Sauce graine & Akassa onctueux
                </p>
              </div>
            </div>
          </div>

          {/* Banner 2: Richesses d'Afrique */}
          <div
            onClick={() => onOpenSearch('Afrique')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onOpenSearch('Afrique'); }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#EBE5DC] shadow-[0_4px_16px_rgba(40,20,10,0.04)] transition-all hover:shadow-md"
          >
            <div className="relative h-44 w-full overflow-hidden bg-[#F8EFEB]">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
                alt="Richesses d'Afrique"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-[#C85A32] text-white text-[11px] font-bold">
                  🌍 85 recettes
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-editorial text-lg font-bold text-white mb-0.5 group-hover:text-amber-200 transition-colors">
                  Richesses d'Afrique
                </h3>
                <p className="text-xs text-white/80 line-clamp-1">
                  Yassa, Thieboudienne, Mafé crémeux, Ndolé & Saka-saka
                </p>
              </div>
            </div>
          </div>

          {/* Banner 3: Saveurs Internationales */}
          <div
            onClick={() => onOpenSearch('Maroc')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onOpenSearch('Maroc'); }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#EBE5DC] shadow-[0_4px_16px_rgba(40,20,10,0.04)] transition-all hover:shadow-md"
          >
            <div className="relative h-44 w-full overflow-hidden bg-[#EBF0E6]">
              <img
                src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80"
                alt="Saveurs Internationales"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-[#6B7F5E] text-white text-[11px] font-bold">
                  ✈️ 50 recettes
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-editorial text-lg font-bold text-white mb-0.5 group-hover:text-amber-200 transition-colors">
                  Saveurs Internationales
                </h3>
                <p className="text-xs text-white/80 line-clamp-1">
                  Mijotés du monde, currys veloutés & tajines aux agrumes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer par pays */}
      <section className="space-y-3" aria-labelledby="heading-discover-countries">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66]">
              À travers le continent
            </span>
            <h2 id="heading-discover-countries" className="font-editorial text-lg font-bold text-[#1C1A18]">
              Explorer par pays
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              id={`discover-country-${country.id}`}
              type="button"
              onClick={() => onOpenSearch(country.name)}
              className="p-3 rounded-2xl bg-white border border-[#EBE5DC] text-left hover:border-[#C85A32]/40 transition-all shadow-[0_2px_8px_rgba(40,20,10,0.02)] flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl">{country.flag}</span>
                <span className="text-[10px] font-semibold text-[#736D66] bg-[#FAF6F0] px-2 py-0.5 rounded-full">
                  {country.count}
                </span>
              </div>
              <div>
                <h4 className="font-editorial text-sm font-bold text-[#1C1A18] group-hover:text-[#C85A32] transition-colors">
                  {country.name}
                </h4>
                <p className="text-[10px] text-[#736D66] line-clamp-1 mt-0.5">
                  {country.specialties}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* NOUVEAUX HORIZONS */}
      {discoveryRecipes.length > 0 && (
        <section className="space-y-3" aria-labelledby="heading-new-horizons">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B26]">
                Nouveaux Horizons
              </span>
              <h2 id="heading-new-horizons" className="font-editorial text-lg font-bold text-[#1C1A18]">
                À découvrir
              </h2>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4">
            {discoveryRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectRecipe={onSelectRecipe}
                variant="horizontal"
              />
            ))}
          </div>
        </section>
      )}

      {/* SÉLECTION DU CHEF: Incontournables de la semaine */}
      <section className="space-y-3" aria-labelledby="heading-chef-picks">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
              Sélection du Chef
            </span>
            <h2 id="heading-chef-picks" className="font-editorial text-lg font-bold text-[#1C1A18]">
              Incontournables de la semaine
            </h2>
          </div>
        </div>

        <div className="space-y-2.5">
          {chefPicks.slice(0, 4).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              variant="list"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
