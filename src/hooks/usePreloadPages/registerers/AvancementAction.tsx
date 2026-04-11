import React from 'react';
import { PAGE_T, API_mobile_activite_T } from "../../../types";
import AvancementActionComponent from "../../../pages/AvancementGlobalDuPTBAParAction";

export const registerAvancementAction = (data: API_mobile_activite_T[]): PAGE_T[] => {
    const chunkSize = 11;
    const pages: PAGE_T[] = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        pages.push({
            id: `AvancementGlobalDuPTBAParAction-${i}`,
            component: <AvancementActionComponent nbrPage={i / chunkSize + 1} API_mobile_actionData={chunk} />,
            duration: 30000,
            preload: true
        });
    }
    return pages;
};
