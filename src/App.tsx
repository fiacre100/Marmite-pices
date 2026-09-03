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

  // Cooking conditions persisted in localStorage
  const [cookingConditions, setCookingConditions] = useState<CookingConditions>(() => {
    try {
      const stored = localStorage.getItem('marmite_cooking_conditions');
      return stored ? JSON.parse(stored) : DEFAULT_COOKING_CONDITIONS;
    } catch {
      return DEFAULT_COOKING_CONDITIONS;
    }
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('marmite_favorites');
      return stored ? JSON.parse(stored) : DEFAULT_FAVORITE_IDS;
    } catch {
      return DEFAULT_FAVORITE_IDS;
    }
  });

  // Cooking history persisted in localStorage
  const [cookingHistory, setCookingHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('marmite_history');
      return stored ? JSON.parse(stored) : ['poulet-yassa', 'ndole-crevettes'];
    } catch {
      return ['poulet-yassa', 'ndole-crevettes'];
    }
  });

  // User profile persisted in localStorage
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('marmite_user');
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignored
    }
    return {
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
    };
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marmite_favorites', JSON.stringify(favorites));
    } catch {
      // Ignored
    }
  }, [favorites]);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marmite_history', JSON.stringify(cookingHistory));
    } catch {
      // Ignored
    }
  }, [cookingHistory]);

  // Save cooking conditions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marmite_cooking_conditions', JSON.stringify(cookingConditions));
    } catch {
      // Ignored
    }
  }, [cookingConditions]);

  // Save user profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marmite_user', JSON.stringify(user));
    } catch {
      // Ignored
    }
  }, [user]);

  // Sync Supabase Auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser((prev) => ({
          ...prev,
          name: session.user.user_metadata?.name || prev.name,
          email: session.user.email || prev.email
        }));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser((prev) => ({
          ...prev,
          name: session.user.user_metadata?.name || prev.name,
          email: session.user.email || prev.email
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Toggle favorite
  const handleToggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
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
  const handleFinishRecipe = (recipe: Recipe) => {
    setIsCookingMode(false);
    setSelectedRecipe(null);
    if (!cookingHistory.includes(recipe.id)) {
      setCookingHistory((prev) => [recipe.id, ...prev]);
    }
    setUser((prev) => ({
      ...prev,
      cookedCount: prev.cookedCount + 1
    }));
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
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleActivatePremium = () => {
    setUser((prev) => ({ ...prev, isPremium: true }));
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
        recipes={RECIPES}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <div id="marmite-app" className="min-h-screen bg-[#FDFBF7] text-[#1C1A18] font-sans antialiased">
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
                recipes={RECIPES}
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
                recipes={RECIPES}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
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
                onLogout={() => {
                  setViewMode('landing');
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
