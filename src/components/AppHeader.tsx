import { Flame, Sparkles, Layout } from 'lucide-react';
import { UserProfile } from '../types';

interface AppHeaderProps {
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenPremium: () => void;
  onBackToLanding?: () => void;
}

export function AppHeader({ user, onOpenProfile, onOpenPremium, onBackToLanding }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EBE5DC]/80 px-4 py-2.5 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#A64420] text-white flex items-center justify-center shadow-sm shadow-[#C85A32]/20">
            <Flame className="w-5 h-5 fill-white/20 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-editorial text-lg font-bold text-[#1C1A18] tracking-tight leading-none">
                Marmite & Épices
              </span>
              {user.isPremium && (
                <span className="text-[10px] bg-[#FAF4E8] text-[#D99B26] font-bold px-1.5 py-0.5 rounded-full border border-[#D99B26]/30 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  Atelier
                </span>
              )}
            </div>
            <p className="text-[10px] font-medium tracking-wider text-[#736D66] uppercase mt-0.5">
              Carnet culinaire artisanal
            </p>
          </div>
        </div>

        {/* Action buttons & Avatar */}
        <div className="flex items-center gap-2">
          {onBackToLanding && (
            <button
              id="header-back-to-landing-btn"
              type="button"
              onClick={onBackToLanding}
              title="Voir la vitrine de présentation du produit"
              className="text-[11px] font-semibold text-[#736D66] hover:text-[#1C1A18] bg-white hover:bg-[#FAF6F0] border border-[#EBE5DC] px-2.5 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Layout className="w-3 h-3 text-[#C85A32]" />
              <span>Vitrine</span>
            </button>
          )}

          {!user.isPremium && (
            <button
              id="header-premium-btn"
              type="button"
              onClick={onOpenPremium}
              className="text-[11px] font-semibold text-[#C85A32] bg-[#F8EFEB] hover:bg-[#F3E2DB] border border-[#C85A32]/20 px-2.5 py-1.5 rounded-full transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Atelier</span>
            </button>
          )}

          <button
            id="header-avatar-btn"
            type="button"
            onClick={onOpenProfile}
            aria-label="Accéder à mon profil"
            className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:ring-offset-2 transition-transform active:scale-95"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-[#EBE5DC] shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#6B7F5E] rounded-full ring-2 ring-[#FDFBF7]" />
          </button>
        </div>
      </div>
    </header>
  );
}
