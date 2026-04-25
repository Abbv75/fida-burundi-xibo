import { useApiRequestStore } from '../store/apiRequestStore';
import { useSuiviProjets } from '../service/suiviProjets';
import { useSuiviPTBAConsolide } from '../service/suiviPTBAConsolide';
import { useSuiviActiviteResponsable } from '../service/suiviActiviteResponsable';
import { useMissionSupervision } from '../service/mission_supervision';
import { useExecutionComposante } from '../service/executionComposante';
import { useIndicateurs } from '../service/indicateur';
import { useCallback } from 'react';

export const useLoadData = () => {
    const { set } = useApiRequestStore();

    // Instantiate all TanStack Query hooks at the top level
    const { refetch: refetchProjets } = useSuiviProjets();
    const { refetch: refetchPTBAConsolide } = useSuiviPTBAConsolide();
    const { refetch: refetchSuiviResponsable } = useSuiviActiviteResponsable();
    const { refetch: refetchMissionSupervision } = useMissionSupervision();
    const { refetch: refetchExecutionComposante } = useExecutionComposante();
    const { refetch: refetchIndicateurs } = useIndicateurs();

    const loadData = useCallback(async () => {
        // We trigger refetch for all and wait for the results
        const [
            { data: suiviProjets },
            { data: ptbaConsolide },
            { data: suiviResponsable },
            { data: missionSupervision },
            { data: executionComposante },
            { data: indicateurs }
        ] = await Promise.all([
            refetchProjets(),
            refetchPTBAConsolide(),
            refetchSuiviResponsable(),
            refetchMissionSupervision(),
            refetchExecutionComposante(),
            refetchIndicateurs()
        ]);

        set({
            suiviProjetsData: suiviProjets || [],
            suiviPTBAConsolide: ptbaConsolide || [],
            suiviActiviteResponsableData: suiviResponsable || { piparvb: [], proder: [], paifarb: [] },
            missionSupervisionData: missionSupervision || [],
            executionComposanteData: executionComposante || [],
            indicateurData: indicateurs || []
        });
    }, [
        set, 
        refetchProjets,
        refetchPTBAConsolide, 
        refetchSuiviResponsable,
        refetchMissionSupervision,
        refetchExecutionComposante,
        refetchIndicateurs
    ]);

    return { loadData };
};
