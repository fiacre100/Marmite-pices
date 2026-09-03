import { useState, useEffect } from 'react';
import { Recipe, TabDestination, UserProfile, CookingConditions, DEFAULT_COOKING_CONDITIONS } from './types';
import { RECIPES, DEFAULT_FAVORITE_IDS } from './data/recipes';
import { AppHeader } from './components/AppHeader';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { DiscoverView } from './views/DiscoverView';
import { FridgeView } from './views/FridgeView';
import { SearchView } from './views/SearchView';
import { FavoritesView } from './views/FavoritesView';
import { ProfileView } from './views/ProfileView';
import { RecipeDetailView } from './views/RecipeDetailView';
import { CookingModeView } from './views/CookingModeView';
import { PremiumModal } from './components/PremiumModal';
import { LandingPageView } from './views/LandingPageView';
import { CookingConditionsModal } from './components/CookingConditionsModal';
import { AuthModal, AuthMode } from './components/AuthModal';
import { supabase } from './lib/supabase';

export function App() {
  // Mode: Landing Page (Vitrine) vs App (Application mobile interactive)
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<TabDestination>('home');

  // Overlays / Sub-views
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);

  // Global Auth Modal State (accessible from Profile or in-app triggers)
  const [isGlobalAuthOpen, setIsGlobalAuthOpen] = useState(false);
  const [globalAuthMode, setGlobalAuthMode] = useState<AuthMode>('signup');

  // Session, recipes and conditions state
  const [session, setSession] = useState<any>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);
  const [cookingConditions, setCookingConditions] = useState<CookingConditions>(DEFAULT_COOKING_CONDITIONS);

  // Favorites state persisted in localStorage or Supabase
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITE_IDS);

  // Cooking history
  const [cookingHistory, setCookingHistory] = useState<string[]>(['poulet-yassa', 'ndole-crevettes']);

  // User profile state
  const [user, setUser] = useState<UserProfile>({
    name: 'Aïssatou Diallo',
    title: 'Membre Explorateur Culinaire',
    speciality: 'Cuisines du Bénin & d\'Afrique de l\'Ouest',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    cookedCount: 28,
    favoriteSpicesCount: 14,
    isPremium: false,
    preferences: {
      spiciness: 'moyen',
      diet: ['Halal'],
      cookingTimePreference: '30-45min',
      soundAlerts: true,
      keepScreenOn: true
    }
  });



  // Load local fallback data
  const loadLocalFallback = () => {
    setSession(null);
    try {
      const storedFavorites = localStorage.getItem('marmite_favorites');
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      else setFavorites(DEFAULT_FAVORITE_IDS);
    } catch {}
    
    try {
      const storedUser = localStorage.getItem('marmite_user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {}
  };

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (profile) {
        setUser((prev) => ({
          ...prev,
          name: profile.name || prev.name,
          avatar: profile.avatar || prev.avatar,
          isPremium: profile.is_premium || false,
          cookedCount: profile.cooked_count || 0,
          preferences: profile.preferences || prev.preferences
        }));
        if (profile.cooking_conditions) setCookingConditions(profile.cooking_conditions);
        if (profile.cooking_history) setCookingHistory(profile.cooking_history);
      }

      // Fetch favorites
      const { data: userFavorites } = await supabase
        .from('user_favorites')
        .select('recipe_id')
        .eq('user_id', userId);

      if (userFavorites) {
        setFavorites(userFavorites.map(f => f.recipe_id));
      }
    } catch (e) {
      console.error('Error fetching user data', e);
    }
  };

  // Fetch recipes
  const fetchRecipes = async () => {
    try {
      const { data } = await supabase.from('recipes').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        // Map data to match Recipe type if needed, assuming it matches here
        setRecipes(data as Recipe[]);
      } else {
        // Fallback to local if empty
        setRecipes(RECIPES);
      }
    } catch (e) {
      console.error('Error fetching recipes', e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Sync Supabase Auth session and data
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        setSession(session);
        setUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email
        }));
        fetchUserData(session.user.id);
      } else {
        loadLocalFallback();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email
        }));
        fetchUserData(session.user.id);
      } else {
        loadLocalFallback();
      }
    });

    return () => subscription.unsubscribe();
  }, []);



  // Toggle favorite
  const handleToggleFavorite = async (recipeId: string) => {
    const isCurrentlyFavorite = favorites.includes(recipeId);
    
    // Update local state optimistically
    const newFavorites = isCurrentlyFavorite ? favorites.filter((id) => id !== recipeId) : [...favorites, recipeId];
    setFavorites(newFavorites);

    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      if (isCurrentlyFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .match({ user_id: session.user.id, recipe_id: recipeId });
      } else {
        await supabase
          .from('user_favorites')
          .insert({ user_id: session.user.id, recipe_id: recipeId });
      }
    } else {
      localStorage.setItem('marmite_favorites', JSON.stringify(newFavorites));
    }
  };

  // Open recipe detail
  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsCookingMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start cooking mode
  const handleStartCooking = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsCookingMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finish recipe from cooking mode
  const handleFinishRecipe = async (recipe: Recipe) => {
    setIsCookingMode(false);
    setSelectedRecipe(null);
    let updatedHistory = cookingHistory;
    if (!cookingHistory.includes(recipe.id)) {
      updatedHistory = [recipe.id, ...cookingHistory];
      setCookingHistory(updatedHistory);
    }
    const newCookedCount = user.cookedCount + 1;
    setUser((prev) => ({
      ...prev,
      cookedCount: newCookedCount
    }));

    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ 
          cooked_count: newCookedCount,
          cooking_history: updatedHistory
        })
        .eq('id', session.user.id);
    }
  };

  // Open search with optional seed query
  const handleOpenSearch = (initialQuery = '') => {
    setSearchInitialQuery(initialQuery);
    setIsSearching(true);
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tab change
  const handleTabChange = (tab: TabDestination) => {
    setActiveTab(tab);
    setSelectedRecipe(null);
    setIsCookingMode(false);
    setIsSearching(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update user profile partial
  const handleUpdateUser = async (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const updates: any = {};
      if (updated.name !== undefined) updates.name = updated.name;
      if (updated.avatar !== undefined) updates.avatar = updated.avatar;
      if (updated.preferences !== undefined) updates.preferences = updated.preferences;
      
      if (Object.keys(updates).length > 0) {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', session.user.id);
      }
    }
  };

  const handleActivatePremium = async () => {
    setUser((prev) => ({ ...prev, isPremium: true }));
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ is_premium: true })
        .eq('id', session.user.id);
    }
  };

  // Handle Auth Success from Landing Page or in-app
  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser((prev) => ({
      ...prev,
      name: userData.name || prev.name,
      email: userData.email || prev.email
    }));
    setIsGlobalAuthOpen(false);
    handleLaunchApp('home');
  };

  // Launch App from Landing Page with optional deep-link
  const handleLaunchApp = (
    targetTab: TabDestination = 'home',
    initialRecipe?: Recipe
  ) => {
    if (!session) {
      setGlobalAuthMode('login');
      setIsGlobalAuthOpen(true);
      return;
    }

    setViewMode('app');
    if (initialRecipe) {
      setSelectedRecipe(initialRecipe);
      setIsCookingMode(false);
    } else {
      setSelectedRecipe(null);
      setActiveTab(targetTab);
    }
    setIsSearching(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Landing Page mode, render the full-scale editorial presentation
  if (viewMode === 'landing') {
    return (
      <LandingPageView
        onLaunchApp={handleLaunchApp}
        recipes={recipes}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  // Apply theme to document
  useEffect(() => {
    if (user.preferences?.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.preferences?.theme]);

  return (
    <div id="marmite-app" className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1A18] text-[#1C1A18] dark:text-[#FDFBF7] font-sans antialiased">
      {/* Fullscreen Cooking Mode replaces normal layout */}
      {isCookingMode && selectedRecipe ? (
        <CookingModeView
          recipe={selectedRecipe}
          onExit={() => setIsCookingMode(false)}
          onFinishRecipe={handleFinishRecipe}
          soundAlertsEnabled={user.preferences.soundAlerts}
          conditions={cookingConditions}
        />
      ) : (
        <div className="flex flex-col min-h-screen relative">
          {/* Main App Header (hidden when recipe detail is showing full hero) */}
          {!selectedRecipe && (
            <AppHeader
              user={user}
              onOpenProfile={() => handleTabChange('profile')}
              onOpenPremium={() => setIsPremiumOpen(true)}
              onBackToLanding={() => setViewMode('landing')}
            />
          )}

          {/* Main Container */}
          <main className="flex-1 max-w-md mx-auto w-full px-4 pt-3 pb-24">
            {/* View Switching */}
            {selectedRecipe ? (
              <RecipeDetailView
                recipe={selectedRecipe}
                allRecipes={RECIPES}
                isFavorite={favorites.includes(selectedRecipe.id)}
                onToggleFavorite={handleToggleFavorite}
                onBack={() => setSelectedRecipe(null)}
                onStartCooking={handleStartCooking}
                onSelectRecipe={handleSelectRecipe}
                conditions={cookingConditions}
                onOpenConditionsModal={() => setIsConditionsModalOpen(true)}
              />
            ) : isSearching ? (
              <SearchView
                recipes={recipes}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
                initialQuery={searchInitialQuery}
              />
            ) : activeTab === 'home' ? (
              <HomeView
                recipes={RECIPES}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
                onNavigateToTab={handleTabChange}
                onOpenSearch={handleOpenSearch}
                onStartCooking={handleStartCooking}
                conditions={cookingConditions}
                onOpenConditionsModal={() => setIsConditionsModalOpen(true)}
              />
            ) : activeTab === 'discover' ? (
              <DiscoverView
                recipes={RECIPES}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
                onOpenSearch={handleOpenSearch}
              />
            ) : activeTab === 'fridge' ? (
              <FridgeView
                recipes={recipes}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
                user={user}
                cookingConditions={cookingConditions}
              />
            ) : activeTab === 'favorites' ? (
              <FavoritesView
                recipes={RECIPES}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
                onNavigateToTab={handleTabChange}
              />
            ) : activeTab === 'profile' ? (
              <ProfileView
                user={user}
                onUpdateUser={handleUpdateUser}
                onOpenPremium={() => setIsPremiumOpen(true)}
                recipes={RECIPES}
                onSelectRecipe={handleSelectRecipe}
                cookingHistory={cookingHistory}
                onLogout={async () => {
                  await supabase.auth.signOut();
                  setViewMode('landing');
                  setSession(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAuth={(mode) => {
                  setGlobalAuthMode(mode);
                  setIsGlobalAuthOpen(true);
                }}
              />
            ) : null}
          </main>

          {/* Bottom Navigation (visible unless inside Recipe Detail or Cooking Mode) */}
          {!selectedRecipe && !isCookingMode && (
            <BottomNav
              activeTab={isSearching ? ('home' as TabDestination) : activeTab}
              onSelectTab={handleTabChange}
              favoritesCount={favorites.length}
            />
          )}

          {/* Floating toggle back to Landing / Vitrine */}
          {!isCookingMode && (
            <div className="fixed top-3 right-4 sm:right-8 z-40">
              <button
                type="button"
                onClick={() => setViewMode('landing')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1A18]/90 hover:bg-[#C85A32] text-white text-[11px] font-semibold backdrop-blur-md shadow-md transition-all active:scale-95"
              >
                <span>← Découvrir le site vitrine</span>
              </button>
            </div>
          )}

          {/* Global Auth Modal */}
          <AuthModal
            isOpen={isGlobalAuthOpen}
            onClose={() => setIsGlobalAuthOpen(false)}
            initialMode={globalAuthMode}
            onSuccess={handleAuthSuccess}
          />

          {/* Premium Bottom Sheet Modal */}
          <PremiumModal
            isOpen={isPremiumOpen}
            onClose={() => setIsPremiumOpen(false)}
            onActivatePremium={handleActivatePremium}
            isAlreadyPremium={user.isPremium}
          />

          {/* Adaptive Cooking Conditions Modal */}
          <CookingConditionsModal
            isOpen={isConditionsModalOpen}
            onClose={() => setIsConditionsModalOpen(false)}
            conditions={cookingConditions}
            onChangeConditions={setCookingConditions}
          />
        </div>
      )}
    </div>
  );
}

export default App;
