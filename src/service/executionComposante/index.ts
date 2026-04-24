import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../config/api";
import { EXECUTION_COMPOSANTE_PROJET_T } from "../../types";

const ENDPOINTS = [
  { key: "piparvb" as const, projet: "PIPARV-B" },
  { key: "proder" as const, projet: "PRODER" },
  { key: "paifarb" as const, projet: "PAIFAR-B" },
];

export const fetchExecutionComposante = async (): Promise<EXECUTION_COMPOSANTE_PROJET_T[]> => {
  const results = await Promise.allSettled(
    ENDPOINTS.map(({ key }) =>
      axios.get(getApiUrl(key, "/ApiConsolide/ApiExecution_composante.php")).then(({ data }) => data.data)
    )
  );

  const allData: EXECUTION_COMPOSANTE_PROJET_T[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      // result.value is an array of projects returned by one API call
      // In our case, each API call (per project) might return data for its own project
      if (Array.isArray(result.value)) {
        allData.push(...result.value);
      }
    }
  });

  return allData;
};

export const useExecutionComposante = () => {
  return useQuery({
    queryKey: ["executionComposante"],
    queryFn: fetchExecutionComposante,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
