import { create } from 'zustand';
import { PAGE_T, SUIVI_INDICATEUR_T, API_MOBILE_PPM_T, API_mobile_activite_T, ZUSTAND_T } from '../types';
import { PTBA_ZIBO_T } from '../service/ptba_zibo/get';
import { REALISATION_CUMULE_T } from '../service/realisationCumule/get';
import { SUIVI_PTBA_CONSOLIDE_T } from '../service/suiviPTBAConsolide/get';
import { SUIVI_PTBA_PROGRAMME_T } from '../service/suiviPTBAProgramme/get';

interface PageLooperState {
  set : ZUSTAND_T<PageLooperState>;
  pages: PAGE_T[];
  currentIndex: number;
  isPlaying: boolean;
  timeLeft: number;
  suiviIndicateurData: SUIVI_INDICATEUR_T[];
  suiviPTBAConsolide?: SUIVI_PTBA_CONSOLIDE_T;
  suiviPTBAProgramme?: SUIVI_PTBA_PROGRAMME_T;
  realisationCumuleData?: REALISATION_CUMULE_T;
  ptba_ziboData: PTBA_ZIBO_T[];
  API_mobile_ppmData?: API_MOBILE_PPM_T;
  API_mobile_activiteData: API_mobile_activite_T[];
  API_mobile_actionData: API_mobile_activite_T[];
  API_mobile_programmeData: API_mobile_activite_T[];

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
  suiviIndicateurData: [],
  ptba_ziboData: [],
  API_mobile_activiteData: [],
  API_mobile_actionData: [],
  API_mobile_programmeData: [],
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
    set({ currentIndex: (currentIndex + 1) % pages.length });
  },
}));
