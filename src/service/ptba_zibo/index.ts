import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../../config/api";


export interface ActivitePTBA {
  code_activite_ptba: string;
  couleur_retard: string;
  derniere_date_fin: string;
  derniere_date_reelle: string;
  id_ptba: string;
  intitule_activite_ptba: string;
  observation: string;
  responsable: string;
  statut_retard: string;
  taux_decaissement: string;
  total_prop: string;
}

export interface PTBA_ZIBO_T {
  activites: ActivitePTBA[],
  responsable: string
}

export const fetchPtbaZibo = async (): Promise<PTBA_ZIBO_T[]> => {
    const { data } = await axios.get(getApiUrl("suivi", "/api/ptba_zibo.php"));
    return data.responsables as PTBA_ZIBO_T[];
};

export const usePtbaZibo = () => {
    return useQuery({
        queryKey: ['ptba_zibo'],
        queryFn: fetchPtbaZibo,
        staleTime: 1000 * 60 * 30,
    });
};
