import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../config/api";
import { SUIVI_ACTIVITE_RESPONSABLE_DATA_T, SUIVI_ACTIVITE_RESPONSABLE_ITEM_T } from "../../types";

const ENDPOINTS = [
  { key: "suivi-piparvb" as const, projet: "PIPARV-B" },
  { key: "suivi-proder" as const, projet: "PRODER" },
  { key: "suivi-paifarb" as const, projet: "PAIFAR-B" },
];

export const fetchSuiviActiviteResponsable = async (): Promise<SUIVI_ACTIVITE_RESPONSABLE_DATA_T> => {
  const results = await Promise.allSettled(
    ENDPOINTS.map(({ key, projet }) =>
      axios.get(getApiUrl(key, "/api/ptba_zibo.php")).then(({ data }) => ({ projet, data }))
    )
  );

  const data: SUIVI_ACTIVITE_RESPONSABLE_DATA_T = {
    piparvb: [],
    proder: [],
    paifarb: []
  };

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      const { projet, data: response } = result.value;
      const items = (response.data || []).map((item: any) => ({
        ...item,
        projet
      }));

      if (projet === "PIPARV-B") data.piparvb = items;
      else if (projet === "PRODER") data.proder = items;
      else if (projet === "PAIFAR-B") data.paifarb = items;
    }
  });

  return data;
};

export const useSuiviActiviteResponsable = () => {
  return useQuery({
    queryKey: ["suiviActiviteResponsable"],
    queryFn: fetchSuiviActiviteResponsable,
    staleTime: 1000 * 60 * 30,
  });
};
