import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../config/api";
import { INDICATEUR_PROJET_T } from "../../types";

const ENDPOINTS = [
  { key: "piparvb" as const, projet: "PIPARV-B" },
  { key: "proder" as const, projet: "PRODER" },
  { key: "paifarb" as const, projet: "PAIFAR-B" },
];

export const fetchIndicateurs = async (): Promise<INDICATEUR_PROJET_T[]> => {
  const results = await Promise.allSettled(
    ENDPOINTS.map(({ key, projet }) =>
      axios.get(getApiUrl(key, `/ApiConsolide/ApiIndicateur.php?projet=${projet}`)).then(({ data }) => data.data)
    )
  );

  const allData: INDICATEUR_PROJET_T[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      allData.push(result.value);
    }
  });

  return allData;
};

export const useIndicateurs = () => {
  return useQuery({
    queryKey: ["indicateurs"],
    queryFn: fetchIndicateurs,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
