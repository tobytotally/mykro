import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CharityState, Charity } from '../shared/types';

export const useCharityStore = create<CharityState>()(
  persist(
    (set, get) => ({
      charities: [],
      selectedCharities: [],
      featuredCharity: null,

      setCharities: (charities: Charity[]) => {
        set({ charities });
      },

      selectCharity: (charityId: string) => {
        const { selectedCharities } = get();
        if (!selectedCharities.includes(charityId)) {
          set({ selectedCharities: [...selectedCharities, charityId] });
        }
      },

      deselectCharity: (charityId: string) => {
        const { selectedCharities } = get();
        set({ selectedCharities: selectedCharities.filter(id => id !== charityId) });
      },

      setFeaturedCharity: (charity: Charity) => {
        set({ featuredCharity: charity });
      },
    }),
    {
      name: 'mykro-charity-storage',
    }
  )
);
