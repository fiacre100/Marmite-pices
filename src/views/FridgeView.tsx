import { useState, useMemo } from 'react';
import { Sparkles, Plus, X, Check, ShoppingBag, BookOpen, ChefHat, Clock } from 'lucide-react';
import { Recipe } from '../types';
import { PANTRY_COMMON_INGREDIENTS } from '../data/recipes';

import { UserProfile, CookingConditions } from '../types';

interface FridgeViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  user: UserProfile;
  cookingConditions: CookingConditions;
}

export function FridgeView({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  user,
  cookingConditions
}: FridgeViewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiRecipe, setAiRecipe] = useState<Recipe | null>(null);

  const generateRecipe = async () => {
    if (selectedIngredients.length === 0) return;
    setIsGenerating(true);
    setAiRecipe(null);
    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          preferences: user.preferences,
          cookingConditions
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAiRecipe(data);
      } else {
        alert("Erreur de l'IA: " + (data.error || 'Inconnue'));
      }
    } catch (e) {
      console.error(e);
      alert('Impossible de joindre le serveur.');
    } finally {
      setIsGenerating(false);
    }
  };
  // Default selected ingredients matching screenshot: Poulet, Tomate, Oignon, Riz
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Poulet',
    'Tomate',
    'Oignon',
    'Riz'
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = (item: string) => {
    const clean = item.trim();
    if (!clean) return;
    if (!selectedIngredients.some((i) => i.toLowerCase() === clean.toLowerCase())) {
      setSelectedIngredients([...selectedIngredients, clean]);
    }
    setInputValue('');
  };

  const handleRemoveIngredient = (item: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== item));
  };

  // Classify recipes into: 100% en stock OR 1-2 missing ingredients
  const { exactMatches, nearMatches } = useMemo(() => {
    if (selectedIngredients.length === 0) {
      return { exactMatches: [], nearMatches: [] };
    }

    const selectedNormalized = selectedIngredients.map((s) => s.toLowerCase());

    const exact: Recipe[] = [];
    const near: { recipe: Recipe; missing: string[] }[] = [];

    recipes.forEach((recipe) => {
      // Find how many key ingredients match
      const recipeIngredients = recipe.ingredients.map((ing) => ing.name);
      
      const missingList: string[] = [];
      let matchCount = 0;

      recipeIngredients.forEach((ingName) => {
        const hasMatch = selectedNormalized.some(
          (sel) => ingName.toLowerCase().includes(sel) || sel.includes(ingName.toLowerCase())
        );
        if (hasMatch) {
          matchCount++;
        } else {
          // Keep only main missing ingredients, omitting water, salt, basic oils
          if (!ingName.toLowerCase().includes('sel') && !ingName.toLowerCase().includes('eau')) {
            missingList.push(ingName);
          }
        }
      });

      // If at least 2 selected ingredients match
      if (matchCount >= 2) {
        if (missingList.length === 0 || matchCount >= recipeIngredients.length * 0.7) {
          exact.push(recipe);
        } else if (missingList.length <= 3) {
          near.push({ recipe, missing: missingList.slice(0, 2) });
        }
      }
    });

    return { exactMatches: exact, nearMatches: near };
  }, [recipes, selectedIngredients]);

  const totalPossible = exactMatches.length + nearMatches.length;

  return (
    <div id="fridge-view" className="space-y-6 pb-12">
      {/* Header */}
      <section className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C85A32]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier de Cuisine</span>
        </div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] tracking-tight leading-tight">
          Qu'y a-t-il dans ta cuisine ?
        </h1>
        <p className="text-xs sm:text-sm text-[#736D66] font-normal leading-relaxed">
          Indique ce que tu as sous la main, nous composons le menu sans gaspiller une miette.
        </p>

        {/* Input Bar */}
        <div className="pt-2 flex gap-2">
          <input
            id="fridge-ingredient-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddIngredient(inputValue);
            }}
            placeholder="Ex. Courgettes, poivron, riz, plantain..."
            className="flex-1 h-12 bg-white rounded-xl border border-[#EBE5DC] px-4 text-sm text-[#1C1A18] placeholder:text-[#736D66]/70 focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:border-transparent shadow-2xs"
          />
          <button
            id="fridge-add-btn"
            type="button"
            onClick={() => handleAddIngredient(inputValue)}
            className="h-12 px-4 rounded-xl bg-[#C85A32] hover:bg-[#A64420] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>

        {/* Selected Ingredients Chips */}
        <div className="pt-2 space-y-2">
          <span className="text-[11px] font-semibold text-[#1C1A18]">
            Mes ingrédients sélectionnés :
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8EFEB] border border-[#C85A32]/20 text-[#C85A32] text-xs font-semibold shadow-2xs animate-in fade-in"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(item)}
                  aria-label={`Supprimer ${item}`}
                  className="w-4 h-4 rounded-full bg-[#C85A32]/10 hover:bg-[#C85A32] hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedIngredients.length === 0 && (
              <p className="text-xs text-[#736D66] italic">
                Aucun ingrédient sélectionné. Cliquez ci-dessous ou tapez dans le champ.
              </p>
            )}
          </div>
        </div>

        {/* Quick Pantry Additions */}
        <div className="pt-2 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66]">
            Ajouts rapides souvent au placard :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PANTRY_COMMON_INGREDIENTS.filter(
              (p) => !selectedIngredients.some((s) => s.toLowerCase() === p.toLowerCase())
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleAddIngredient(item)}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#EBE5DC] text-[11px] text-[#736D66] hover:border-[#6B7F5E] hover:text-[#6B7F5E] transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-3">
          <a
            href="#fridge-results-section"
            className="w-full h-12 rounded-xl bg-[#1C1A18] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#D99B26]" />
            <span>Voir ce que je peux cuisiner ({totalPossible} recettes)</span>
          </a>
        </div>
      </section>

      {/* AI Generation Section */}
      <section className="py-4">
        <button
          onClick={generateRecipe}
          disabled={isGenerating || selectedIngredients.length === 0}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-gradient-to-r from-[#D35400] to-[#C85A32] text-white font-bold text-sm shadow-md shadow-[#D35400]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              Création en cours...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Surprenez-moi (Gemini AI)
            </span>
          )}
        </button>

        {aiRecipe && (
          <div className="mt-4 p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-editorial text-lg font-bold text-emerald-900">✨ Recette de l'IA</h3>
              <button 
                onClick={() => onSelectRecipe(aiRecipe)}
                className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700"
              >
                Cuisiner ça
              </button>
            </div>
            <p className="text-sm text-emerald-800 font-medium mb-1">{aiRecipe.title}</p>
            <p className="text-xs text-emerald-700">{aiRecipe.description}</p>
          </div>
        )}
      </section>

      {/* Results Section */}
      <section id="fridge-results-section" className="space-y-6 pt-2">
        <div>
          <h2 className="font-editorial text-lg font-bold text-[#1C1A18]">
            Voici ce que tu peux cuisiner
          </h2>
          <p className="text-xs text-[#736D66]">
            Suggestions adaptées à tes {selectedIngredients.length} ingrédients en réserve.
          </p>
        </div>

        {/* Section 1: 100% en stock */}
        {exactMatches.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Tu as tous les ingrédients ({exactMatches.length} recettes)
              </h3>
            </div>

            <div className="space-y-3">
              {exactMatches.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') onSelectRecipe(recipe); }}
                  className="group p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-[0_2px_12px_rgba(16,185,129,0.05)] cursor-pointer hover:border-emerald-300 transition-all flex flex-col sm:flex-row gap-3.5"
                >
                  <div className="relative w-full sm:w-28 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Check className="w-3 h-3" />
                      100% en stock
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#736D66] mb-1">
                        <span>{recipe.countryFlag}</span>
                        <span>{recipe.country}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#C85A32]">
                          <Clock className="w-3 h-3" />
                          {recipe.durationMinutes} min
                        </span>
                      </div>
                      <h4 className="font-editorial text-base font-bold text-[#1C1A18] leading-tight group-hover:text-[#C85A32] transition-colors">
                        {recipe.title}
                      </h4>
                      <p className="text-xs text-[#736D66] line-clamp-2 mt-1 leading-relaxed">
                        {recipe.subtitle}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#EBE5DC]/60 flex flex-wrap items-center gap-1.5">
                      {recipe.ingredients.slice(0, 4).map((ing) => (
                        <span
                          key={ing.name}
                          className="px-2 py-0.5 rounded-md bg-[#EBF0E6] text-emerald-800 text-[10px] font-medium"
                        >
                          ✓ {ing.name.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: 1 ou 2 appoints faciles */}
        {nearMatches.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Il te manque juste 1 ou 2 ingrédients ({nearMatches.length} recettes)
              </h3>
            </div>

            <div className="space-y-3">
              {nearMatches.map(({ recipe, missing }) => (
                <div
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') onSelectRecipe(recipe); }}
                  className="group p-3.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.02)] cursor-pointer hover:border-[#C85A32]/40 transition-all flex flex-col sm:flex-row gap-3.5"
                >
                  <div className="relative w-full sm:w-28 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <ShoppingBag className="w-3 h-3" />
                      Appoint facile
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#736D66] mb-1">
                        <span>{recipe.countryFlag}</span>
                        <span>{recipe.country}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#C85A32]">
                          <Clock className="w-3 h-3" />
                          {recipe.durationMinutes} min
                        </span>
                      </div>
                      <h4 className="font-editorial text-base font-bold text-[#1C1A18] leading-tight group-hover:text-[#C85A32] transition-colors">
                        {recipe.title}
                      </h4>
                      <p className="text-xs text-[#736D66] line-clamp-2 mt-1 leading-relaxed">
                        {recipe.subtitle}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#EBE5DC]/60 flex items-center gap-2 text-xs text-[#736D66]">
                      <span className="font-medium text-[#C85A32]">À prévoir :</span>
                      <div className="flex flex-wrap gap-1">
                        {missing.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded-md bg-[#FAF4E8] border border-[#D99B26]/30 text-[#D99B26] text-[10px] font-medium"
                          >
                            + {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* L'astuce de grand-mère banner */}
        <section className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B26]">
              L'astuce de grand-mère
            </span>
            <p className="text-xs text-[#736D66] leading-relaxed">
              Ajoute un filet d'huile ou de jus de citron vert pour préserver le goût des oignons dorés sans les brûler pendant que tu prépares le bouillon.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
