const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(
  `<FridgeView
                recipes={RECIPES}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
              />`,
  `<FridgeView
                recipes={recipes}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
                user={user}
                cookingConditions={cookingConditions}
              />`
);
fs.writeFileSync('src/App.tsx', appCode);

let fridgeCode = fs.readFileSync('src/views/FridgeView.tsx', 'utf8');

// replace interface FridgeViewProps
fridgeCode = fridgeCode.replace(
  `interface FridgeViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}`,
  `import { UserProfile, CookingConditions } from '../types';

interface FridgeViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  user: UserProfile;
  cookingConditions: CookingConditions;
}`
);

// update function signature
fridgeCode = fridgeCode.replace(
  `export function FridgeView({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe
}: FridgeViewProps) {`,
  `export function FridgeView({
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
  };`
);

// inject button and AI result before the Results Section
fridgeCode = fridgeCode.replace(
  `{/* Results Section */}`,
  `{/* AI Generation Section */}
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

      {/* Results Section */}`
);

fs.writeFileSync('src/views/FridgeView.tsx', fridgeCode);
