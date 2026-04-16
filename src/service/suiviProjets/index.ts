import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../config/api";

// ─── API Response Types (Flexible) ────────────────────────────────────────────

export interface ProjetSimpleEntry {
  sigle: string;
  intitule: string;
  code: string;
  taux_realisation: number;
  taux_execution: number;
  cout_realise: number;
  cout_prevu: number;
  pays: string;
}

export type SUIVI_PROJETS_T = ProjetSimpleEntry[];

// ─── Endpoints ────────────────────────────────────────────────────────────────

const ENDPOINTS: { pays: string; url: string }[] = [
  { pays: "PIPARV-B", url: getApiUrl("piparvb", "/ApiConsolide/ApiProjets.php") },
  { pays: "PRODER",   url: getApiUrl("proder",   "/ApiConsolide/ApiProjets.php") },
  { pays: "PAIFARB",  url: getApiUrl("paifarb",  "/ApiConsolide/ApiProjets.php") },
];

// ─── Fetcher ──────────────────────────────────────────────────────────────────

export const fetchSuiviProjets = async (): Promise<SUIVI_PROJETS_T> => {
  console.log("Fetching SuiviProjets from endpoints...", ENDPOINTS.map(e => e.url));
  
  const results = await Promise.allSettled(
    ENDPOINTS.map(({ pays, url }) =>
      axios.get(url).then(({ data }) => ({ pays, data }))
    )
  );

  const entries: ProjetSimpleEntry[] = [];

  for (const result of results) {
    if (result.status !== "fulfilled") {
        console.error("Endpoint failed:", result.reason);
        continue;
    }
    
    const { pays, data: body } = result.value;
    
    // Dynamic extraction logic
    let rawList: any[] = [];
    if (Array.isArray(body.data)) {
        rawList = body.data;
    } else if (body.data && Array.isArray(body.data.projets)) {
        rawList = body.data.projets;
    } else if (Array.isArray(body)) {
        rawList = body;
    }

    for (const item of rawList) {
      const p = item.projet || item;
      const nestedData = item.data || {};
      const stats = nestedData.statistiques || item.statistiques || item.finances || {};
      const budget = stats.budget || {};

      // Mapping fields
      const sigle = p.sigle_projet || p.sigle || "N/A";
      const intitule = p.intitule_projet || p.intitule || "N/A";
      const code = p.id_projet || p.code || "N/A";
      
      // Values extraction
      const taux_realisation = budget.taux_realisation ?? stats.taux_realisation ?? p.taux_realisation ?? 0;
      const taux_execution = stats.taux_avancement_taches?.valeur ?? stats.taux_execution ?? p.taux_execution ?? 0;
      const cout_realise = budget.realise ?? stats.cout_realise ?? p.cout_realise ?? 0;
      const cout_prevu = budget.prevu ?? stats.cout_prevu ?? p.cout_prevu ?? 0;

      entries.push({
        sigle,
        intitule,
        code,
        taux_realisation: Number(taux_realisation) || 0,
        taux_execution: Number(taux_execution) || 0,
        cout_realise: Number(cout_realise) || 0,
        cout_prevu: Number(cout_prevu) || 0,
        pays,
      });
    }
  }

  return entries;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useSuiviProjets = () => {
  return useQuery({
    queryKey: ["suiviProjets"],
    queryFn: fetchSuiviProjets,
    staleTime: 1000 * 60 * 30,
  });
};
