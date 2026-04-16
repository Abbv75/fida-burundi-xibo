import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../config/api";


interface IndicateurSuivi {
  id_ref_ind: number;
  code_ref_ind: string;
  intitule_ref_ind: string;
  referentiel_id: number;
  referentiel_nom: string;
  unite: string;
  cible_totale: number;
  total_realise: number;
  taux_realisation: number;
  couleur_taux: string; 
  date_dernier_suivi: string; 
  valeur_dernier_suivi: number;
  structure: string;
}

interface TotauxIndicateurs {
  total_cible: number;
  total_realise: number;
  taux_global: number;
}

export interface REALISATION_CUMULE_T {
  indicateurs: IndicateurSuivi[];
  totaux: TotauxIndicateurs;
  nombre_indicateurs: number;
}

export const fetchRealisationCumule = async (): Promise<REALISATION_CUMULE_T> => {
    const { data } = await axios.get(getApiUrl("sise", "/API_Realisations_cumulees.php"));
    return data as REALISATION_CUMULE_T;
};

export const useRealisationCumule = () => {
    return useQuery({
        queryKey: ['realisationCumule'],
        queryFn: fetchRealisationCumule,
        staleTime: 1000 * 60 * 30,
    });
};
