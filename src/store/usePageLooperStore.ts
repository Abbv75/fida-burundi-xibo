import { create } from 'zustand';
import { PAGE_T, ZUSTAND_T } from '../types';

interface PageLooperState {
  set : ZUSTAND_T<PageLooperState>;
  pages: PAGE_T[];
  currentIndex: number;
  isPlaying: boolean;
  timeLeft: number;

  addPages: (newPages: PAGE_T[], filter: string | ((id: string) => boolean)) => void;
  removePages: (filter: string | ((id: string) => boolean)) => void;
  nextPage: () => void;
}

export const usePageLooperStore = create<PageLooperState>((set, get) => ({
  set,
  pages: [],
  currentIndex: 0,
  isPlaying: true,
  timeLeft: 0,
  addPages: (newPages, filter) => set((state) => ({
    pages: [
      ...state.pages.filter((p) => typeof filter === 'string' ? !p.id.startsWith(filter) : !filter(p.id)),
      ...newPages
    ]
  })),
  removePages: (filter) => set((state) => ({
    pages: state.pages.filter((p) => typeof filter === 'string' ? !p.id.startsWith(filter) : !filter(p.id))
  })),

  nextPage: () => {
    const { currentIndex, pages } = get();
    if (pages.length === 0) return;
    set({ currentIndex: (currentIndex + 1) % pages.length });
  },
}));
