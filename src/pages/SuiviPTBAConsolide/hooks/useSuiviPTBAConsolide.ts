import { useApiRequestStore } from "../../../store/apiRequestStore";

export const useSuiviPTBAConsolide = () => {
    const { suiviPTBAConsolide: data } = useApiRequestStore();

    return {
        data,
        hasData: data && data.length > 0,
        count: data?.length || 0
    };
};
