export type StoveType = 'charbon' | 'gaz' | 'induction' | 'rechaud';
export type BudgetLevel = 'eco' | 'standard' | 'festif';
export type TimeConstraint = 'express' | 'standard' | 'mijote';
export type SkillLevel = 'debutant' | 'intermediaire' | 'chef';

export interface CookingConditions {
  stoveType: StoveType; // Foyer (Charbon, Gaz, Induction, Réchaud)
  budget: BudgetLevel; // Moyens (Éco, Standard, Festif)
  timeAvailable: TimeConstraint; // Temps (Express, Standard, Mijoté)
  skillLevel: SkillLevel; // Niveau (Débutant, Intermédiaire, Chef)
  servings: number; // Nombre de convives (1 à 12)
}

export const DEFAULT_COOKING_CONDITIONS: CookingConditions = {
  stoveType: 'gaz',
  budget: 'standard',
  timeAvailable: 'standard',
  skillLevel: 'debutant',
  servings: 4
};

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  note?: string;
  ecoSubstitute?: string;
  festiveUpgrade?: string;
}

export type StepPhase = 'preparation' | 'saisie' | 'mijotage' | 'finition';

export interface CookingStep {
  stepNumber: number;
  title: string;
  phase?: StepPhase;
  text: string;
  detailedGuidance?: string; // Repères visuels, sonores et olfactifs ultra-précis
  proTip?: string; // Astuce anti-raté infaillible du chef
  durationMinutes?: number;
  timerSeconds?: number;
  image: string;
  heatLevel?: string;
  stepIngredients: string[];
  stoveGuidance?: {
    charbon?: string;
    gaz?: string;
    induction?: string;
    rechaud?: string;
  };
}

export interface SideDish {
  name: string;
  description: string;
  icon: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  country: string;
  countryFlag: string;
  region: 'benin' | 'west-africa' | 'africa' | 'world';
  durationMinutes: number;
  difficulty: 'Facile' | 'Moyen' | 'Expert';
  servings: number;
  image: string;
  isDailyIdea?: boolean;
  isSignature?: boolean;
  rating: number;
  reviewsCount: number;
  caloriesPerServing: number;
  category: 'repas-rapide' | 'plat-de-fete' | 'mijote' | 'traditionnel';
  tags: string[];
  badgeLabel?: string;
  budgetAdaptation?: {
    ecoTip: string;
    festiveTip: string;
  };
  stoveAdaptationTips?: {
    charbon: string;
    gaz: string;
    induction: string;
  };
  actionPlanPhases?: {
    phase: StepPhase;
    title: string;
    description: string;
    estimatedMinutes: number;
  }[];
  chefSecret: {
    author: string;
    text: string;
  };
  ingredients: Ingredient[];
  steps: CookingStep[];
  sideDishes: SideDish[];
  similarRecipeIds: string[];
}

export type TabDestination = 'home' | 'discover' | 'fridge' | 'favorites' | 'profile';

export interface UserPreferences {
  spiciness: 'doux' | 'moyen' | 'releve';
  diet: string[];
  cookingTimePreference: string;
  soundAlerts: boolean;
  keepScreenOn: boolean;
}

export interface UserProfile {
  name: string;
  title: string;
  speciality: string;
  avatar: string;
  cookedCount: number;
  favoriteSpicesCount: number;
  isPremium: boolean;
  preferences: UserPreferences;
}
