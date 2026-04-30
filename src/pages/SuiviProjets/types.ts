import { ProjetSimpleEntry } from "../../service/suiviProjets";

export interface SuiviProjetsProps {}

export interface TablePanelProps {
    projets: ProjetSimpleEntry[];
}

export interface ChartPanelProps {
    projets: ProjetSimpleEntry[];
}
