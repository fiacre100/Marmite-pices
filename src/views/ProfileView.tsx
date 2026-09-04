import React, { useState } from 'react';
import {
  User,
  Sliders,
  History,
  Crown,
  Settings,
  LogOut,
  Flame,
  ChevronRight,
  Check,
  Volume2,
  Moon,
  Smartphone,
  Sparkles,
  X,
  Camera,
  Loader2
} from 'lucide-react';
import { UserProfile, Recipe } from '../types';
import { supabase } from '../lib/supabase';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onOpenPremium: () => void;
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  cookingHistory: string[];
  onLogout?: () => void;
  onOpenAuth?: (mode: 'signup' | 'login') => void;
}

export function ProfileView({
  user,
  onUpdateUser,
  onOpenPremium,
  recipes,
  onSelectRecipe,
  cookingHistory,
  onLogout,
  onOpenAuth
}: ProfileViewProps) {
  const [activeModal, setActiveModal] = useState<'preferences' | 'history' | 'settings' | 'logout' | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      setIsUploading(true);

      // Verify the session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        alert("Vous devez être connecté pour changer d'avatar.");
        setIsUploading(false);
        return;
      }

      // Upload the image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Update local and global state
      onUpdateUser({ avatar: data.publicUrl });
      
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      alert(`Erreur lors du téléchargement de l'avatar: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // History recipes
  const historyRecipes = recipes.filter((r) => cookingHistory.includes(r.id));

  return (
    <div id="profile-view" className="space-y-6 pb-12">
      {/* Profile Card */}
      <section className="p-5 rounded-3xl bg-white border border-[#EBE5DC] shadow-[0_4px_20px_rgba(40,20,10,0.03)] space-y-4">
        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer group">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarUpload} 
              disabled={isUploading}
            />
            <img
              src={user.avatar}
              alt={user.name}
              className={`w-16 h-16 rounded-full object-cover border-2 border-[#EBE5DC] shadow-sm transition-opacity ${isUploading ? 'opacity-50' : 'group-hover:opacity-80'}`}
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#6B7F5E] rounded-full ring-2 ring-white" />
            
            {/* Overlay for uploading or hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              {isUploading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Camera className="w-5 h-5 text-white" />
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full">
                <Loader2 className="w-5 h-5 text-[#C85A32] animate-spin" />
              </div>
            )}
          </label>

          <div className="space-y-0.5">
            <h1 className="font-editorial text-xl font-bold text-[#1C1A18]">
              {user.name}
            </h1>
            <p className="text-xs font-semibold text-[#6B7F5E] flex items-center gap-1">
              <span>{user.isPremium ? '✨ Membre Prestige Atelier' : '🌿 Membre Explorateur Culinaire'}</span>
            </p>
            <p className="text-[11px] text-[#736D66]">
              {user.speciality}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EBE5DC]">
          <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC]/80 text-center">
            <span className="text-xl font-editorial font-bold text-[#1C1A18] block">
              {user.cookedCount}
            </span>
            <span className="text-[11px] text-[#736D66] font-medium">
              Recettes mijotées
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#EBE5DC]/80 text-center">
            <span className="text-xl font-editorial font-bold text-[#D99B26] block">
              {user.favoriteSpicesCount}
            </span>
            <span className="text-[11px] text-[#736D66] font-medium">
              Épices favorites
            </span>
          </div>
        </div>
      </section>

      {/* Profile Menu List */}
      <section className="rounded-3xl bg-white border border-[#EBE5DC] shadow-[0_2px_12px_rgba(40,20,10,0.02)] overflow-hidden divide-y divide-[#EBE5DC]/80">
        {/* 1. Préférences */}
        <button
          id="profile-menu-preferences"
          type="button"
          onClick={() => setActiveModal('preferences')}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF6F0] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F8EFEB] text-[#C85A32] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-sm font-bold text-[#1C1A18] group-hover:text-[#C85A32] transition-colors">
                Mes préférences culinaires
              </h3>
              <p className="text-[11px] text-[#736D66]">
                Régimes, niveau de piment & intolérances
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#736D66] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 2. Historique */}
        <button
          id="profile-menu-history"
          type="button"
          onClick={() => setActiveModal('history')}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF6F0] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF4E8] text-[#D99B26] flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-sm font-bold text-[#1C1A18] group-hover:text-[#D99B26] transition-colors">
                Mon historique de cuisine
              </h3>
              <p className="text-[11px] text-[#736D66]">
                Derniers plats savourés et préparés ({historyRecipes.length})
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#736D66] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 3. Mon abonnement */}
        <button
          id="profile-menu-premium"
          type="button"
          onClick={onOpenPremium}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF6F0] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FAF4E8] to-[#F8EFEB] text-[#C85A32] border border-[#C85A32]/20 flex items-center justify-center">
              <Crown className="w-5 h-5 fill-[#C85A32]/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-sm font-bold text-[#1C1A18] group-hover:text-[#C85A32] transition-colors">
                  Mon abonnement Atelier
                </h3>
                {user.isPremium ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                    Actif
                  </span>
                ) : (
                  <span className="text-[10px] bg-[#F8EFEB] text-[#C85A32] font-bold px-1.5 py-0.2 rounded-full">
                    Découvrir
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#736D66]">
                Accès complet aux 200+ recettes & mode sans pub
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#736D66] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 4. Paramètres de l'application */}
        <button
          id="profile-menu-settings"
          type="button"
          onClick={() => setActiveModal('settings')}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF6F0] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-sm font-bold text-[#1C1A18] group-hover:text-[#6B7F5E] transition-colors">
                Paramètres de l'application
              </h3>
              <p className="text-[11px] text-[#736D66]">
                Alertes mijoteuse, vue tactile & minuteur sonore
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#736D66] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>

      {/* Logout Action */}
      <div className="pt-2">
        <button
          id="profile-logout-btn"
          type="button"
          onClick={() => setActiveModal('logout')}
          className="w-full h-12 rounded-2xl bg-white border border-[#EBE5DC] text-[#736D66] hover:text-rose-600 hover:border-rose-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Se déconnecter de Marmite & Épices</span>
        </button>
      </div>

      {/* App version footer */}
      <div className="text-center pt-2 space-y-1">
        <p className="text-[11px] font-medium text-[#736D66]">
          Marmite & Épices — Édition Artisanale v1.0.4
        </p>
        <div className="flex items-center justify-center gap-1.5 text-stone-300">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
        </div>
      </div>

      {/* Modal: Préférences Culinaires */}
      {activeModal === 'preferences' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE5DC]">
              <h3 className="font-editorial text-lg font-bold text-[#1C1A18]">
                Mes préférences culinaires
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#736D66]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Piquant */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C1A18] uppercase tracking-wider block">
                Tolérance au piment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'doux', label: '🌶️ Doux' },
                  { id: 'moyen', label: '🌶️🌶️ Équilibré' },
                  { id: 'releve', label: '🌶️🌶️🌶️ Relevé' }
                ].map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => {
                      onUpdateUser({
                        preferences: {
                          ...user.preferences,
                          spiciness: level.id as 'doux' | 'moyen' | 'releve'
                        }
                      });
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      user.preferences.spiciness === level.id
                        ? 'bg-[#F8EFEB] border-[#C85A32] text-[#C85A32]'
                        : 'border-[#EBE5DC] text-[#736D66]'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Diets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C1A18] uppercase tracking-wider block">
                Régimes & habitudes
              </label>
              <div className="space-y-2">
                {['Halal', 'Sans gluten', 'Végétarien', 'Sans arachide'].map((diet) => {
                  const hasDiet = user.preferences.diet.includes(diet);
                  return (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => {
                        const nextDiets = hasDiet
                          ? user.preferences.diet.filter((d) => d !== diet)
                          : [...user.preferences.diet, diet];
                        onUpdateUser({
                          preferences: {
                            ...user.preferences,
                            diet: nextDiets
                          }
                        });
                      }}
                      className="w-full p-3 rounded-xl border border-[#EBE5DC] flex items-center justify-between text-xs font-medium"
                    >
                      <span className="text-[#1C1A18]">{diet}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          hasDiet ? 'bg-[#C85A32] text-white' : 'border border-[#EBE5DC]'
                        }`}
                      >
                        {hasDiet && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-12 rounded-xl bg-[#C85A32] text-white font-semibold text-xs shadow-xs"
            >
              Enregistrer mes préférences
            </button>
          </div>
        </div>
      )}

      {/* Modal: Historique */}
      {activeModal === 'history' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE5DC]">
              <h3 className="font-editorial text-lg font-bold text-[#1C1A18]">
                Historique de préparation
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#736D66]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {historyRecipes.length > 0 ? (
              <div className="space-y-2.5">
                {historyRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      setActiveModal(null);
                      onSelectRecipe(recipe);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setActiveModal(null); onSelectRecipe(recipe); } }}
                    className="p-2.5 rounded-xl border border-[#EBE5DC] flex items-center gap-3 hover:border-[#C85A32] transition-colors cursor-pointer"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-editorial text-xs font-bold text-[#1C1A18] line-clamp-1">
                        {recipe.title}
                      </h4>
                      <p className="text-[10px] text-[#736D66]">
                        {recipe.countryFlag} {recipe.country} • {recipe.durationMinutes} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#736D66] text-center py-8">
                Vous n'avez pas encore terminé de recette en mode cuisine. Lancez un pas-à-pas pour la retrouver ici !
              </p>
            )}
          </div>
        </div>
      )}

      {/* Modal: Paramètres */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE5DC]">
              <h3 className="font-editorial text-lg font-bold text-[#1C1A18]">
                Paramètres de l'application
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#736D66]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Audio Chime */}
              <div className="p-3.5 rounded-2xl bg-[#FAF6F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-[#C85A32]" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1A18]">
                      Minuteur sonore de cuisine
                    </h4>
                    <p className="text-[11px] text-[#736D66]">
                      Carillon doux à la fin de chaque étape
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={user.preferences.soundAlerts}
                  onChange={(e) => {
                    onUpdateUser({
                      preferences: {
                        ...user.preferences,
                        soundAlerts: e.target.checked
                      }
                    });
                  }}
                  className="w-5 h-5 accent-[#C85A32] rounded cursor-pointer"
                />
              </div>

              {/* Screen Wake Lock */}
              <div className="p-3.5 rounded-2xl bg-[#FAF6F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#6B7F5E]" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1A18]">
                      Écran toujours allumé en cuisine
                    </h4>
                    <p className="text-[11px] text-[#736D66]">
                      Évite la mise en veille pendant la préparation
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={user.preferences.keepScreenOn}
                  onChange={(e) => {
                    onUpdateUser({
                      preferences: {
                        ...user.preferences,
                        keepScreenOn: e.target.checked
                      }
                    });
                  }}
                  className="w-5 h-5 accent-[#6B7F5E] rounded cursor-pointer"
                />
              </div>

              {/* Dark Mode */}
              <div className="p-3.5 rounded-2xl bg-[#FAF6F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-indigo-500" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1A18]">
                      Mode sombre
                    </h4>
                    <p className="text-[11px] text-[#736D66]">
                      Repose les yeux pendant la nuit
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={user.preferences.theme === 'dark'}
                  onChange={(e) => {
                    onUpdateUser({
                      preferences: {
                        ...user.preferences,
                        theme: e.target.checked ? 'dark' : 'light'
                      }
                    });
                  }}
                  className="w-5 h-5 accent-indigo-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-12 rounded-xl bg-[#1C1A18] text-white font-semibold text-xs shadow-xs"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal: Déconnexion */}
      {activeModal === 'logout' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-editorial text-base font-bold text-[#1C1A18]">
                Quitter votre carnet ?
              </h3>
              <p className="text-xs text-[#736D66]">
                Vos favoris et recettes sauvegardées restent enregistrés dans ce navigateur.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="h-10 rounded-xl border border-[#EBE5DC] text-xs font-semibold text-[#1C1A18] hover:bg-[#FAF6F0] transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    onLogout?.();
                  }}
                  className="h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Déconnexion
                </button>
              </div>

              {onOpenAuth && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    onOpenAuth('login');
                  }}
                  className="w-full h-9 rounded-xl bg-[#FAF6F0] hover:bg-[#EBE5DC] text-xs font-semibold text-[#D35400] transition-colors cursor-pointer"
                >
                  Changer de compte ou se reconnecter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
