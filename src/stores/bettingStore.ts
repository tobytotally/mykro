import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BettingState, BetSelection } from '../shared/types';

export const useBettingStore = create<BettingState>()(
  persist(
    (set, get) => ({
      selections: [],
      stake: 10,
      mykroEnabled: false,
      mykroPercentage: 5,
      selectedCharityId: '',

      addSelection: (selection: BetSelection) => {
        const { selections } = get();
        const existingIndex = selections.findIndex(s => s.matchId === selection.matchId);
        
        if (existingIndex >= 0) {
          // Update existing selection
          const updated = [...selections];
          updated[existingIndex] = selection;
          set({ selections: updated });
        } else {
          // Add new selection
          set({ selections: [...selections, selection] });
        }
      },

      removeSelection: (matchId: string) => {
        const { selections } = get();
        set({ selections: selections.filter(s => s.matchId !== matchId) });
      },

      updateStake: (stake: number) => {
        set({ stake });
      },

      toggleMykro: () => {
        set({ mykroEnabled: !get().mykroEnabled });
      },

      updateMykroPercentage: (percentage: number) => {
        set({ mykroPercentage: percentage });
      },

      setSelectedCharity: (charityId: string) => {
        set({ selectedCharityId: charityId });
      },

      clearSlip: () => {
        set({ 
          selections: [], 
          stake: 10, 
          mykroEnabled: false,
          selectedCharityId: ''
        });
      },
    }),
    {
      name: 'mykro-betting-storage',
    }
  )
);
