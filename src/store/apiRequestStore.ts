import { create } from 'zustand';
import { ZUSTAND_T, MISSION_SUPERVISION_T, SUIVI_ACTIVITE_RESPONSABLE_DATA_T, EXECUTION_COMPOSANTE_PROJET_T } from '../types';

import { SUIVI_PROJETS_T } from '../service/suiviProjets';
import { SUIVI_PTBA_CONSOLIDE_T } from '../service/suiviPTBAConsolide';

interface ApiRequestState {
  set : ZUSTAND_T<ApiRequestState>;
  suiviProjetsData: SUIVI_PROJETS_T;
  suiviPTBAConsolide: SUIVI_PTBA_CONSOLIDE_T;
  missionSupervisionData: MISSION_SUPERVISION_T[];
  suiviActiviteResponsableData: SUIVI_ACTIVITE_RESPONSABLE_DATA_T;
  executionComposanteData: EXECUTION_COMPOSANTE_PROJET_T[];
}

export const useApiRequestStore = create<ApiRequestState>((set) => ({
  set,
  suiviProjetsData: [],
  suiviPTBAConsolide: [],
  missionSupervisionData: [],
  suiviActiviteResponsableData: { piparvb: [], proder: [], paifarb: [] },
  executionComposanteData: [],
}));
