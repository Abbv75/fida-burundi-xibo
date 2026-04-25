import { PAGE_T, SUIVI_ACTIVITE_RESPONSABLE_DATA_T, SUIVI_ACTIVITE_RESPONSABLE_ITEM_T } from "../../../types";
import SuiviActiviteResponsableComponent from "../../../pages/SuiviActiviteResponsable";

const CHUNK_SIZE = 5;

const chunkArray = (arr: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export const registerSuiviActiviteResponsableByProject = (items: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[], projectName: string, idPrefix: string): PAGE_T[] => {
    const pages: PAGE_T[] = [];
    if (items.length === 0) return pages;
    
    const chunks = chunkArray(items, CHUNK_SIZE);
    chunks.forEach((chunk, index) => {
        pages.push({
            id: `${idPrefix}-${index}`,
            component: <SuiviActiviteResponsableComponent 
                projectName={projectName} 
                data={chunk} 
                description="(PTBA 2025-2026 Révisé)"
                currentPage={index + 1}
                totalPages={chunks.length}
            />,
            duration: 35000,
            preload: true
        });
    });
    return pages;
};

export const registerSuiviActiviteResponsable = (data: SUIVI_ACTIVITE_RESPONSABLE_DATA_T): PAGE_T[] => {
    const pages: PAGE_T[] = [];

    pages.push(...registerSuiviActiviteResponsableByProject(data.piparvb, "PIPARV-B", "suivi-activite-responsable-piparvb"));
    pages.push(...registerSuiviActiviteResponsableByProject(data.proder, "PRODER", "suivi-activite-responsable-proder"));
    pages.push(...registerSuiviActiviteResponsableByProject(data.paifarb, "PAIFAR-B", "suivi-activite-responsable-paifarb"));

    return pages;
};
