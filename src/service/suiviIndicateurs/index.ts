import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SUIVI_INDICATEUR_T } from "../../types";

export const fetchSuiviIndicateurs = async (): Promise<SUIVI_INDICATEUR_T[]> => {
    const { data } = await axios.get(`https://sise.fc-psfe.org/API_Suivi_Indicateurs.php`);
    return data as SUIVI_INDICATEUR_T[];
};

export const useSuiviIndicateurs = () => {
    return useQuery({
        queryKey: ['suiviIndicateurs'],
        queryFn: fetchSuiviIndicateurs,
        staleTime: 1000 * 60 * 30,
    });
};