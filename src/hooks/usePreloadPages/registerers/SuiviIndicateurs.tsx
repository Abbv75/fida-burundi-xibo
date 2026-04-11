import React from 'react';
import { PAGE_T, SUIVI_INDICATEUR_T } from "../../../types";
import SuiviDesIndicateursComponent from "../../../pages/SuiviDesIndicateurs";

export const registerSuiviIndicateurs = (data: SUIVI_INDICATEUR_T[]): PAGE_T[] => {
    return data.map(value => ({
        id: `Suivi-indicateurs-${value.code_ref_ind}`,
        component: <SuiviDesIndicateursComponent data={value} />,
        duration: 40000,
        preload: true
    }));
};
