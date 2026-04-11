import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MISSION_SUPERVISION_T } from "../../types";

export interface ProjectMissionResponse {
    success: boolean;
    data: MISSION_SUPERVISION_T[];
}

const fetchMissionSupervision = async (): Promise<MISSION_SUPERVISION_T[]> => {
  // Use proxies in dev mode to avoid CORS issues
  const endpoints = import.meta.env.DEV ? [
    "/api-piparvb",
    "/api-proder",
    "/api-paifarb",
  ] : [
    import.meta.env.VITE_PIPARVB_URL,
    import.meta.env.VITE_PRODER_URL,
    import.meta.env.VITE_PAIFARB_URL,
  ];

  try {
    const results = await Promise.allSettled(
      endpoints.filter(Boolean).map(url => axios.get<ProjectMissionResponse>(`${url}/ApiConsolide/ApiMission.php`))
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
