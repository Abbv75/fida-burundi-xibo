import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_mobile_activite_T } from "../../types";

export const fetchAPI_mobile_activite = async (): Promise<API_mobile_activite_T[]> => {
    const { data } = await axios.get(`https://sise.fc-psfe.org/API_mobile_activite.php`);
    return data.data.activites as API_mobile_activite_T[];
};

export const useApiMobileActivite = () => {
    return useQuery({
        queryKey: ['api_mobile_activite'],
        queryFn: fetchAPI_mobile_activite,
        staleTime: 1000 * 60 * 30,
    });
};
