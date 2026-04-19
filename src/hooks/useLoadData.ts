import { useApiRequestStore } from '../store/apiRequestStore';
import { useSuiviIndicateurs } from '../service/suiviIndicateurs';
import { useSuiviProjets } from '../service/suiviProjets';
import { useSuiviPTBAConsolide } from '../service/suiviPTBAConsolide';
import { useSuiviPTBAProgramme } from '../service/suiviPTBAProgramme';
import { useRealisationCumule } from '../service/realisationCumule';
import { useSuiviActiviteResponsable } from '../service/suiviActiviteResponsable';


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
    const { refetch: refetchSuiviResponsable } = useSuiviActiviteResponsable();




    const { refetch: refetchMissionSupervision } = useMissionSupervision();

    const loadData = useCallback(async () => {
        // We trigger refetch for all and wait for the results
        const [
            { data: suiviIndicateur },
            { data: suiviProjets },
            { data: ptbaConsolide },
            { data: ptbaProgramme },
            { data: realisationCumule },
            { data: suiviResponsable },
            { data: missionSupervision }
        ] = await Promise.all([
            refetchIndicateurs(),
            refetchProjets(),
            refetchPTBAConsolide(),
            refetchPTBAProgramme(),
            refetchRealisation(),
            refetchSuiviResponsable(),
            refetchMissionSupervision()
        ]);

        set({
            suiviIndicateurData: suiviIndicateur || [],
            suiviProjetsData: suiviProjets || [],
            suiviPTBAConsolide: ptbaConsolide || [],
            suiviPTBAProgramme: ptbaProgramme || undefined,
            realisationCumuleData: realisationCumule || undefined,
            suiviActiviteResponsableData: suiviResponsable || { piparvb: [], proder: [], paifarb: [] },
            missionSupervisionData: missionSupervision || []
        });
    }, [
        set, 
        refetchIndicateurs, 
        refetchProjets,
        refetchPTBAConsolide, 
        refetchPTBAProgramme, 
        refetchRealisation, 
        refetchSuiviResponsable,
        refetchMissionSupervision
    ]);

    return { loadData };
};
