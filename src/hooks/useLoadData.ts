import { useApiRequestStore } from '../store/apiRequestStore';
import { useSuiviProjets } from '../service/suiviProjets';
import { useSuiviPTBAConsolide } from '../service/suiviPTBAConsolide';
import { useSuiviActiviteResponsable } from '../service/suiviActiviteResponsable';
import { useMissionSupervision } from '../service/mission_supervision';
import { useExecutionComposante } from '../service/executionComposante';
import { useCallback } from 'react';

export const useLoadData = () => {
    const { set } = useApiRequestStore();

    // Instantiate all TanStack Query hooks at the top level
    const { refetch: refetchProjets } = useSuiviProjets();
    const { refetch: refetchPTBAConsolide } = useSuiviPTBAConsolide();
    const { refetch: refetchSuiviResponsable } = useSuiviActiviteResponsable();
    const { refetch: refetchMissionSupervision } = useMissionSupervision();
    const { refetch: refetchExecutionComposante } = useExecutionComposante();

    const loadData = useCallback(async () => {
        // We trigger refetch for all and wait for the results
        const [
            { data: suiviProjets },
            { data: ptbaConsolide },
            { data: suiviResponsable },
            { data: missionSupervision },
            { data: executionComposante }
        ] = await Promise.all([
            refetchProjets(),
            refetchPTBAConsolide(),
            refetchSuiviResponsable(),
            refetchMissionSupervision(),
            refetchExecutionComposante()
        ]);

        set({
            suiviProjetsData: suiviProjets || [],
            suiviPTBAConsolide: ptbaConsolide || [],
            suiviActiviteResponsableData: suiviResponsable || { piparvb: [], proder: [], paifarb: [] },
            missionSupervisionData: missionSupervision || [],
            executionComposanteData: executionComposante || []
        });
    }, [
        set, 
        refetchProjets,
        refetchPTBAConsolide, 
        refetchSuiviResponsable,
        refetchMissionSupervision,
        refetchExecutionComposante
    ]);

    return { loadData };
};
