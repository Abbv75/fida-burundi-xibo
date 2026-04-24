import React from 'react';
import { PAGE_T, EXECUTION_COMPOSANTE_PROJET_T, EXECUTION_COMPOSANTE_ITEM_T } from "../../../types";
import ExecutionComposanteComponent from "../../../pages/ExecutionComposante";

const CHUNK_SIZE = 5;

const chunkArray = (arr: EXECUTION_COMPOSANTE_ITEM_T[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export const registerExecutionComposante = (data: EXECUTION_COMPOSANTE_PROJET_T[]): PAGE_T[] => {
    const pages: PAGE_T[] = [];

    data.forEach((projectData) => {
        const { projet, annee_reference, composantes } = projectData;
        if (composantes.length === 0) return;

        // Calculate totals for the project (to be displayed on the last page)
        const totals = composantes.reduce((acc, curr) => {
            acc.budget += curr.financier.budget_annuel;
            acc.depense += curr.financier.depense_annuelle;
            acc.totalAct += curr.physique.total_activites;
            acc.realisees += curr.physique.realisees;
            acc.tauxPhysSum += curr.physique.taux_avancement;
            acc.totalGlobal += curr.global.total_activites;
            acc.realiseesGlobal += curr.global.realisees;
            acc.tauxGlobalSum += curr.global.taux_avancement;
            acc.compCount += 1;
            return acc;
        }, {
            budget: 0,
            depense: 0,
            totalAct: 0,
            realisees: 0,
            tauxPhysSum: 0,
            totalGlobal: 0,
            realiseesGlobal: 0,
            tauxGlobalSum: 0,
            compCount: 0
        });

        const chunks = chunkArray(composantes, CHUNK_SIZE);
        chunks.forEach((chunk, index) => {
            const isLastPage = index === chunks.length - 1;
            pages.push({
                id: `execution-composante-${projet.sigle_projet}-${index}`,
                component: <ExecutionComposanteComponent 
                    project={projet}
                    anneeReference={annee_reference}
                    composantes={chunk}
                    isLastPage={isLastPage}
                    currentPage={index + 1}
                    totalPages={chunks.length}
                    totals={totals}
                />,
                duration: 30000,
                preload: true
            });
        });
    });

    return pages;
};
