import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  ChefHat,
  Heart,
  Compass,
  Star,
  Play,
  Dices,
  ShieldCheck,
  ShoppingBag,
  Zap,
  RefreshCw
} from 'lucide-react';
import { Recipe, TabDestination } from '../../types';
import { AuthMode } from '../AuthModal';

interface HeroSectionProps {
  onLaunchApp: (targetTab?: TabDestination, initialRecipe?: Recipe) => void;
  recipes: Recipe[];
  openSurpriseModal: () => void;
  handleOpenAuth: (mode?: AuthMode) => void;
}

interface HeroDishItem {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  flag: string;
  tag: string;
  duration: string;
  difficulty: string;
  image: string;
  reason: string;
  aromaNote: string;
  stoveTip: string;
}

const HERO_DISHES: HeroDishItem[] = [
  {
    id: 'sauce-amiwo',
    title: 'Amiwo & Poulet Doré',
    subtitle: 'Pâte rouge au bouillon de tomate fraîche et maïs concassé',
    country: 'Bénin',
    flag: '🇧🇯',
    tag: 'Trésor du Terroir',
    duration: '50 min',
    difficulty: 'Facile',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    reason: 'L’emblème béninois des déjeuners dominicaux aux arômes fumés et épices douces.',
    aromaNote: 'Arômes fumés & tomate rissolée',
    stoveTip: 'Parfait au charbon ou sur réchaud gaz'
  },
  {
    id: 'poulet-yassa',
    title: 'Poulet Yassa Royal',
    subtitle: 'Oignons caramélisés fondants et citron vert acidulé',
    country: 'Sénégal',
    flag: '🇸🇳',
    tag: 'Grand Classique',
    duration: '45 min',
    difficulty: 'Facile',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    reason: 'L’accord parfait entre la marinade aux agrumes, la moutarde et la compotée d’oignons.',
    aromaNote: 'Zeste acidulé & marinade moutardée',
    stoveTip: 'Mijotage doux à feu couvert'
  },
  {
    id: 'curry-madras-poulet',
    title: 'Curry Crémeux Madras',
    subtitle: 'Lait de coco onctueux, curcuma doré et coriandre fraîche',
    country: 'Inde & Océan Indien',
    flag: '🇮🇳',
    tag: 'Évasion du Monde',
    duration: '40 min',
    difficulty: 'Facile',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    reason: 'Une alliance chaleureuse d’épices toastées enveloppée d’une crème de coco veloutée.',
    aromaNote: 'Curcuma, coriandre & coco douce',
    stoveTip: 'Ébullition très douce sans brûler les épices'
  },
  {
    id: 'tajine-poulet',
    title: 'Tajine aux Citrons Confits',
    subtitle: 'Poulet mijoté au safran, olives beldi et gingembre doux',
    country: 'Maroc',
    flag: '🇲🇦',
    tag: 'Maghreb Safrané',
    duration: '60 min',
    difficulty: 'Moyen',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
    reason: 'Cuisson lente à l’étouffée où la chair s’imprègne de parfums d’Orient et de pulpe confite.',
    aromaNote: 'Safran pur & citron beldi confit',
    stoveTip: 'Idéal en plat de terre cuite ou cocotte épaisse'
  }
];

// Curiosity prompts that rotate to provoke appetite and culinary exploration
const CURIOSITY_QUESTIONS = [
  {
    question: '« Que cuisiner ce soir avec 3 ingrédients et 35 minutes devant vous ? »',
    action: 'Tester le filtre rapide',
    destination: 'fridge' as TabDestination
  },
  {
    question: '« Connaissez-vous le secret du bouillon rouge pour réussir l’Amiwo sans grumeaux ? »',
    action: 'Voir le tour de main',
    dishId: 'sauce-amiwo'
  },
  {
    question: '« Comment caraméliser les oignons du Yassa sans jamais les brûler ? »',
    action: 'Découvrir la règle d’or',
    dishId: 'poulet-yassa'
  },
  {
    question: '« Et si vous osiez le Dakouin de Grand-Popo avec un poisson ultra-frais ? »',
    action: 'Explorer le court-bouillon',
    dishId: 'dakouin-poisson'
  }
];

export function HeroSection({
  onLaunchApp,
  recipes,
  openSurpriseModal,
  handleOpenAuth
}: HeroSectionProps) {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [cycleProgress, setCycleProgress] = useState<number>(0);
  const [curiosityIndex, setCuriosityIndex] = useState<number>(0);

  const activeHeroDish = HERO_DISHES[selectedHeroIndex];

  // Auto-cycle through the 4 hero dishes every 6.5 seconds unless user hovers or interacts
  useEffect(() => {
    if (!isAutoCycling) return;

    const intervalMs = 6500;
    const tickMs = 50;
    const step = (tickMs / intervalMs) * 100;

    const timer = setInterval(() => {
      setCycleProgress((prev) => {
        if (prev >= 100) {
          setSelectedHeroIndex((current) => (current + 1) % HERO_DISHES.length);
          return 0;
        }
        return prev + step;
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [isAutoCycling]);

  // Rotate curiosity questions every 8 seconds
  useEffect(() => {
    const qTimer = setInterval(() => {
      setCuriosityIndex((prev) => (prev + 1) % CURIOSITY_QUESTIONS.length);
    }, 7500);
    return () => clearInterval(qTimer);
  }, []);

  const handleSelectDish = (index: number) => {
    setSelectedHeroIndex(index);
    setCycleProgress(0);
    setIsAutoCycling(false);
  };

  const handleCuriosityAction = () => {
    const currentQ = CURIOSITY_QUESTIONS[curiosityIndex];
    if (currentQ.dishId) {
      const match = recipes.find((r) => r.id === currentQ.dishId) || recipes[0];
      onLaunchApp('home', match);
    } else {
      onLaunchApp(currentQ.destination || 'home');
    }
  };

  const nextCuriosity = () => {
    setCuriosityIndex((prev) => (prev + 1) % CURIOSITY_QUESTIONS.length);
  };

  // Luxury ease curve
  const luxuryEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="hero-decouverte"
      className="relative pt-6 pb-16 sm:pt-12 sm:pb-24 overflow-hidden"
    >
      {/* Sophisticated Ambient Glow Layers (Hearth Embers & Saffron Light) */}
      <div className="absolute top-[-10%] right-[-5%] w-[580px] h-[580px] bg-gradient-to-br from-[#D35400]/12 via-[#D99B26]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-[35%] left-[-10%] w-[520px] h-[520px] bg-gradient-to-tr from-[#8FA382]/12 via-[#FAF4E8]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Subtle Radar / Celestial Grid Arc in Background */}
      <svg
        className="absolute top-10 right-1/4 w-[600px] h-[600px] text-[#D35400]/5 pointer-events-none -z-10 hidden xl:block"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="300" cy="300" r="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="1" />
        <line x1="300" y1="20" x2="300" y2="580" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" />
        <line x1="20" y1="300" x2="580" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: The Culinary Discovery Engine Manifesto         */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 1. Refined Eyebrow: Live Discovery Engine Radar Beacon */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: luxuryEase }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF4E8] border border-[#D99B26]/35 text-[#B87A14] text-xs font-bold shadow-2xs group"
            >
              {/* Radar pulse animation */}
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D35400] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D35400]" />
              </div>
              <Compass className="w-3.5 h-3.5 text-[#D35400] group-hover:rotate-45 transition-transform duration-500" />
              <span className="tracking-wide">Moteur de Découverte Culinaire</span>
              <span className="text-[#D99B26]/70">•</span>
              <span className="text-[#736D66] font-medium hidden sm:inline">Plus de 35 terroirs explorés</span>
            </motion.div>

            {/* 2. Headline with Elegant Staggered Mask Reveal Effect */}
            <div className="space-y-1">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#1A1A1A] tracking-tight leading-[1.08]">
                {/* Line 1 Mask Reveal */}
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.08, ease: luxuryEase }}
                    className="block"
                  >
                    Découvrez de nouveaux plats,
                  </motion.span>
                </span>

                {/* Line 2 Mask Reveal with Saffron / Terracotta Accent */}
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.22, ease: luxuryEase }}
                    className="block text-[#D35400] italic font-semibold"
                  >
                    voyagez à chaque bouchée.
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* 3. Discovery Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: luxuryEase }}
              className="text-base sm:text-lg text-[#4A4A4A] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Ne demandez plus jamais : <em className="text-[#1A1A1A] font-semibold not-italic bg-[#F8EFEB] px-1.5 py-0.5 rounded-md">« Qu'est-ce qu'on mange ce soir ? »</em> Sortez enfin de la routine ! Explorez les trésors méconnus de la cuisine béninoise, les pépites d’Afrique et les merveilles du monde, adaptés à votre foyer et garantis sans raté.
            </motion.p>

            {/* 4. Interactive Curiosity Provoker Ticker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: luxuryEase }}
              className="relative p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#EBE5DC] shadow-2xs hover:shadow-xs transition-all text-left"
            >
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF4E8] text-[#D35400] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D35400]">
                        Piquer la Curiosité
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium hidden sm:inline">
                        Question du jour #{curiosityIndex + 1}
                      </span>
                    </div>

                    {/* Animated Question Transition */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={curiosityIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="text-xs sm:text-sm font-medium text-[#1A1A1A] mt-0.5 truncate sm:whitespace-normal"
                      >
                        {CURIOSITY_QUESTIONS[curiosityIndex].question}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Question interactive action buttons */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCuriosityAction}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF4E8] border border-[#EBE5DC] hover:border-[#D35400] text-[#D35400] text-xs font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{CURIOSITY_QUESTIONS[curiosityIndex].action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={nextCuriosity}
                    title="Autre question pour piquer ma curiosité"
                    className="w-8 h-8 rounded-xl bg-white hover:bg-[#FAF6F0] border border-[#EBE5DC] text-stone-500 hover:text-[#1A1A1A] flex items-center justify-center transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 5. Terroir Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55, ease: luxuryEase }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
            >
              <span className="px-3 py-1 rounded-full bg-white border border-[#EBE5DC] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 shadow-2xs hover:border-[#D35400] transition-colors cursor-default">
                <span>🇧🇯</span> Terroirs du Bénin
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#EBE5DC] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 shadow-2xs hover:border-[#D35400] transition-colors cursor-default">
                <span>🌍</span> Pépites d'Afrique
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#EBE5DC] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 shadow-2xs hover:border-[#D35400] transition-colors cursor-default">
                <span>✈️</span> Saveurs du Monde
              </span>
              <span className="px-3 py-1 rounded-full bg-[#EBF0E6] text-[#6B7F5E] text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" /> Réussite au 1er essai
              </span>
            </motion.div>

            {/* 6. CTAs & Discovery Trigger */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65, ease: luxuryEase }}
              className="space-y-4 pt-2"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                {/* Primary Exploration Button */}
                <a
                  href="#decouvertes-terroirs"
                  className="group relative w-full sm:w-auto h-14 px-8 rounded-full bg-[#D35400] hover:bg-[#B84700] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-[#D35400]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
                >
                  <Compass className="w-5 h-5 fill-current group-hover:rotate-45 transition-transform duration-500" />
                  <span>Explorer les Découvertes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Subtle luxury shine effect */}
                  <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-out" />
                </a>

                {/* Roulette Surprise Button */}
                <button
                  type="button"
                  onClick={openSurpriseModal}
                  className="group w-full sm:w-auto h-14 px-6 rounded-full bg-[#FAF4E8] border border-[#D99B26]/40 hover:border-[#D35400] text-[#B87A14] hover:text-[#D35400] font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Dices className="w-4 h-4 text-[#D35400] group-hover:rotate-180 transition-transform duration-500" />
                  <span>Surprenez-moi (Plat Aléatoire)</span>
                </button>

                {/* Quick Direct Preview */}
                <button
                  type="button"
                  onClick={() => onLaunchApp('home')}
                  className="w-full sm:w-auto h-14 px-6 rounded-full bg-white border border-[#EBE5DC] hover:border-[#1A1A1A] text-[#1A1A1A] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-[#8FA382]" />
                  <span>Lancer sans compte</span>
                </button>
              </div>

              {/* Auth Quick Navigation */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-[#736D66] pt-1">
                <span>Vous avez déjà un compte ?</span>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('login')}
                  className="font-bold text-[#D35400] hover:text-[#B84700] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Se connecter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-stone-300">•</span>
                <span>Nouveau cuisinier ?</span>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('signup')}
                  className="font-bold text-[#1A1A1A] hover:text-[#D35400] hover:underline cursor-pointer"
                >
                  Créer un compte gratuit
                </button>
              </div>

              {/* Micro social proof */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#736D66]">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1A1A1A]">4.9 / 5</span>
                  <span>(12 000+ passionnés)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[#8FA382]" />
                  <span>Recettes secrètes authentifiées</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8FA382]" />
                  <span>100% sans publicité</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: The Interactive Culinary Discovery Showcase    */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-5 flex flex-col items-center relative"
            onMouseEnter={() => setIsAutoCycling(false)}
            onMouseLeave={() => setIsAutoCycling(true)}
          >
            {/* Interactive Quick Discovery Switcher Pills above phone */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: luxuryEase }}
              className="mb-3 flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md border border-[#EBE5DC] rounded-full shadow-2xs z-20"
            >
              {HERO_DISHES.map((dish, idx) => {
                const isActive = selectedHeroIndex === idx;
                return (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => handleSelectDish(idx)}
                    className={`relative px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'text-white'
                        : 'text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeroPill"
                        className="absolute inset-0 bg-[#D35400] rounded-full shadow-xs"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{dish.flag}</span>
                    <span className="relative z-10 hidden sm:inline">{dish.country}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Smartphone Mockup Container with Floating Visual Cues */}
            <div className="relative group">
              
              {/* Floating Visual Cue 1: Authentic Origin & Testing Badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 sm:-left-12 z-30 hidden sm:flex items-center gap-2 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EBE5DC] shadow-lg shadow-black/5 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FAF4E8] text-[#D35400] flex items-center justify-center font-bold text-sm">
                  {activeHeroDish.flag}
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-extrabold text-[#D35400] tracking-wider">
                    Origine Authentique
                  </div>
                  <div className="text-xs font-bold text-[#1A1A1A]">
                    {activeHeroDish.country}
                  </div>
                </div>
              </motion.div>

              {/* Floating Visual Cue 2: Hearth Adaptation & Fire Control */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-8 z-30 hidden sm:flex items-center gap-2 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EBE5DC] shadow-lg shadow-black/5 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] text-[#8FA382] flex items-center justify-center">
                  <Flame className="w-4 h-4 text-[#D35400]" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-extrabold text-[#8FA382] tracking-wider">
                    Guide du Feu
                  </div>
                  <div className="text-xs font-bold text-[#1A1A1A]">
                    Charbon, Gaz & Mijoté
                  </div>
                </div>
              </motion.div>

              {/* Smartphone Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.25, ease: luxuryEase }}
                className="w-[320px] sm:w-[350px] aspect-[9/18] bg-[#1A1A1A] rounded-[48px] p-3.5 shadow-[0_24px_50px_rgba(26,26,26,0.18)] border-4 border-[#2C2825] ring-1 ring-white/20 transition-all duration-500 hover:shadow-[0_32px_65px_rgba(211,84,0,0.22)]"
              >
                {/* Speaker notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30" />

                {/* Screen Content */}
                <div className="w-full h-full bg-[#FDFBF7] rounded-[40px] overflow-hidden flex flex-col relative border border-[#EBE5DC]">
                  
                  {/* Header in phone */}
                  <div className="pt-6 pb-2.5 px-4 bg-white/95 border-b border-[#EBE5DC] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#D35400] animate-spin" style={{ animationDuration: '18s' }} />
                      <span className="font-editorial text-sm font-bold text-[#1A1A1A]">
                        Découverte du Jour
                      </span>
                    </div>
                    <span className="text-[10px] bg-[#FAF4E8] text-[#B87A14] font-bold px-2 py-0.5 rounded-full border border-[#D99B26]/30">
                      {activeHeroDish.tag}
                    </span>
                  </div>

                  {/* Dynamic Dish Presentation with AnimatePresence */}
                  <div className="flex-1 overflow-hidden p-3.5 flex flex-col justify-between relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeHeroDish.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        {/* Photo Card with Rich Visual Badges */}
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/4] bg-stone-900 shadow-sm group">
                          <img
                            src={activeHeroDish.image}
                            alt={activeHeroDish.title}
                            className="w-full h-full object-cover brightness-95 transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                          {/* Country Flag Pill */}
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A] shadow-xs flex items-center gap-1">
                            <span>{activeHeroDish.flag}</span>
                            <span>{activeHeroDish.country}</span>
                          </div>

                          {/* Heart Icon */}
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center">
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </div>

                          {/* Image Caption & Title */}
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[9px] uppercase tracking-wider text-[#D99B26] font-bold block">
                              Pépite à Goûter
                            </span>
                            <h3 className="font-editorial text-lg font-bold leading-tight">
                              {activeHeroDish.title}
                            </h3>
                            <p className="text-[10px] text-stone-300 line-clamp-1 mt-0.5">
                              {activeHeroDish.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Aroma & Sensory Note */}
                        <div className="my-2 p-2.5 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC] text-[10px] text-[#4A4A4A] flex items-start gap-1.5 leading-snug">
                          <Sparkles className="w-3.5 h-3.5 text-[#D35400] flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#1A1A1A] block">{activeHeroDish.aromaNote}</span>
                            <span className="italic text-stone-600">« {activeHeroDish.reason} »</span>
                          </div>
                        </div>

                        {/* Recipe Technical Stats */}
                        <div className="p-2.5 rounded-2xl bg-white border border-[#EBE5DC] shadow-2xs flex items-center justify-between text-[11px] text-[#4A4A4A]">
                          <span className="font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D35400]" /> {activeHeroDish.duration}
                          </span>
                          <span>•</span>
                          <span className="font-bold text-[#8FA382]">{activeHeroDish.difficulty}</span>
                          <span>•</span>
                          <span className="font-bold">4 pers.</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Action Button inside phone to Launch Recipe */}
                    <button
                      type="button"
                      onClick={() => {
                        const matched = recipes.find((r) => r.id === activeHeroDish.id) || recipes[0];
                        onLaunchApp('home', matched);
                      }}
                      className="w-full h-11 mt-2.5 rounded-2xl bg-[#D35400] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#B84700] transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Découvrir cette recette</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Auto-Cycle Visual Progress Bar */}
                  <div className="w-full h-1 bg-[#EBE5DC]">
                    <div
                      className="h-full bg-[#D35400] transition-all duration-75"
                      style={{ width: `${cycleProgress}%` }}
                    />
                  </div>

                  {/* Bottom Navigation Mock inside phone */}
                  <div className="py-2 px-4 bg-white border-t border-[#EBE5DC] flex items-center justify-around text-stone-400">
                    <div className="text-[#D35400] flex flex-col items-center">
                      <Compass className="w-4 h-4" />
                      <span className="text-[8px] font-bold">Découvrir</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Flame className="w-4 h-4" />
                      <span className="text-[8px]">Inspiration</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-[8px]">Marmite</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Heart className="w-4 h-4" />
                      <span className="text-[8px]">Favoris</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Micro Caption under phone */}
            <p className="text-[11px] text-[#736D66] mt-3 text-center">
              Passez la souris sur le smartphone pour mettre en pause la découverte
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
