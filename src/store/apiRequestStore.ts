import { create } from 'zustand';
import { SUIVI_INDICATEUR_T, API_mobile_activite_T, ZUSTAND_T, MISSION_SUPERVISION_T } from '../types';
import { PTBA_ZIBO_T } from '../service/ptba_zibo';
import { REALISATION_CUMULE_T } from '../service/realisationCumule';
import { SUIVI_PTBA_CONSOLIDE_T } from '../service/suiviPTBAConsolide';
import { SUIVI_PTBA_PROGRAMME_T } from '../service/suiviPTBAProgramme';

interface ApiRequestState {
  set : ZUSTAND_T<ApiRequestState>;
  suiviIndicateurData: SUIVI_INDICATEUR_T[];
  suiviPTBAConsolide: SUIVI_PTBA_CONSOLIDE_T;
  suiviPTBAProgramme?: SUIVI_PTBA_PROGRAMME_T;
  realisationCumuleData?: REALISATION_CUMULE_T;
  ptba_ziboData: PTBA_ZIBO_T[];
  API_mobile_activiteData: API_mobile_activite_T[];
  API_mobile_actionData: API_mobile_activite_T[];
  API_mobile_programmeData: API_mobile_activite_T[];
  missionSupervisionData: MISSION_SUPERVISION_T[];
}

export const useApiRequestStore = create<ApiRequestState>((set) => ({
  set,
  suiviIndicateurData: [],
  suiviPTBAConsolide: [],
  ptba_ziboData: [],
  API_mobile_activiteData: [],
  API_mobile_actionData: [],
  API_mobile_programmeData: [],
  missionSupervisionData: [],
}));
