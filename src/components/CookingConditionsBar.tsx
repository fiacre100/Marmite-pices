import { SlidersHorizontal, Flame, Wallet, Users, Clock } from 'lucide-react';
import { CookingConditions } from '../types';
import { STOVE_OPTIONS, BUDGET_OPTIONS } from './CookingConditionsModal';

interface CookingConditionsBarProps {
  conditions: CookingConditions;
  onOpenModal: () => void;
  className?: string;
}

export function CookingConditionsBar({
  conditions,
  onOpenModal,
  className = ''
}: CookingConditionsBarProps) {
  const currentStove = STOVE_OPTIONS.find((s) => s.id === conditions.stoveType) || STOVE_OPTIONS[0];
  const currentBudget = BUDGET_OPTIONS.find((b) => b.id === conditions.budget) || BUDGET_OPTIONS[1];

  return (
    <div
      id="cooking-conditions-bar"
      className={`p-2.5 sm:p-3 rounded-2xl bg-white border border-[#EBE5DC] shadow-[0_2px_8px_rgba(40,20,10,0.03)] flex items-center justify-between gap-2 ${className}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-[11px] font-semibold text-[#1C1A18]">
        <div className="flex items-center gap-1 bg-[#FAF6F0] px-2 py-1 rounded-lg border border-[#EBE5DC]">
          <span>{currentStove.icon}</span>
          <span className="truncate max-w-[85px] sm:max-w-none">{currentStove.label}</span>
        </div>

        <div className="flex items-center gap-1 bg-[#FAF6F0] px-2 py-1 rounded-lg border border-[#EBE5DC]">
          <span>{currentBudget.icon}</span>
          <span>{currentBudget.label.split(' ')[0]}</span>
        </div>

        <div className="flex items-center gap-1 bg-[#FAF6F0] px-2 py-1 rounded-lg border border-[#EBE5DC]">
          <Users className="w-3 h-3 text-[#D99B26]" />
          <span>{conditions.servings} pers</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenModal}
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8EFEB] text-[#C85A32] text-xs font-bold hover:bg-[#C85A32] hover:text-white active:scale-95 transition-all"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="hidden xs:inline">Mes conditions</span>
        <span className="xs:hidden">Ajuster</span>
      </button>
    </div>
  );
}
