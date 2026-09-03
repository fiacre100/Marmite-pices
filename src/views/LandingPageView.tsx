import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  ChefHat,
  Heart,
  Compass,
  ShoppingBag,
  Star,
  Play,
  RotateCcw,
  Smartphone,
  Apple,
  X,
  Mail,
  ShieldCheck,
  ChevronRight,
  Globe,
  Dices,
  Info,
  MapPin,
  UtensilsCrossed,
  BookOpen,
  Wallet,
  SlidersHorizontal,
  Zap,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Recipe, TabDestination } from '../types';
import { AuthModal, AuthMode } from '../components/AuthModal';
import { HeroSection } from '../components/landing/HeroSection';

interface LandingPageViewProps {
  onLaunchApp: (targetTab?: TabDestination, initialRecipe?: Recipe) => void;
  recipes: Recipe[];
  onAuthSuccess?: (userData: { name: string; email: string }) => void;
}

export function LandingPageView({ onLaunchApp, recipes, onAuthSuccess }: LandingPageViewProps) {
  // Discovery Tabs State: 'benin' | 'africa' | 'world' | 'surprise'
  const [activeDiscoveryTab, setActiveDiscoveryTab] = useState<'benin' | 'africa' | 'world' | 'surprise'>('benin');

  // Interactive Adaptive Conditions Simulator State
  const [landingStove, setLandingStove] = useState<'charbon' | 'gaz' | 'induction'>('charbon');
  const [landingBudget, setLandingBudget] = useState<'eco' | 'confort' | 'fete'>('eco');
  const [landingServings, setLandingServings] = useState<number>(4);
  const [landingRecipeId, setLandingRecipeId] = useState<string>('telibo-gboma-dessi');

  // Surprise Roulette State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [surpriseRecipe, setSurpriseRecipe] = useState<Recipe>(() => {
    return recipes.find((r) => r.id === 'dakouin-poisson') || recipes[0];
  });
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState<boolean>(false);

  // Trigger Surprise Roulette
  const spinRoulette = () => {
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * recipes.length);
      setSurpriseRecipe(recipes[randomIdx]);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 120);
  };

  const openSurpriseModal = () => {
    setIsSurpriseModalOpen(true);
    spinRoulette();
  };

  // Pantry Simulator State
  const pantryIngredients = [
    { id: 'poulet', name: 'Poulet', emoji: '🍗', icon: 'Morceaux ou filet' },
    { id: 'riz', name: 'Riz', emoji: '🌾', icon: 'Blanc ou parfumé' },
    { id: 'tomate', name: 'Tomate', emoji: '🍅', icon: 'Fraîche ou concentré' },
    { id: 'oignon', name: 'Oignon', emoji: '🧅', icon: 'Doux ou rouge' },
    { id: 'gombo', name: 'Gombo', emoji: '🌱', icon: 'Frais ou séché' }
  ];

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'poulet',
    'riz',
    'tomate'
  ]);
  const [isSimmering, setIsSimmering] = useState<boolean>(false);

  const toggleIngredient = (id: string) => {
    setIsSimmering(true);
    setTimeout(() => setIsSimmering(false), 380);

    if (selectedIngredients.includes(id)) {
      if (selectedIngredients.length > 1) {
        setSelectedIngredients(selectedIngredients.filter((item) => item !== id));
      }
    } else {
      setSelectedIngredients([...selectedIngredients, id]);
    }
  };

  const hasPoulet = selectedIngredients.includes('poulet');
  const hasRiz = selectedIngredients.includes('riz');
  const hasGombo = selectedIngredients.includes('gombo');
  const hasTomate = selectedIngredients.includes('tomate');

  let simulatorRecipe = recipes[0];
  let matchQuality = 'Correspondance Parfaite (100%)';
  let matchReason = 'Tous les ingrédients clés sont dans votre marmite !';

  if (hasGombo) {
    const gomboMatch = recipes.find((r) => r.id === 'sauce-gombo') || recipes[2];
    simulatorRecipe = gomboMatch;
    matchQuality = 'Découverte Saveurs Iodées (95%)';
    matchReason = 'Le gombo frais sublimera une sauce veloutée et parfumée.';
  } else if (hasPoulet && hasTomate && !hasRiz) {
    const amiwoMatch = recipes.find((r) => r.id === 'sauce-amiwo') || recipes[0];
    simulatorRecipe = amiwoMatch;
    matchQuality = 'Découverte Terroir Bénin';
    matchReason = 'Poulet rissolé et coulis de tomates pour une pâte rouge fondante.';
  } else {
    const yassaMatch = recipes.find((r) => r.id === 'poulet-yassa') || recipes[1];
    simulatorRecipe = yassaMatch;
    matchQuality = 'Correspondance Parfaite (100%)';
    matchReason = 'Poulet caramélisé aux oignons doux et riz parfumé.';
  }

  // Bento Step Preview Interactive State
  const [currentBentoStep, setCurrentBentoStep] = useState<number>(1);
  const totalBentoSteps = 3;
  const bentoStepsData = [
    {
      step: 1,
      title: 'Infusion des aromates et marinade',
      desc: 'Massez la volaille avec le jus de citron vert pressé, la moutarde et l’ail écrasé. Repos 20 minutes.',
      timer: '10:00'
    },
    {
      step: 2,
      title: 'Saisie dorée des morceaux',
      desc: 'Faites dorer les cuisses à feu vif dans un filet d’huile pour sceller tous les sucs savoureux.',
      timer: '08:30'
    },
    {
      step: 3,
      title: 'Compotée douce des oignons',
      desc: 'Baissez le feu, ajoutez la cascade d’oignons émincés et laissez caraméliser doucement à couvert.',
      timer: '25:00'
    }
  ];

  // Bento Favorites Interactive State (clickable hearts)
  const [likedDishes, setLikedDishes] = useState<Record<string, boolean>>({
    'poulet-yassa': true,
    'sauce-amiwo': true,
    'ndole-crevettes': false,
    'dakouin-poisson': false
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedDishes((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Email input in footer
  const [emailInput, setEmailInput] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Quick Sign-up / Sign-in Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<AuthMode>('signup');

  const handleOpenAuth = (mode: AuthMode = 'signup') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setIsAuthModalOpen(false);
    if (onAuthSuccess) {
      onAuthSuccess(userData);
    } else {
      onLaunchApp('home');
    }
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setIsSubscribed(true);
  };

  // Marquee list of authentic dishes & specialties
  const marqueeItems = [
    { emoji: '🥣', label: 'Amiwo au Poulet Doré (Bénin)' },
    { emoji: '🍋', label: 'Poulet Yassa Caramélisé (Sénégal)' },
    { emoji: '🍤', label: 'Ndolé Royal aux Crevettes (Cameroun)' },
    { emoji: '🐟', label: 'Dakouin au Court-Bouillon (Grand-Popo)' },
    { emoji: '🥘', label: 'Thiéboudienne Rouge au Mérou (Sénégal)' },
    { emoji: '🥥', label: 'Curry Crémeux Madras (Inde)' },
    { emoji: '🫒', label: 'Tajine aux Citrons Confits (Maroc)' },
    { emoji: '🌾', label: 'Attiéké au Poisson Braisé (Côte d\'Ivoire)' },
    { emoji: '🌱', label: 'Sauce Gombo Iodée (Bénin)' },
    { emoji: '🍌', label: 'Poulet DG aux Plantains (Cameroun)' },
    { emoji: '🥢', label: 'Wok de Bœuf au Gingembre (Monde)' },
    { emoji: '🍛', label: 'Riz au Gras & Pintade Rôtie (Bénin)' }
  ];

  // Recipes per Discovery Tab
  const beninRecipes = recipes.filter((r) => r.country === 'Bénin' || r.region === 'benin').slice(0, 4);
  const africaRecipes = recipes.filter((r) => r.country !== 'Bénin' && (r.region === 'west-africa' || r.region === 'africa')).slice(0, 4);
  const worldRecipes = recipes.filter((r) => r.region === 'world' || r.country === 'Maroc' || r.country === 'Afrique du Sud').slice(0, 4);

  return (
    <div
      id="landing-page-root"
      className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] selection:bg-[#F8EFEB] selection:text-[#D35400] relative overflow-x-hidden font-sans"
    >
      {/* 1. STICKY HEADER & COMPACT NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EBE5DC]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => onLaunchApp('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D35400] to-[#B84700] text-white flex items-center justify-center shadow-md shadow-[#D35400]/25 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 fill-white/20 stroke-[2.2px]" />
            </div>
            <div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none block">
                Marmite & Épices
              </span>
              <span className="text-[10px] font-semibold text-[#8FA382] uppercase tracking-wider block mt-0.5">
                L'Explorateur Culinaire Bénin, Afrique & Monde
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-[#1A1A1A]/80">
            <a
              href="#decouvertes-terroirs"
              className="relative py-1 hover:text-[#D35400] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D35400] hover:after:w-full after:transition-all"
            >
              Découvrir
            </a>
            <a
              href="#conditions-adaptatives"
              className="relative py-1 hover:text-[#D35400] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D35400] hover:after:w-full after:transition-all text-[#D35400] font-bold"
            >
              Cuisine Adaptative
            </a>
            <a
              href="#pourquoi-decouvrir"
              className="relative py-1 hover:text-[#D35400] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D35400] hover:after:w-full after:transition-all"
            >
              L'Expérience
            </a>
            <a
              href="#marmite-simulateur"
              className="relative py-1 hover:text-[#D35400] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D35400] hover:after:w-full after:transition-all"
            >
              Frigo Intelligent
            </a>
            <a
              href="#bento-features"
              className="relative py-1 hover:text-[#D35400] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D35400] hover:after:w-full after:transition-all"
            >
              Mode Cuisine
            </a>
            <a
              href="#offre-premium"
              className="relative py-1 hover:text-[#D35400] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D35400] hover:after:w-full after:transition-all"
            >
              Tarifs
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              id="header-surprise-btn"
              type="button"
              onClick={openSurpriseModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF4E8] text-[#B87A14] border border-[#D99B26]/30 text-xs font-bold hover:bg-[#F5ECD8] transition-colors cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5 text-[#D35400]" />
              <span>Surprenez-moi !</span>
            </button>

            {/* Bouton Se connecter */}
            <button
              id="header-login-btn"
              type="button"
              onClick={() => handleOpenAuth('login')}
              className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full bg-white hover:bg-[#FAF6F0] border border-[#EBE5DC] text-[#1A1A1A] font-bold text-xs flex items-center gap-1.5 transition-all hover:border-stone-400 cursor-pointer shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5 text-[#D35400]" />
              <span>Se connecter</span>
            </button>

            {/* Bouton S'inscrire */}
            <button
              id="header-signup-btn"
              type="button"
              onClick={() => handleOpenAuth('signup')}
              className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#D35400]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>S'inscrire</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION : LA DÉCOUVERTE CULINAIRE EN MAJESTÉ (ANIMATIONS LUXE & TEXT REVEAL) */}
      <HeroSection
        onLaunchApp={onLaunchApp}
        recipes={recipes}
        openSurpriseModal={openSurpriseModal}
        handleOpenAuth={handleOpenAuth}
      />

      {/* 3. INFINITE MARQUEE OF DISHES */}
      <section className="py-5 bg-gradient-to-r from-[#FAF6F0] via-white to-[#FAF6F0] border-y border-[#EBE5DC] overflow-hidden">
        <div className="animate-marquee items-center gap-4">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EBE5DC] shadow-2xs hover:border-[#D35400] transition-colors cursor-default whitespace-nowrap"
            >
              <span className="text-base">{item.emoji}</span>
              <span className="text-xs font-bold text-[#1A1A1A]">{item.label}</span>
              <span className="text-[#D99B26] font-black text-xs ml-1">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LE PAVILLON DES DÉCOUVERTES & TERROIRS (THE CORE DISCOVERY SECTION) */}
      <section id="decouvertes-terroirs" className="py-20 sm:py-28 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF4E8] border border-[#D99B26]/30 text-[#B87A14] text-xs font-bold">
              <Globe className="w-3.5 h-3.5 text-[#D35400]" />
              <span>3 Univers Culinaires & 1 Générateur Surprise</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Qu'avez-vous envie de découvrir aujourd'hui ?
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
              Chaque jour est une nouvelle invitation au voyage gustatif. Choisissez un univers pour explorer ses spécialités méconnues, ou faites tourner notre marmite magique.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveDiscoveryTab('benin')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeDiscoveryTab === 'benin'
                  ? 'bg-[#D35400] text-white shadow-md shadow-[#D35400]/25 scale-105'
                  : 'bg-white border border-[#EBE5DC] text-[#1A1A1A] hover:bg-[#FAF6F0]'
              }`}
            >
              <span className="text-base">🇧🇯</span>
              <span>Terroirs du Bénin (Local)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDiscoveryTab('africa')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeDiscoveryTab === 'africa'
                  ? 'bg-[#D35400] text-white shadow-md shadow-[#D35400]/25 scale-105'
                  : 'bg-white border border-[#EBE5DC] text-[#1A1A1A] hover:bg-[#FAF6F0]'
              }`}
            >
              <span className="text-base">🌍</span>
              <span>Grandes Cuisines d'Afrique</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDiscoveryTab('world')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeDiscoveryTab === 'world'
                  ? 'bg-[#D35400] text-white shadow-md shadow-[#D35400]/25 scale-105'
                  : 'bg-white border border-[#EBE5DC] text-[#1A1A1A] hover:bg-[#FAF6F0]'
              }`}
            >
              <span className="text-base">✈️</span>
              <span>Cuisines du Monde</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDiscoveryTab('surprise')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeDiscoveryTab === 'surprise'
                  ? 'bg-[#D99B26] text-white shadow-md shadow-[#D99B26]/25 scale-105'
                  : 'bg-[#FAF4E8] border border-[#D99B26]/30 text-[#B87A14] hover:bg-[#F5ECD8]'
              }`}
            >
              <Dices className="w-4 h-4" />
              <span>🎲 Surprenez-moi !</span>
            </button>
          </div>

          {/* Tab 1: Terroirs du Bénin */}
          {activeDiscoveryTab === 'benin' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EBE5DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                    <span>🇧🇯</span> La richesse insoupçonnée des terroirs béninois
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736D66] mt-0.5">
                    De Grand-Popo à Ouidah, explorez des mariages d'épices séchées, de semoules fines et de bouillons veloutés.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onLaunchApp('home')}
                  className="text-xs font-bold text-[#D35400] hover:underline flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <span>Voir tous les plats du Bénin</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {beninRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onLaunchApp('home', recipe)}
                    className="group bg-white rounded-3xl border border-[#EBE5DC] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#D35400]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Photo with Overlay Badge */}
                      <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A] flex items-center gap-1 shadow-xs">
                          <span>{recipe.countryFlag}</span>
                          <span>{recipe.country}</span>
                        </div>
                        {recipe.badgeLabel && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#D35400] text-white text-[9px] font-bold shadow-xs">
                            {recipe.badgeLabel}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <h4 className="font-editorial text-lg font-bold text-[#1A1A1A] group-hover:text-[#D35400] transition-colors leading-snug line-clamp-1">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-[#736D66] line-clamp-2 leading-relaxed">
                          {recipe.subtitle}
                        </p>

                        <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC] text-[11px] text-[#4A4A4A] leading-tight">
                          <span className="font-bold text-[#D35400]">Ce qui fait sa magie : </span>
                          <span className="line-clamp-2">{recipe.chefSecret?.text || recipe.description}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom metrics & button */}
                    <div className="px-5 pb-5 pt-3 border-t border-[#EBE5DC] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#736D66]">
                        <span className="font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#D35400]" /> {recipe.durationMinutes} min
                        </span>
                        <span>•</span>
                        <span className="font-semibold">{recipe.difficulty}</span>
                      </div>

                      <span className="text-xs font-bold text-[#D35400] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        <span>Découvrir</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Grandes Cuisines d'Afrique */}
          {activeDiscoveryTab === 'africa' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EBE5DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                    <span>🌍</span> Les chefs-d'œuvre de la gastronomie africaine
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736D66] mt-0.5">
                    Du Yassa de Casamance au Ndolé camerounais, voyagez de pays en pays à travers leurs marmites signatures.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onLaunchApp('discover')}
                  className="text-xs font-bold text-[#D35400] hover:underline flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <span>Explorer le répertoire africain</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {africaRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onLaunchApp('home', recipe)}
                    className="group bg-white rounded-3xl border border-[#EBE5DC] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#D35400]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Photo with Overlay Badge */}
                      <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A] flex items-center gap-1 shadow-xs">
                          <span>{recipe.countryFlag}</span>
                          <span>{recipe.country}</span>
                        </div>
                        {recipe.badgeLabel && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#8FA382] text-white text-[9px] font-bold shadow-xs">
                            {recipe.badgeLabel}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <h4 className="font-editorial text-lg font-bold text-[#1A1A1A] group-hover:text-[#D35400] transition-colors leading-snug line-clamp-1">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-[#736D66] line-clamp-2 leading-relaxed">
                          {recipe.subtitle}
                        </p>

                        <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC] text-[11px] text-[#4A4A4A] leading-tight">
                          <span className="font-bold text-[#D35400]">Secret d'artisan : </span>
                          <span className="line-clamp-2">{recipe.chefSecret?.text || recipe.description}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom metrics & button */}
                    <div className="px-5 pb-5 pt-3 border-t border-[#EBE5DC] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#736D66]">
                        <span className="font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#D35400]" /> {recipe.durationMinutes} min
                        </span>
                        <span>•</span>
                        <span className="font-semibold">{recipe.difficulty}</span>
                      </div>

                      <span className="text-xs font-bold text-[#D35400] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        <span>Découvrir</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Cuisines du Monde */}
          {activeDiscoveryTab === 'world' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EBE5DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                    <span>✈️</span> Le grand voyage des cuisines du monde
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736D66] mt-0.5">
                    Tajines parfumés du Maghreb, currys veloutés d'Inde et woks vifs asiatiques adaptés avec simplicité.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onLaunchApp('discover')}
                  className="text-xs font-bold text-[#D35400] hover:underline flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <span>Toutes les recettes du monde</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {worldRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onLaunchApp('home', recipe)}
                    className="group bg-white rounded-3xl border border-[#EBE5DC] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#D35400]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Photo with Overlay Badge */}
                      <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A] flex items-center gap-1 shadow-xs">
                          <span>{recipe.countryFlag}</span>
                          <span>{recipe.country}</span>
                        </div>
                        {recipe.badgeLabel && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#1A1A1A] text-white text-[9px] font-bold shadow-xs">
                            {recipe.badgeLabel}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <h4 className="font-editorial text-lg font-bold text-[#1A1A1A] group-hover:text-[#D35400] transition-colors leading-snug line-clamp-1">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-[#736D66] line-clamp-2 leading-relaxed">
                          {recipe.subtitle}
                        </p>

                        <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC] text-[11px] text-[#4A4A4A] leading-tight">
                          <span className="font-bold text-[#D35400]">Pourquoi l'essayer : </span>
                          <span className="line-clamp-2">{recipe.chefSecret?.text || recipe.description}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom metrics & button */}
                    <div className="px-5 pb-5 pt-3 border-t border-[#EBE5DC] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#736D66]">
                        <span className="font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#D35400]" /> {recipe.durationMinutes} min
                        </span>
                        <span>•</span>
                        <span className="font-semibold">{recipe.difficulty}</span>
                      </div>

                      <span className="text-xs font-bold text-[#D35400] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        <span>Découvrir</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Interactive Surprise Roulette Widget */}
          {activeDiscoveryTab === 'surprise' && (
            <div className="bg-white rounded-[32px] border border-[#EBE5DC] p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in duration-300">
              <div className="max-w-2xl mx-auto text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-3xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center shadow-md">
                  <Dices className={`w-7 h-7 text-[#D35400] ${isSpinning ? 'animate-spin' : ''}`} />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  La Roulette des Découvertes
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4A]">
                  Laissez le hasard bousculer vos habitudes. Cliquez pour faire tourner la marmite et découvrir une recette que vous n'auriez jamais pensé cuisiner ce soir !
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={spinRoulette}
                    disabled={isSpinning}
                    className="h-12 px-7 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#D35400]/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <RotateCcw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                    <span>Faire tourner la marmite 🎲</span>
                  </button>
                </div>
              </div>

              {/* Revealed Surprise Card */}
              <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#FAF6F0] border border-[#EBE5DC] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden shadow-xs relative">
                  <img
                    src={surpriseRecipe.image}
                    alt={surpriseRecipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A]">
                    {surpriseRecipe.countryFlag} {surpriseRecipe.country}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF4E8] text-[#B87A14] text-[11px] font-bold border border-[#D99B26]/30">
                    <Sparkles className="w-3 h-3 text-[#D35400]" />
                    <span>Votre Pépite Révélée</span>
                  </div>

                  <h4 className="font-editorial text-2xl font-bold text-[#1A1A1A]">
                    {surpriseRecipe.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    {surpriseRecipe.subtitle}
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-[#EBE5DC] text-xs text-[#4A4A4A]">
                    <span className="font-bold text-[#D35400]">L'anecdote de terroir : </span>
                    <span>{surpriseRecipe.chefSecret?.text || surpriseRecipe.description}</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onLaunchApp('home', surpriseRecipe)}
                      className="h-11 px-6 rounded-full bg-[#D35400] text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:bg-[#B84700] transition-colors cursor-pointer"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Cuisiner ce plat maintenant</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-xs text-[#736D66]">
                      ⏱ {surpriseRecipe.durationMinutes} min • {surpriseRecipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. POURQUOI LA DÉCOUVERTE AVEC MARMITE & ÉPICES ? (VALUE PILLARS) */}
      <section id="pourquoi-decouvrir" className="py-20 sm:py-28 bg-white border-y border-[#EBE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D35400]">
              Notre Raison d'Être
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
              Pourquoi Marmite & Épices va changer vos repas ?
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A]">
              Nous ne sommes pas un simple carnet d'ingrédients. Nous sommes votre boussole pour vous redonner le plaisir d'explorer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="p-7 rounded-[28px] bg-[#FAF6F0] border border-[#EBE5DC] space-y-4 shadow-2xs hover:border-[#D35400]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center font-bold text-xl">
                ✨
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1A1A1A]">
                Sortir enfin de la routine
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                85% des personnes cuisinent les 4 mêmes repas en boucle chaque semaine par manque d'idées. Nous renouvelons votre inspiration chaque jour avec des suggestions surprenantes.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-[28px] bg-[#FAF6F0] border border-[#EBE5DC] space-y-4 shadow-2xs hover:border-[#D35400]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center font-bold text-xl">
                📖
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1A1A1A]">
                La mémoire vivante des terroirs
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Chaque recette raconte une histoire, transmet le tour de main d'une grand-mère ou d'un chef local, et explique le rôle des épices indigènes sans mystère.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-[28px] bg-[#FAF6F0] border border-[#EBE5DC] space-y-4 shadow-2xs hover:border-[#D35400]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#F8EFEB] text-[#C85A32] flex items-center justify-center font-bold text-xl">
                ⏱️
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1A1A1A]">
                Réussir dès la 1ère fois
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Découvrir un plat inconnu ne doit jamais être stressant. Le mode pas-à-pas mains libres avec écran allumé et minuteurs intégrés garantit le résultat à tous les coups.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-7 rounded-[28px] bg-[#FAF6F0] border border-[#EBE5DC] space-y-4 shadow-2xs hover:border-[#D35400]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#1A1A1A] flex items-center justify-center font-bold text-xl shadow-2xs">
                🧺
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1A1A1A]">
                Cuisiner avec ce qu'on a
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Pas besoin de courir 5 marchés différents : notre simulateur Marmite vous montre les découvertes que vous pouvez préparer immédiatement avec vos ingrédients disponibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5bis. L'APPLI QUI S'ADAPTE À TES CONDITIONS RÉELLES (FOYER, BUDGET, CONVIVES, TEMPS) */}
      <section id="conditions-adaptatives" className="py-20 sm:py-28 bg-gradient-to-b from-[#FAF6F0] via-white to-[#FAF6F0] border-b border-[#EBE5DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FAF4E8] border border-[#D99B26]/30 text-[#B87A14] text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D35400]" />
              <span>Moteur Intelligent & Conditions Réelles</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Tu ne vas plus jamais te demander : <br />
              <span className="text-[#D35400] italic">« Qu'est-ce qu'on va manger aujourd'hui ? »</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
              Fini les recettes irréalistes qui exigent du matériel que vous n'avez pas. Marmite & Épices s'adapte à votre <strong>foyer</strong> (charbon traditionnel, gaz ou plaques), à vos <strong>moyens financiers</strong>, à votre <strong>temps disponible</strong> et à votre <strong>nombre de convives</strong>, avec un plan d'action étape par étape ultra-précis.
            </p>
          </div>

          {/* Interactive Condition Tuner Showcase */}
          <div className="bg-white rounded-[32px] border border-[#EBE5DC] shadow-xl overflow-hidden">
            {/* Top Control Bar */}
            <div className="p-6 sm:p-8 bg-[#1C1A18] text-white space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D99B26]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-200">
                    Simulateur de conditions réelles (Testez en direct)
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-amber-300 bg-white/10 px-3 py-1 rounded-full">
                  100% interactif
                </span>
              </div>

              {/* Selectors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Plat local à tester */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wide flex items-center gap-1">
                    <span>🍲</span> Plat à cuisiner
                  </label>
                  <select
                    value={landingRecipeId}
                    onChange={(e) => setLandingRecipeId(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/10 border border-white/20 text-white text-xs px-3 focus:outline-none focus:border-[#D35400] cursor-pointer"
                  >
                    <option value="telibo-gboma-dessi" className="bg-[#1C1A18] text-white">
                      🇧🇯 Télibô & Gboma Dessi (Bénin)
                    </option>
                    <option value="sauce-amiwo" className="bg-[#1C1A18] text-white">
                      🇧🇯 Sauce Amiwo & poulet (Bénin)
                    </option>
                    <option value="atassi-dja-poisson" className="bg-[#1C1A18] text-white">
                      🇧🇯 Atassi royal Watché (Bénin)
                    </option>
                    <option value="dakouin-poisson" className="bg-[#1C1A18] text-white">
                      🇧🇯 Dakouin au court-bouillon (Bénin)
                    </option>
                    <option value="poulet-yassa" className="bg-[#1C1A18] text-white">
                      🇸🇳 Poulet Yassa (Sénégal)
                    </option>
                    <option value="mafe-boeuf" className="bg-[#1C1A18] text-white">
                      🇲🇱 Mafé au bœuf fondant (Mali)
                    </option>
                  </select>
                </div>

                {/* 2. Type de foyer */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wide flex items-center gap-1">
                    <span>🔥</span> Votre foyer réel
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-white/10 p-1 rounded-xl border border-white/20">
                    {[
                      { id: 'charbon', label: 'Charbon', icon: '🪵' },
                      { id: 'gaz', label: 'Gaz', icon: '🔥' },
                      { id: 'induction', label: 'Induction', icon: '⚡' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setLandingStove(st.id as 'charbon' | 'gaz' | 'induction')}
                        className={`h-9 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                          landingStove === st.id
                            ? 'bg-[#D35400] text-white shadow-xs'
                            : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        <span>{st.icon}</span>
                        <span className="hidden sm:inline">{st.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Budget & Moyens */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wide flex items-center gap-1">
                    <span>💰</span> Vos moyens / budget
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-white/10 p-1 rounded-xl border border-white/20">
                    {[
                      { id: 'eco', label: 'Éco', icon: '💰' },
                      { id: 'confort', label: 'Confort', icon: '⚖️' },
                      { id: 'fete', label: 'Fête', icon: '👑' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setLandingBudget(b.id as 'eco' | 'confort' | 'fete')}
                        className={`h-9 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                          landingBudget === b.id
                            ? 'bg-[#D35400] text-white shadow-xs'
                            : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        <span>{b.icon}</span>
                        <span>{b.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Nombre de personnes */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wide flex items-center gap-1">
                    <span>👥</span> Convives
                  </label>
                  <div className="grid grid-cols-4 gap-1 bg-white/10 p-1 rounded-xl border border-white/20">
                    {[2, 4, 6, 8].map((serv) => (
                      <button
                        key={serv}
                        type="button"
                        onClick={() => setLandingServings(serv)}
                        className={`h-9 rounded-lg text-[11px] font-bold transition-all ${
                          landingServings === serv
                            ? 'bg-[#D35400] text-white shadow-xs'
                            : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        {serv} pers
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Result Panel */}
            {(() => {
              const currentAdaptiveDish =
                recipes.find((r) => r.id === landingRecipeId) ||
                recipes.find((r) => r.id === 'telibo-gboma-dessi') ||
                recipes.find((r) => r.id === 'sauce-amiwo') ||
                recipes[0];

              const scaleRatio = landingServings / (currentAdaptiveDish.servings || 4);

              const activeStoveTip =
                currentAdaptiveDish.stoveAdaptationTips?.[landingStove] ||
                (landingStove === 'charbon'
                  ? 'Sur charbon traditionnel : faire bouillir à feu vif, puis écarter 3/4 des braises et laisser étuver sur la cendre douce.'
                  : landingStove === 'gaz'
                  ? 'Sur cuisinière à gaz : dès frémissement, passer sur le plus petit brûleur au ralenti sous couvercle hermétique.'
                  : 'Sur plaque à induction : maintenir puissance 3 pour une vapeur constante sans attacher au fond.');

              const activeBudgetTip =
                landingBudget === 'eco'
                  ? currentAdaptiveDish.budgetAdaptation?.ecoTip || 'Option éco : utilisez des morceaux avec os plus économiques ou du poisson fumé local.'
                  : landingBudget === 'fete'
                  ? currentAdaptiveDish.budgetAdaptation?.festiveTip || 'Version festive : sublimez avec des crustacés de lagune et des découpes royales.'
                  : 'Formule équilibrée : produits frais de saison du marché local au juste prix.';

              return (
                <div className="p-6 sm:p-10 space-y-8">
                  {/* Dish Title & Live Adaptation Indicators */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EBE5DC]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{currentAdaptiveDish.countryFlag}</span>
                        <span className="text-xs font-bold text-[#D35400] uppercase tracking-wider">
                          {currentAdaptiveDish.country} • Recette Authentique
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EBF0E6] text-[#6B7F5E] text-[10px] font-bold">
                          Adaptation active
                        </span>
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                        {currentAdaptiveDish.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#736D66] max-w-xl">
                        {currentAdaptiveDish.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onLaunchApp('home', currentAdaptiveDish)}
                      className="h-12 px-6 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#D35400]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Cuisiner ce plat pas-à-pas</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Adaptive Cards: Foyer & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Foyer Card */}
                    <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D35400] flex items-center gap-1.5">
                          <Flame className="w-4 h-4" /> Conseils adaptés : {landingStove === 'charbon' ? 'Foyer Charbon 🪵' : landingStove === 'gaz' ? 'Cuisinière Gaz 🔥' : 'Plaques Induction ⚡'}
                        </span>
                        <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded-md border border-[#EBE5DC]">
                          Feu calibré
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#1A1A1A] font-medium leading-relaxed">
                        {activeStoveTip}
                      </p>
                    </div>

                    {/* Budget Card */}
                    <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7F5E] flex items-center gap-1.5">
                          <Wallet className="w-4 h-4" /> Ajustement Budget : {landingBudget === 'eco' ? 'Éco Malin 💰' : landingBudget === 'fete' ? 'Fête Royale 👑' : 'Confort Équilibré ⚖️'}
                        </span>
                        <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded-md border border-[#EBE5DC]">
                          Optimisé
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#1A1A1A] font-medium leading-relaxed">
                        {activeBudgetTip}
                      </p>
                    </div>
                  </div>

                  {/* Scaled Ingredients Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                        Ingrédients ajustés pour {landingServings} personnes (x{scaleRatio.toFixed(1)}) :
                      </span>
                      <span className="text-xs text-[#736D66]">
                        Calculé automatiquement
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {currentAdaptiveDish.ingredients.map((ing, idx) => {
                        const scaledQty = Math.round(ing.quantity * scaleRatio * 10) / 10;
                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white border border-[#EBE5DC] text-xs space-y-0.5 shadow-2xs"
                          >
                            <span className="font-bold text-[#D35400] text-sm block">
                              {scaledQty} {ing.unit}
                            </span>
                            <span className="text-[#1A1A1A] font-medium line-clamp-1">
                              {ing.name}
                            </span>
                            {landingBudget === 'eco' && ing.ecoSubstitute && (
                              <span className="text-[10px] text-emerald-700 block font-semibold">
                                Éco : {ing.ecoSubstitute}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4-Phase Structured Action Plan Preview */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D35400]">
                          Méthodologie Pas-à-Pas
                        </span>
                        <h4 className="font-editorial text-lg font-bold text-[#1A1A1A]">
                          Plan d'action clair et infaillible (Zéro stress)
                        </h4>
                      </div>
                      <span className="text-xs text-[#736D66]">
                        {currentAdaptiveDish.steps.length} étapes structurées
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentAdaptiveDish.steps.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 rounded-2xl bg-white border border-[#EBE5DC] space-y-2 relative"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2 py-0.5 rounded-full bg-[#FAF4E8] text-[#B87A14] font-bold text-[10px]">
                              Étape {st.stepNumber}
                            </span>
                            <span className="font-semibold text-stone-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#D35400]" /> {st.durationMinutes} min
                            </span>
                          </div>

                          <h5 className="font-editorial text-sm font-bold text-[#1A1A1A] leading-tight">
                            {st.title}
                          </h5>
                          <p className="text-xs text-[#4A4A4A] leading-relaxed line-clamp-3">
                            {st.text}
                          </p>

                          {st.proTip && (
                            <div className="p-2 rounded-lg bg-[#FAF6F0] border border-[#EBE5DC] text-[10px] text-[#4A4A4A]">
                              <span className="font-bold text-[#D35400]">Secret : </span>
                              <span>{st.proTip}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 6. LE SIMULATEUR MARMITE (CONCRÉTISER SES DÉCOUVERTES AVEC CE QU'ON A) */}
      <section id="marmite-simulateur" className="py-20 sm:py-28 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0E6] text-[#6B7F5E] text-xs font-bold">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Concrétiser vos Découvertes</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
              Vous avez déjà quelques ingrédients sous la main ?
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
              Cochez ce qui traîne dans votre cuisine. Notre marmite vous propose instantanément une pépite à cuisiner sans avoir besoin de faire des courses complexes.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-[32px] bg-white border border-[#EBE5DC] shadow-[0_6px_24px_rgba(26,26,26,0.04)] space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Sélectionnez vos ingrédients :
                </span>
                <span className="text-xs text-[#8FA382] font-semibold">
                  {selectedIngredients.length} ingrédient(s) dans la marmite
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {pantryIngredients.map((ing) => {
                  const isSelected = selectedIngredients.includes(ing.id);
                  return (
                    <button
                      key={ing.id}
                      type="button"
                      onClick={() => toggleIngredient(ing.id)}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between group cursor-pointer ${
                        isSelected
                          ? 'bg-[#8FA382] text-white border-[#8FA382] shadow-md scale-105'
                          : 'bg-[#FAF6F0] text-[#1A1A1A] border-[#EBE5DC] hover:border-[#8FA382] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{ing.emoji}</span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                            isSelected
                              ? 'bg-white text-[#8FA382] font-bold'
                              : 'border border-[#EBE5DC] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="font-bold text-sm block">{ing.name}</span>
                        <span
                          className={`text-[10px] block mt-0.5 line-clamp-1 ${
                            isSelected ? 'text-white/80' : 'text-[#736D66]'
                          }`}
                        >
                          {ing.icon}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Result Area */}
            <div className="pt-6 border-t border-[#EBE5DC]">
              {isSimmering ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-[#FAF4E8] text-[#D35400] flex items-center justify-center">
                    <Flame className="w-6 h-6 animate-bounce" />
                  </div>
                  <span className="text-xs font-bold text-[#D35400] tracking-wide">
                    La marmite calcule la découverte idéale...
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#FAF6F0] p-6 rounded-3xl border border-[#EBE5DC]">
                  <div className="md:col-span-5 aspect-[16/11] rounded-2xl overflow-hidden shadow-xs relative">
                    <img
                      src={simulatorRecipe.image}
                      alt={simulatorRecipe.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A]">
                      {simulatorRecipe.countryFlag} {simulatorRecipe.country}
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF0E6] text-[#6B7F5E] text-[11px] font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{matchQuality}</span>
                    </div>

                    <h3 className="font-editorial text-2xl font-bold text-[#1A1A1A]">
                      {simulatorRecipe.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                      {matchReason} {simulatorRecipe.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#736D66] pt-1">
                      <span className="font-semibold text-[#1A1A1A]">
                        ⏱ {simulatorRecipe.durationMinutes} min
                      </span>
                      <span>•</span>
                      <span>{simulatorRecipe.difficulty}</span>
                      <span>•</span>
                      <span>{simulatorRecipe.ingredients.length} ingrédients au total</span>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onLaunchApp('home', simulatorRecipe)}
                        className="w-full sm:w-auto h-12 px-6 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#D35400]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <ChefHat className="w-4 h-4" />
                        <span>Cuisiner cette recette (Gratuit)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onLaunchApp('fridge')}
                        className="w-full sm:w-auto h-12 px-5 rounded-full bg-white border border-[#EBE5DC] text-xs font-bold text-[#1A1A1A] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                      >
                        Ouvrir la marmite complète
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BENTO GRID : TOUT POUR RÉUSSIR VOS PLATS */}
      <section id="bento-features" className="py-20 sm:py-28 bg-white border-y border-[#EBE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D35400]">
              L'Expérience Pas-à-Pas
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
              Tout pour réussir vos plats du premier coup.
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A]">
              Les modules exclusifs conçus pour vous accompagner de l'inspiration jusqu'à l'assiette fumante.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Grid Item 1 (7 cols): L'Idée du Jour */}
            <div className="lg:col-span-7 p-7 sm:p-8 rounded-[32px] bg-[#FAF6F0] border border-[#EBE5DC] flex flex-col justify-between shadow-[0_6px_18px_rgba(26,26,26,0.04)] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Inspiration Quotidienne
                  </span>
                </div>
                <span className="text-xs font-bold text-[#8FA382] bg-white px-3 py-1 rounded-full border border-[#EBE5DC]">
                  Renouvelé chaque matin
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
                    alt="Idée du jour"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="sm:col-span-6 space-y-2.5">
                  <h3 className="font-editorial text-2xl font-bold text-[#1A1A1A]">
                    L'Idée du Jour & Découverte
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Ne perdez plus 20 minutes à chercher sur internet. Chaque matin, laissez-vous surprendre par une recette équilibrée, avec son histoire de terroir et ses accords de saveurs.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#D35400]">
                    <span>Explorer le flux d'inspiration</span>
                    <span>→</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EBE5DC] flex flex-wrap items-center justify-between gap-3 text-xs text-[#736D66]">
                <span>🌍 Terroirs Bénin, Sénégal, Cameroun & International</span>
                <button
                  type="button"
                  onClick={() => onLaunchApp('discover')}
                  className="font-bold text-[#1A1A1A] hover:text-[#D35400] underline cursor-pointer"
                >
                  Voir tous les répertoires
                </button>
              </div>
            </div>

            {/* Grid Item 2 (5 cols): Mode Cuisine Pas-à-Pas Mains Libres */}
            <div className="lg:col-span-5 p-7 sm:p-8 rounded-[32px] bg-white border border-[#EBE5DC] flex flex-col justify-between shadow-[0_6px_18px_rgba(26,26,26,0.04)] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Mode Mains Libres
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#8FA382]">
                  Écran toujours actif
                </span>
              </div>

              {/* Interactive Step Preview */}
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1A1A1A]">
                    Étape {currentBentoStep} sur {totalBentoSteps}
                  </span>
                  <span className="text-[11px] text-[#D35400] font-bold">
                    ⏱ {bentoStepsData[currentBentoStep - 1].timer}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#EBE5DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D35400] transition-all duration-300"
                    style={{ width: `${(currentBentoStep / totalBentoSteps) * 100}%` }}
                  />
                </div>

                <div className="pt-1">
                  <h4 className="font-editorial text-base font-bold text-[#1A1A1A]">
                    {bentoStepsData[currentBentoStep - 1].title}
                  </h4>
                  <p className="text-xs text-[#4A4A4A] mt-1 leading-relaxed">
                    {bentoStepsData[currentBentoStep - 1].desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentBentoStep((prev) => (prev > 1 ? prev - 1 : totalBentoSteps))
                    }
                    className="text-xs font-bold text-[#736D66] hover:text-[#1A1A1A] cursor-pointer"
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentBentoStep((prev) => (prev < totalBentoSteps ? prev + 1 : 1))
                    }
                    className="h-8 px-4 rounded-full bg-[#1A1A1A] hover:bg-[#D35400] text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Étape suivante</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-editorial text-xl font-bold text-[#1A1A1A]">
                  Mode Préparation pas-à-pas
                </h3>
                <p className="text-xs text-[#736D66] mt-1">
                  Grosses polices lisibles à 2 mètres, minuteur sonore doux et zéro mise en veille.
                </p>
              </div>
            </div>

            {/* Grid Item 3 (7 cols): Mon Carnet de Favoris */}
            <div className="lg:col-span-7 p-7 sm:p-8 rounded-[32px] bg-white border border-[#EBE5DC] shadow-[0_6px_18px_rgba(26,26,26,0.04)] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Votre Bibliothèque
                  </span>
                </div>
                <span className="text-xs text-[#736D66]">
                  Cliquez sur les cœurs pour tester la sauvegarde
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#1A1A1A]">
                  Mon Carnet de Découvertes & Favoris
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
                  Constituez votre propre carnet de famille. Retrouvez vos plats coups de cœur en 1 seul clic sans jamais les égarer.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  {
                    id: 'poulet-yassa',
                    title: 'Poulet Yassa',
                    country: '🇸🇳 Sénégal',
                    img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=300&q=80'
                  },
                  {
                    id: 'sauce-amiwo',
                    title: 'Amiwo Poulet',
                    country: '🇧🇯 Bénin',
                    img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=300&q=80'
                  },
                  {
                    id: 'ndole-crevettes',
                    title: 'Ndolé Royal',
                    country: '🇨🇲 Cameroun',
                    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'
                  },
                  {
                    id: 'dakouin-poisson',
                    title: 'Dakouin',
                    country: '🇧🇯 Grand-Popo',
                    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80'
                  }
                ].map((item) => {
                  const isFav = likedDishes[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] relative group hover:border-[#D35400] transition-colors"
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden relative mb-2">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isFav ? 'fill-red-500 text-red-500' : 'text-stone-400'
                            }`}
                          />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#736D66] block">{item.country}</span>
                      <h4 className="font-editorial text-xs font-bold text-[#1A1A1A] line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid Item 4 (5 cols): Astuces de Chefs & Transmission */}
            <div className="lg:col-span-5 p-7 sm:p-8 rounded-[32px] bg-[#FAF6F0] border border-[#EBE5DC] flex flex-col justify-between shadow-[0_6px_18px_rgba(26,26,26,0.04)] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Secrets de Cuisson
                  </span>
                </div>
                <span className="text-xs font-bold text-[#D35400]">Transmission</span>
              </div>

              <div className="space-y-3">
                <h3 className="font-editorial text-2xl font-bold text-[#1A1A1A]">
                  Astuces de Grand-Mères & Chefs
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                  Chaque recette intègre le tour de main secret : comment doser le sel gemme, l'instant précis où verser le jus de citron, ou comment remplacer une épice rare introuvable chez votre épicier.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EBE5DC] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBF0E6] text-[#8FA382] flex items-center justify-center flex-shrink-0 font-bold">
                  98%
                </div>
                <p className="text-xs text-[#1A1A1A] font-medium leading-tight">
                  de réussite au premier essai chez nos cuisiniers débutants et confirmés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OFFRE & FORMULES TRANSPARENTES */}
      <section id="offre-premium" className="py-20 sm:py-28 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D35400]">
              Simplicité & Liberté
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
              Choisissez votre formule de découverte.
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A]">
              Accédez librement aux trésors fondamentaux de la cuisine africaine ou débloquez l'intégralité du grand atelier gastronomique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="p-8 rounded-[32px] bg-white border border-[#EBE5DC] shadow-[0_6px_18px_rgba(26,26,26,0.04)] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8FA382]">
                  Accès Découverte
                </span>
                <h3 className="font-editorial text-3xl font-bold text-[#1A1A1A]">
                  100% Gratuit
                </h3>
                <p className="text-xs text-[#736D66]">
                  L'indispensable pour voyager chaque jour sans aucune friction.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#EBE5DC] text-xs text-[#1A1A1A]">
                  {[
                    'Idée du Jour renouvelée chaque matin',
                    'Mode Préparation pas-à-pas avec écran allumé',
                    'Simulateur Marmite d\'ingrédients interactif',
                    'Accès aux recettes fondamentales du Bénin & d\'Afrique',
                    'Minuteurs sonores doux de cuisson',
                    'Sauvegarde locale de vos favoris'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#8FA382]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onLaunchApp('home')}
                className="w-full h-12 rounded-full bg-white border border-[#1A1A1A] hover:bg-[#FAF6F0] text-[#1A1A1A] font-bold text-xs transition-colors cursor-pointer"
              >
                Commencer gratuitement
              </button>
            </div>

            {/* Premium Plan */}
            <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#1A1A1A] to-[#2B2724] text-white shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D35400]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99B26]/20 text-[#D99B26] text-[10px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>Édition Prestige</span>
                </div>
                <h3 className="font-editorial text-3xl font-bold text-white">
                  L'Atelier des Maîtres
                </h3>
                <p className="text-xs text-stone-300">
                  L'encyclopédie gastronomique vivante pour les vrais passionnés.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-stone-700 text-xs text-stone-200">
                  {[
                    'Tout ce qui est inclus dans l\'accès Gratuit',
                    '+150 recettes secrètes et de terroirs rares',
                    'Fiches complètes sur les épices traditionnelles & médicinales',
                    'Substitutions d’ingrédients pour les personnes expatriées',
                    'Accords mets & boissons traditionnelles (Bissap, Kinkeliba)',
                    'Accompagnement et astuces de chefs étoilés'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#D35400]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <button
                  type="button"
                  onClick={() => handleOpenAuth('signup')}
                  className="w-full h-12 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white font-bold text-xs shadow-md shadow-[#D35400]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Débloquer l'Atelier Prestige (S'inscrire)
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleOpenAuth('login')}
                    className="text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Déjà membre ? <span className="font-bold text-[#D35400] underline ml-1">J'ai déjà un compte : Se connecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER DE HAUTE CONVERSION */}
      <footer className="bg-[#1A1A1A] text-white pt-20 pb-12 relative overflow-hidden border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          {/* Central Call to Action */}
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-[#D35400] text-white flex items-center justify-center shadow-lg shadow-[#D35400]/40">
              <Compass className="w-7 h-7" />
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[38px] font-bold leading-tight">
              Prêt à éveiller votre curiosité culinaire ?
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Rejoignez notre cercle de passionnés. Recevez chaque semaine une inspiration de plat et la fiche secrète d'une épice de terroir.
            </p>

            {/* Newsletter Input */}
            <div className="max-w-md mx-auto">
              {isSubscribed ? (
                <div className="p-4 rounded-full bg-[#EBF0E6] text-[#1A1A1A] font-bold text-xs flex items-center justify-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-[#8FA382]" />
                  <span>🎉 Bienvenue en cuisine ! L'aventure gustative commence.</span>
                </div>
              ) : (
                <form onSubmit={handleFooterSubscribe} className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Entrez votre email pour démarrer..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full h-14 pl-5 pr-14 rounded-full bg-stone-900 border border-stone-700 text-white placeholder:text-stone-500 text-xs sm:text-sm focus:outline-hidden focus:border-[#D35400] transition-colors"
                  />
                  <button
                    type="submit"
                    title="Valider"
                    className="absolute right-1.5 w-11 h-11 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-stone-800 text-xs text-stone-400">
            <div className="space-y-3">
              <span className="font-bold text-white uppercase tracking-wider block">
                Découverte
              </span>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onLaunchApp('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Idée du Jour
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onLaunchApp('discover')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terroirs du Bénin
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onLaunchApp('discover')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Grandes Cuisines d'Afrique
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onLaunchApp('discover')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Cuisines du Monde
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-bold text-white uppercase tracking-wider block">
                Spécialités Phares
              </span>
              <ul className="space-y-2">
                <li>Amiwo au poulet (Bénin)</li>
                <li>Dakouin de Grand-Popo (Bénin)</li>
                <li>Poulet Yassa (Sénégal)</li>
                <li>Ndolé aux crevettes (Cameroun)</li>
                <li>Curry crémeux Madras (Monde)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-bold text-white uppercase tracking-wider block">
                Mon Espace
              </span>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenAuth('login')}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#D35400]" />
                    <span>Se connecter (J'ai déjà un compte)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenAuth('signup')}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-[#D35400]" />
                    <span>S'inscrire (Je n'ai pas de compte)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onLaunchApp('profile')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Carnet privé & Favoris
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-bold text-white uppercase tracking-wider block">
                À Propos
              </span>
              <ul className="space-y-2">
                <li>Marmite & Épices MVP V1</li>
                <li>Conçu avec amour au Bénin & en Afrique</li>
                <li>Transmission & Gastronomie</li>
              </ul>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <p>© {new Date().getFullYear()} Marmite & Épices. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <span>Authenticité</span>
              <span>•</span>
              <span>Transmission</span>
              <span>•</span>
              <span>Découverte</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. SURPRISE ROULETTE MODAL */}
      {isSurpriseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EBE5DC] space-y-6 relative">
            <button
              type="button"
              onClick={() => setIsSurpriseModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#EBE5DC] text-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FAF4E8] text-[#B87A14] text-[11px] font-bold border border-[#D99B26]/30">
                <Dices className={`w-3.5 h-3.5 text-[#D35400] ${isSpinning ? 'animate-spin' : ''}`} />
                <span>La Roulette des Découvertes</span>
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#1A1A1A]">
                {isSpinning ? 'Tirage au sort en cours...' : 'Votre Découverte Surprise !'}
              </h3>
            </div>

            {/* Surprise Card Content */}
            <div className="rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] overflow-hidden">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={surpriseRecipe.image}
                  alt={surpriseRecipe.title}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isSpinning ? 'blur-xs scale-105' : 'scale-100'
                  }`}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A]">
                  {surpriseRecipe.countryFlag} {surpriseRecipe.country}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <h4 className="font-editorial text-xl font-bold text-[#1A1A1A]">
                  {surpriseRecipe.title}
                </h4>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  {surpriseRecipe.subtitle}
                </p>
                <div className="p-3 rounded-xl bg-white border border-[#EBE5DC] text-xs text-[#4A4A4A]">
                  <span className="font-bold text-[#D35400]">L'anecdote : </span>
                  <span>{surpriseRecipe.chefSecret?.text || surpriseRecipe.description}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsSurpriseModalOpen(false);
                  onLaunchApp('home', surpriseRecipe);
                }}
                className="w-full sm:flex-1 h-12 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#D35400]/25 transition-all cursor-pointer"
              >
                <ChefHat className="w-4 h-4" />
                <span>Cuisiner ce plat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={spinRoulette}
                disabled={isSpinning}
                className="w-full sm:w-auto h-12 px-5 rounded-full bg-[#FAF4E8] border border-[#D99B26]/30 text-[#B87A14] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#F5ECD8] transition-colors cursor-pointer"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>Autre plat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. SIGN-UP / AUTH MODAL (avec switch J'ai déjà un compte / Je n'ai pas de compte) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authInitialMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
