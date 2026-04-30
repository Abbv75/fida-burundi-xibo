import { PAGE_T, INDICATEUR_PROJET_T, INDICATEUR_ITEM_T } from "../../../types";
import IndicateursComponent from "../../../pages/Indicateurs";

const MAX_INDICATORS = 7;

export const registerIndicateurs = (data: INDICATEUR_PROJET_T[]): PAGE_T[] => {
    const pages: PAGE_T[] = [];

    data.forEach((projectData) => {
        const { projet, indicateurs } = projectData;
        if (indicateurs.length === 0) return;

        // Sort by percentage descending and take the top 5
        const sortedIndicateurs = [...indicateurs]
            .sort((a, b) => b.pourcentage - a.pourcentage)
            .slice(0, MAX_INDICATORS);

        pages.push({
            id: `indicateurs-${projet.sigle}`,
            component: <IndicateursComponent 
                project={projet}
                indicateurs={sortedIndicateurs}
            />,
            duration: 35000,
            preload: true
        });
    });

    return pages;
};
