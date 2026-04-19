import { useApiRequestStore } from '../store/apiRequestStore';
import { useSuiviIndicateurs } from '../service/suiviIndicateurs';
import { useSuiviProjets } from '../service/suiviProjets';
import { useSuiviPTBAConsolide } from '../service/suiviPTBAConsolide';
import { useSuiviPTBAProgramme } from '../service/suiviPTBAProgramme';
import { useRealisationCumule } from '../service/realisationCumule';

import { useApiMobileAction, useApiMobileActivite, useApiMobileProgramme } from '../service/be_repport_api';
import { useMissionSupervision } from '../service/mission_supervision';
import { useCallback } from 'react';

export const useLoadData = () => {
    const { set } = useApiRequestStore();

    // Instantiate all TanStack Query hooks at the top level
    const { refetch: refetchIndicateurs } = useSuiviIndicateurs();
    const { refetch: refetchProjets } = useSuiviProjets();
    const { refetch: refetchPTBAConsolide } = useSuiviPTBAConsolide();
    const { refetch: refetchPTBAProgramme } = useSuiviPTBAProgramme();
    const { refetch: refetchRealisation } = useRealisationCumule();

    const { refetch: refetchActivite } = useApiMobileActivite();
    const { refetch: refetchAction } = useApiMobileAction();
    const { refetch: refetchProgramme } = useApiMobileProgramme();
    const { refetch: refetchMissionSupervision } = useMissionSupervision();

    const loadData = useCallback(async () => {
        // We trigger refetch for all and wait for the results
        const [
            { data: suiviIndicateur },
            { data: suiviProjets },
            { data: ptbaConsolide },
            { data: ptbaProgramme },
            { data: realisationCumule },

            { data: activite },
            { data: action },
            { data: programme },
            { data: missionSupervision }
        ] = await Promise.all([
            refetchIndicateurs(),
            refetchProjets(),
            refetchPTBAConsolide(),
            refetchPTBAProgramme(),
            refetchRealisation(),

            refetchActivite(),
            refetchAction(),
            refetchProgramme(),
            refetchMissionSupervision()
        ]);

        set({
            suiviIndicateurData: suiviIndicateur || [],
            suiviProjetsData: suiviProjets || [],
            suiviPTBAConsolide: ptbaConsolide || [],
            suiviPTBAProgramme: ptbaProgramme || undefined,
            realisationCumuleData: realisationCumule || undefined,

            API_mobile_activiteData: activite || [],
            API_mobile_actionData: action || [],
            API_mobile_programmeData: programme || [],
            missionSupervisionData: missionSupervision || []
        });
    }, [
        set, 
        refetchIndicateurs, 
        refetchProjets,
        refetchPTBAConsolide, 
        refetchPTBAProgramme, 
        refetchRealisation, 
        refetchActivite, 
        refetchAction, 
        refetchProgramme,
        refetchMissionSupervision
    ]);

    return { loadData };
};
