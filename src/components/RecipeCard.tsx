import { Heart, Clock, ChefHat, Star } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  key?: string | number;
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  variant?: 'grid' | 'horizontal' | 'list' | 'hero';
}

export function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
  variant = 'grid'
}: RecipeCardProps) {
  // Hero featured card
  if (variant === 'hero') {
    return (
      <div
        id={`recipe-hero-${recipe.id}`}
        onClick={() => onSelectRecipe(recipe)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectRecipe(recipe); }}
        className="group relative w-full bg-white rounded-2xl overflow-hidden border border-[#EBE5DC] shadow-[0_8px_24px_rgba(40,20,10,0.06)] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Top badges & Favorite button */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C85A32] text-white text-xs font-semibold shadow-sm backdrop-blur-xs">
              <span>Idée du jour</span>
            </span>

            <button
              id={`fav-hero-${recipe.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe.id);
              }}
              aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : 'text-white'
                }`}
              />
            </button>
          </div>

          {/* Hero text overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="text-[11px] font-semibold tracking-wider uppercase text-amber-200/90 mb-1 flex items-center gap-1">
              <span>{recipe.countryFlag}</span>
              <span>{recipe.badgeLabel || 'Plat Signature'}</span>
            </p>
            <h3 className="font-editorial text-xl font-bold text-white leading-tight mb-1">
              {recipe.title}
            </h3>
            <p className="text-xs text-white/80 line-clamp-1 font-normal mb-2">
              {recipe.subtitle}
            </p>

            <div className="flex items-center gap-3 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.durationMinutes} min
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {recipe.difficulty}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {recipe.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Horizontal card for carousels
  if (variant === 'horizontal') {
    return (
      <div
        id={`recipe-horiz-${recipe.id}`}
        onClick={() => onSelectRecipe(recipe)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectRecipe(recipe); }}
        className="group relative flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden border border-[#EBE5DC] shadow-[0_4px_16px_rgba(40,20,10,0.03)] cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <span className="pointer-events-auto px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-[#1C1A18] border border-black/5 shadow-2xs">
              {recipe.countryFlag} {recipe.country}
            </span>
            <button
              id={`fav-horiz-${recipe.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe.id);
              }}
              aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              className="pointer-events-auto w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs border border-black/5 flex items-center justify-center shadow-2xs transition-transform active:scale-90"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : 'text-[#736D66]'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#1C1A18] leading-tight line-clamp-1 mb-1">
              {recipe.title}
            </h4>
            <p className="text-[11px] text-[#736D66] line-clamp-2 leading-relaxed">
              {recipe.subtitle}
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#EBE5DC]/60 flex items-center justify-between text-[11px] text-[#736D66]">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-[#C85A32]" />
              {recipe.durationMinutes} min
            </span>
            <span className="font-medium text-[#6B7F5E]">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Vertical list card
  if (variant === 'list') {
    return (
      <div
        id={`recipe-list-${recipe.id}`}
        onClick={() => onSelectRecipe(recipe)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectRecipe(recipe); }}
        className="group relative w-full bg-white rounded-xl p-3 border border-[#EBE5DC] shadow-[0_2px_12px_rgba(40,20,10,0.02)] cursor-pointer transition-all hover:shadow-md flex items-center gap-3.5"
      >
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs">{recipe.countryFlag}</span>
            <span className="text-[10px] font-semibold text-[#736D66] uppercase tracking-wider">
              {recipe.country}
            </span>
            {recipe.badgeLabel && (
              <span className="text-[10px] text-[#C85A32] bg-[#F8EFEB] px-1.5 py-0.2 rounded font-medium">
                {recipe.badgeLabel}
              </span>
            )}
          </div>

          <h4 className="font-editorial text-sm font-bold text-[#1C1A18] leading-snug line-clamp-1 mb-1">
            {recipe.title}
          </h4>

          <div className="flex items-center gap-2.5 text-[11px] text-[#736D66]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C85A32]" />
              {recipe.durationMinutes} min
            </span>
            <span>•</span>
            <span>{recipe.difficulty}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-amber-600 font-medium">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              {recipe.rating}
            </span>
          </div>
        </div>

        <button
          id={`fav-list-${recipe.id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#F8EFEB] flex items-center justify-center transition-transform active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : 'text-[#736D66]'
            }`}
          />
        </button>
      </div>
    );
  }

  // Default: 2-column grid card
  return (
    <div
      id={`recipe-grid-${recipe.id}`}
      onClick={() => onSelectRecipe(recipe)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectRecipe(recipe); }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#EBE5DC] shadow-[0_2px_12px_rgba(40,20,10,0.03)] cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-xs text-[10px] font-medium text-white shadow-2xs">
            {recipe.countryFlag} {recipe.country}
          </span>
          <button
            id={`fav-grid-${recipe.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className="pointer-events-auto w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs border border-black/5 flex items-center justify-center shadow-2xs transition-transform active:scale-90"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : 'text-[#736D66]'
              }`}
            />
          </button>
        </div>

        {recipe.badgeLabel && (
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-0.5 rounded-md bg-[#C85A32] text-[10px] font-semibold text-white shadow-2xs">
              {recipe.badgeLabel}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-editorial text-sm font-bold text-[#1C1A18] leading-snug line-clamp-1 mb-1">
            {recipe.title}
          </h4>
          <p className="text-[11px] text-[#736D66] line-clamp-1">
            {recipe.subtitle}
          </p>
        </div>

        <div className="mt-2.5 pt-2 border-t border-[#EBE5DC]/60 flex items-center justify-between text-[11px] text-[#736D66]">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3 text-[#C85A32]" />
            {recipe.durationMinutes} min
          </span>
          <span className="flex items-center gap-1 font-medium text-[#6B7F5E]">
            <ChefHat className="w-3 h-3" />
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}
