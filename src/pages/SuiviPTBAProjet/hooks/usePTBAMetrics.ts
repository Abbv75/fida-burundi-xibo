import { useMemo } from "react";
import { PTBAConsolideProject } from "../../../service/suiviPTBAConsolide";
import { PTBAMetric } from "../types";

export const usePTBAMetrics = (project: PTBAConsolideProject): PTBAMetric[] => {
    return useMemo(() => [
        { name: "Avancement des tâches", value: project.tasks, color: "#3498db" },
        { name: "Taux des indicateurs", value: project.indicators, color: "#2ecc71" },
        { name: "Taux des coûts", value: project.costs, color: "#e74c3c" },
    ], [project]);
};
