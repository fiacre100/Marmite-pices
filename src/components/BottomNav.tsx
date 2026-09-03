import { Home, Compass, Refrigerator, Heart, User } from 'lucide-react';
import { TabDestination } from '../types';

interface BottomNavProps {
  activeTab: TabDestination;
  onSelectTab: (tab: TabDestination) => void;
  favoritesCount: number;
}

export function BottomNav({ activeTab, onSelectTab, favoritesCount }: BottomNavProps) {
  const tabs = [
    { id: 'home' as TabDestination, label: 'Accueil', icon: Home },
    { id: 'discover' as TabDestination, label: 'Découvrir', icon: Compass },
    { id: 'fridge' as TabDestination, label: 'Ingrédients', icon: Refrigerator },
    { id: 'favorites' as TabDestination, label: 'Favoris', icon: Heart, count: favoritesCount },
    { id: 'profile' as TabDestination, label: 'Profil', icon: User },
  ];

  return (
    <nav
      id="main-bottom-navigation"
      aria-label="Navigation principale de l'application"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EBE5DC] pb-safe transition-all shadow-[0_-4px_20px_rgba(60,30,10,0.03)]"
    >
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center min-w-[56px] h-14 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#C85A32] font-semibold'
                  : 'text-[#736D66] hover:text-[#1C1A18] active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    aria-label={`${tab.count} recettes favorites`}
                    className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] bg-[#C85A32] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
                  >
                    {tab.count > 99 ? '99+' : tab.count}
                  </span>
                )}
              </div>

              <span className="text-[11px] mt-1 tracking-tight leading-none">
                {tab.label}
              </span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] mt-1 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
