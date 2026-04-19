import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MISSION_SUPERVISION_T } from "../../types";
import { getApiUrl } from "../../config/api";

export interface ProjectMissionResponse {
    success: boolean;
    data: MISSION_SUPERVISION_T[];
}

const fetchMissionSupervision = async (): Promise<MISSION_SUPERVISION_T[]> => {
  const endpoints = [
    getApiUrl("piparvb", "/ApiConsolide/ApiMission.php"),
    getApiUrl("proder",   "/ApiConsolide/ApiMission.php"),
    getApiUrl("paifarb",  "/ApiConsolide/ApiMission.php"),
  ];

  try {
    const results = await Promise.allSettled(
      endpoints.map(url => axios.get<ProjectMissionResponse>(url))
    );

    const aggregatedData: MISSION_SUPERVISION_T[] = [];

    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value.data.success) {
        if (result.value.data.data.length > 0) {
            aggregatedData.push(result.value.data.data[0]);
        }
      }
    });

    return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated mission supervision data:", error);
    return [];
  }
};

export const useMissionSupervision = () => {
    return useQuery({
        queryKey: ["missionSupervision"],
        queryFn: fetchMissionSupervision,
        refetchInterval: 600000, // 10 minutes
    });
};
