import React from 'react';
import { PAGE_T, API_mobile_activite_T } from "../../../types";
import AvancementActiviteComponent from "../../../pages/AvancementGlobalDuPTBAParActivite";

export const registerAvancementActivite = (data: API_mobile_activite_T[]): PAGE_T[] => {
    const chunkSize = 11;
    const pages: PAGE_T[] = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        pages.push({
            id: `AvancementGlobalDuPTBAParActivite-${i}`,
            component: <AvancementActiviteComponent nbrPage={i / chunkSize + 1} API_mobile_activiteData={chunk} />,
            duration: 30000,
            preload: true
        });
    }
    return pages;
};
