import React from 'react';
import { PAGE_T, INDICATEUR_PROJET_T, INDICATEUR_ITEM_T } from "../../../types";
import IndicateursComponent from "../../../pages/Indicateurs";

const CHUNK_SIZE = 10;

const chunkArray = (arr: INDICATEUR_ITEM_T[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export const registerIndicateurs = (data: INDICATEUR_PROJET_T[]): PAGE_T[] => {
    const pages: PAGE_T[] = [];

    data.forEach((projectData) => {
        const { projet, indicateurs } = projectData;
        if (indicateurs.length === 0) return;

        const chunks = chunkArray(indicateurs, CHUNK_SIZE);
        chunks.forEach((chunk, index) => {
            pages.push({
                id: `indicateurs-${projet.sigle}-${index}`,
                component: <IndicateursComponent 
                    project={projet}
                    indicateurs={chunk}
                    currentPage={index + 1}
                    totalPages={chunks.length}
                />,
                duration: 35000,
                preload: true
            });
        });
    });

    return pages;
};
