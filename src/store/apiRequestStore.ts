import { create } from 'zustand';
import { SUIVI_INDICATEUR_T, API_mobile_activite_T, ZUSTAND_T, MISSION_SUPERVISION_T } from '../types';

import { REALISATION_CUMULE_T } from '../service/realisationCumule';
import { SUIVI_PROJETS_T } from '../service/suiviProjets';
import { SUIVI_PTBA_CONSOLIDE_T } from '../service/suiviPTBAConsolide';
import { SUIVI_PTBA_PROGRAMME_T } from '../service/suiviPTBAProgramme';

interface ApiRequestState {
  set : ZUSTAND_T<ApiRequestState>;
  suiviIndicateurData: SUIVI_INDICATEUR_T[];
  suiviProjetsData: SUIVI_PROJETS_T;
  suiviPTBAConsolide: SUIVI_PTBA_CONSOLIDE_T;
  suiviPTBAProgramme?: SUIVI_PTBA_PROGRAMME_T;
  realisationCumuleData?: REALISATION_CUMULE_T;




  missionSupervisionData: MISSION_SUPERVISION_T[];
}

export const useApiRequestStore = create<ApiRequestState>((set) => ({
  set,
  suiviIndicateurData: [],
  suiviProjetsData: [],
  suiviPTBAConsolide: [],




  missionSupervisionData: [],
}));
