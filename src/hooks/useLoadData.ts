import { useApiRequestStore } from '../store/apiRequestStore';
import { getAllSuiviIndicateurs } from '../service/suiviIndicateurs';
import { getSuiviPTBAConsolide } from '../service/suiviPTBAConsolide';
import { getSuiviPTBAProgramme } from '../service/suiviPTBAProgramme';
import { getRealisationCumule } from '../service/realisationCumule';
import { getPtba_zibo } from '../service/ptba_zibo';
import { getAPI_mobile_action, getAPI_mobile_activite, getAPI_mobile_programme } from '../service/be_repport_api';
import { useCallback } from 'react';

export const useLoadData = () => {
    const { set } = useApiRequestStore();

    const loadData = useCallback(async () => {
        const [
            suiviIndicateur,
            ptbaConsolide,
            ptbaProgramme,
            realisationCumule,
            ptba_zibo,
            activite,
            action,
            programme
        ] = await Promise.all([
            getAllSuiviIndicateurs(),
            getSuiviPTBAConsolide(),
            getSuiviPTBAProgramme(),
            getRealisationCumule(),
            getPtba_zibo(),
            getAPI_mobile_activite(),
            getAPI_mobile_action(),
            getAPI_mobile_programme()
        ]);

        set({
            suiviIndicateurData: suiviIndicateur || [],
            suiviPTBAConsolide: ptbaConsolide || undefined,
            suiviPTBAProgramme: ptbaProgramme || undefined,
            realisationCumuleData: realisationCumule || undefined,
            ptba_ziboData: ptba_zibo || [],
            API_mobile_activiteData: activite || [],
            API_mobile_actionData: action || [],
            API_mobile_programmeData: programme || []
        });
    }, [set]);

    return { loadData };
};
