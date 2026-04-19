import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../config/api";

// ─── API Response Types (Consolidated PTBA) ───────────────────────────────────

export interface PTBAConsolideProject {
  sigle: string;
  tasks: number;     // Avancement des tâches
  indicators: number; // Taux des indicateurs
  costs: number;     // Taux des coûts
  pays: string;
}

export type SUIVI_PTBA_CONSOLIDE_T = PTBAConsolideProject[];

// ─── Endpoints ────────────────────────────────────────────────────────────────

const ENDPOINTS: { pays: string; url: string }[] = [
  { pays: "PIPARV-B", url: getApiUrl("piparvb", "/ApiConsolide/API_Suivi_PTBA_consolide.php") },
  { pays: "PRODER",   url: getApiUrl("proder",   "/ApiConsolide/API_Suivi_PTBA_consolide.php") },
  { pays: "PAIFARB",  url: getApiUrl("paifarb",  "/ApiConsolide/API_Suivi_PTBA_consolide.php") },
];


// ─── Fetcher ──────────────────────────────────────────────────────────────────

export const fetchSuiviPTBAConsolide = async (): Promise<SUIVI_PTBA_CONSOLIDE_T> => {
  const results = await Promise.allSettled(
    ENDPOINTS.map(({ pays, url }) =>
      axios.get(url).then(({ data }) => ({ pays, data }))
    )
  );

  const projects: PTBAConsolideProject[] = [];

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    const { pays, data: body } = result.value;

    let rawList: any[] = [];
    if (Array.isArray(body.data)) {
      rawList = body.data;
    } else if (body.data && Array.isArray(body.data.projets)) {
      rawList = body.data.projets;
    }

    for (const item of rawList) {
      const p = item.projet || item;
      const graphique = item.data?.graphique || item.graphique || {};
      const series = graphique.series || [];

      // Find values in series array by name or index
      const findVal = (name: string) => series.find((s: any) => s.nom.includes(name))?.valeur ?? 0;
      
      const tasks = findVal("tâches");
      const indicators = findVal("indicateurs");
      const costs = findVal("coûts");

      projects.push({
        sigle: p.sigle_projet || p.sigle || "N/A",
        tasks: Number(tasks),
        indicators: Number(indicators),
        costs: Number(costs),
        pays,
      });
    }
  }

  return projects;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useSuiviPTBAConsolide = () => {
  return useQuery({
    queryKey: ["suiviPTBAConsolide"],
    queryFn: fetchSuiviPTBAConsolide,
    staleTime: 1000 * 60 * 30,
  });
};
