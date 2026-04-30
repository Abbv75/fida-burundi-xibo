import { PTBAConsolideProject } from "../../service/suiviPTBAConsolide";

export interface PTBAMetric {
    name: string;
    value: number;
    color: string;
}

export interface SuiviPTBAProjetProps {
    project: PTBAConsolideProject;
}

export interface TableSectionProps {
    dataMetrics: PTBAMetric[];
}

export interface ChartSectionProps {
    dataMetrics: PTBAMetric[];
}
