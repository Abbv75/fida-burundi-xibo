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
      axios.get(getApiUrl(key, `/ApiConsolide/API_Realisations_cumulees.php?projet=${projet}`)).then(({ data }) => data.data)
    )
  );

  const allData: INDICATEUR_PROJET_T[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      const responseData = result.value;
      if (responseData.projets && Array.isArray(responseData.projets)) {
        responseData.projets.forEach((proj: any) => {
          const mappedProject: INDICATEUR_PROJET_T = {
            projet: {
              sigle: proj.projet.sigle_projet,
            },
            indicateurs: proj.indicateurs.map((ind: any) => ({
              code: ind.code,
              intitule: ind.intitule,
              total_prevu: ind.cible || 0,
              total_realise: ind.realise || 0,
              pourcentage: ind.taux_realisation || 0,
            })),
          };
          allData.push(mappedProject);
        });
      }
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
