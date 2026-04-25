import { INDICATEUR_ITEM_T, INDICATEUR_PROJET_T } from "../../types";

export interface IndicateursProps {
    project: INDICATEUR_PROJET_T['projet'];
    indicateurs: INDICATEUR_ITEM_T[];
    currentPage?: number;
    totalPages?: number;
}

export interface IndicateurTableProps {
    indicateurs: INDICATEUR_ITEM_T[];
}
