import { useState } from 'react';
import {
  Sparkles,
  X,
  RotateCw,
  ArrowRight,
  Flame,
  Clock,
  Wallet,
  Users,
  ChefHat,
  CheckCircle2
} from 'lucide-react';
import { Recipe, CookingConditions } from '../types';
import { STOVE_OPTIONS, BUDGET_OPTIONS } from './CookingConditionsModal';

interface WhatToEatTodayModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  conditions: CookingConditions;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
}

export function WhatToEatTodayModal({
  isOpen,
  onClose,
  recipes,
  conditions,
  onSelectRecipe,
  onStartCooking
}: WhatToEatTodayModalProps) {
  const [mood, setMood] = useState<'all' | 'local' | 'express' | 'eco' | 'comfort'>('local');
  const [isRolling, setIsRolling] = useState(false);
  const [pickedRecipe, setPickedRecipe] = useState<Recipe | null>(() => {
    const local = recipes.filter((r) => r.country === 'Bénin' || r.region === 'benin');
    return local.length > 0 ? local[0] : recipes[0];
  });

  if (!isOpen) return null;

  const currentStove = STOVE_OPTIONS.find((s) => s.id === conditions.stoveType) || STOVE_OPTIONS[0];
  const currentBudget = BUDGET_OPTIONS.find((b) => b.id === conditions.budget) || BUDGET_OPTIONS[1];

  const handleRoll = () => {
    setIsRolling(true);
    let pool = recipes;

    if (mood === 'local') {
      pool = recipes.filter((r) => r.country === 'Bénin' || r.region === 'benin' || r.tags.includes('Bénin'));
    } else if (mood === 'express') {
      pool = recipes.filter((r) => r.durationMinutes <= 35);
    } else if (mood === 'eco') {
      pool = recipes.filter((r) => r.difficulty === 'Facile' || r.badgeLabel?.includes('100% en stock'));
    } else if (mood === 'comfort') {
      pool = recipes.filter((r) => r.category === 'traditionnel' || r.category === 'mijote');
    }

    if (pool.length === 0) pool = recipes;

    // Simulate roulette
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * pool.length);
      setPickedRecipe(pool[randomIndex]);
      count++;
      if (count > 6) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  const selected = pickedRecipe || recipes[0];

  return (
    <div
      id="what-to-eat-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
    >
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-3xl border border-[#EBE5DC] shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#C85A32] to-[#A64420] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg">
              🍲
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 block">
                Zéro Casse-tête
              </span>
              <h3 className="font-editorial text-base sm:text-lg font-bold text-white leading-tight">
                Qu'est-ce qu'on mange aujourd'hui ?
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mood filter selector */}
        <div className="px-4 pt-3 pb-1 border-b border-[#EBE5DC] bg-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#736D66] block mb-1.5">
            Envie du moment :
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'local', label: '🇧🇯 Plat local' },
              { id: 'express', label: '⚡ Rapide (<35 min)' },
              { id: 'eco', label: '🪙 Petit budget' },
              { id: 'comfort', label: '🍲 Grand mijoté' },
              { id: 'all', label: '✨ N\'importe quoi' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMood(item.id as any)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                  mood === item.id
                    ? 'bg-[#1C1A18] text-white'
                    : 'bg-[#FAF6F0] text-[#736D66] border border-[#EBE5DC]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active conditions indicator */}
        <div className="px-4 py-2 bg-[#FAF6F0] border-b border-[#EBE5DC] flex items-center justify-between text-[11px] text-[#736D66]">
          <span className="flex items-center gap-1">
            <span>{currentStove.icon} {currentStove.label}</span>
            <span>•</span>
            <span>{currentBudget.icon} {currentBudget.label.split(' ')[0]}</span>
            <span>•</span>
            <span>👥 {conditions.servings} pers</span>
          </span>
          <span className="text-[10px] text-[#6B7F5E] font-bold flex items-center gap-0.5">
            <CheckCircle2 className="w-3 h-3" />
            Adapté
          </span>
        </div>

        {/* The Picked Recipe Card */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-[#EBE5DC] bg-white shadow-sm">
            <div className="aspect-[16/9] w-full relative overflow-hidden bg-stone-900">
              <img
                src={selected.image}
                alt={selected.title}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isRolling ? 'scale-105 blur-xs' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1A18] text-xs font-bold flex items-center gap-1">
                  <span>{selected.countryFlag}</span>
                  <span>{selected.country}</span>
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  {selected.badgeLabel || 'Recommandé pour vous'}
                </span>
                <h4 className="font-editorial text-lg sm:text-xl font-bold leading-tight">
                  {selected.title}
                </h4>
              </div>
            </div>

            <div className="p-3.5 space-y-2.5">
              <p className="text-xs text-[#736D66] line-clamp-2 leading-relaxed">
                {selected.description}
              </p>

              <div className="flex items-center justify-between text-xs font-bold text-[#1C1A18] pt-1 border-t border-[#EBE5DC]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>{selected.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="w-3.5 h-3.5 text-[#6B7F5E]" />
                  <span>{selected.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#D99B26]" />
                  <span>{conditions.servings} pers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartCooking(selected);
              }}
              className="w-full h-12 rounded-2xl bg-[#C85A32] hover:bg-[#A64420] text-white font-bold text-xs shadow-md shadow-[#C85A32]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Lancer la préparation pas à pas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleRoll}
                disabled={isRolling}
                className="h-10 rounded-xl bg-white border border-[#EBE5DC] text-[#1C1A18] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-stone-50 active:scale-95 transition-all"
              >
                <RotateCw className={`w-3.5 h-3.5 text-[#C85A32] ${isRolling ? 'animate-spin' : ''}`} />
                <span>Autre idée</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectRecipe(selected);
                }}
                className="h-10 rounded-xl bg-[#FAF6F0] border border-[#EBE5DC] text-[#736D66] hover:text-[#1C1A18] text-xs font-semibold flex items-center justify-center transition-all"
              >
                Voir le plan d'action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
