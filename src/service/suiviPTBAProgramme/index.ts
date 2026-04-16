import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface VersionPtba {
  id_version_ptba: number;
  annee_ptba: number;
  version_ptba: string;
  libelle_complet: string;
}

interface Composante {
  code: string;
  intitule: string;
  libelle_complet: string;
  nombre_activites: number;
  taux_avancement: number;
  taux_indicateurs: number;
  taux_couts: number;
}

interface SerieGraphique {
  name: string;
  data: number[];
}

interface DonneesGraphique {
  categories: string[];
  series: SerieGraphique[];
}

export interface SUIVI_PTBA_PROGRAMME_T {
  version_ptba: VersionPtba;
  composantes: Composante[];
  donnees_graphique: DonneesGraphique;
}

export const fetchSuiviPTBAProgramme = async (): Promise<SUIVI_PTBA_PROGRAMME_T> => {
    const { data } = await axios.get(`/api-sise/API_Suivi_PTBA_rogramme.php`);
    return data as SUIVI_PTBA_PROGRAMME_T;
};

export const useSuiviPTBAProgramme = () => {
    return useQuery({
        queryKey: ['suiviPTBAProgramme'],
        queryFn: fetchSuiviPTBAProgramme,
        staleTime: 1000 * 60 * 30,
    });
};
