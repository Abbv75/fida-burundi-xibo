import React from 'react';
import { PAGE_T } from "../../../types";
import { PTBA_ZIBO_T } from "../../../service/ptba_zibo";
import SuiviPTBAComponent from "../../../pages/SuiviPTBA";

export const registerSuiviPTBA = (data: PTBA_ZIBO_T[]): PAGE_T[] => {
    return data.map((value, index) => ({
        id: `ptba-zibo-${index}`,
        component: <SuiviPTBAComponent data={value} />,
        duration: 50000,
        preload: true
    }));
};
