import { EXECUTION_COMPOSANTE_ITEM_T, EXECUTION_COMPOSANTE_PROJET_T } from "../../types";

export interface ExecutionComposanteProps {
    project: EXECUTION_COMPOSANTE_PROJET_T['projet'];
    anneeReference: string;
    composantes: EXECUTION_COMPOSANTE_ITEM_T[];
    isLastPage?: boolean;
    currentPage?: number;
    totalPages?: number;
    totals?: {
        budget: number;
        depense: number;
        totalAct: number;
        realisees: number;
        tauxPhysSum: number;
        totalGlobal: number;
        realiseesGlobal: number;
        tauxGlobalSum: number;
        compCount: number;
    };
}

export interface ExecutionTableProps {
    composantes: EXECUTION_COMPOSANTE_ITEM_T[];
    today: string;
    isLastPage: boolean;
    totals?: any;
    avgTauxCons: number;
    avgTauxPhys: number;
    avgTauxGlobal: number;
}
