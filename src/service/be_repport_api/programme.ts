import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_mobile_activite_T } from "../../types";

export const fetchAPI_mobile_programme = async (): Promise<API_mobile_activite_T[]> => {
    const { data } = await axios.get(`/api-sise/API_mobile_programme.php`);
    return data.data.activites as API_mobile_activite_T[];
};

export const useApiMobileProgramme = () => {
    return useQuery({
        queryKey: ['api_mobile_programme'],
        queryFn: fetchAPI_mobile_programme,
        staleTime: 1000 * 60 * 30,
    });
};
