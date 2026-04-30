import { SUIVI_ACTIVITE_RESPONSABLE_ITEM_T } from "../../types";

export interface SuiviActiviteResponsableProps {
    data: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[];
    projectName: string;
    description?: string;
    currentPage?: number;
    totalPages?: number;
}

export interface ResponsableTableProps {
    data: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[];
}
