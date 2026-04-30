import { useApiRequestStore } from "../../../store/apiRequestStore";

export const useSuiviProjets = () => {
    const { suiviProjetsData: projets } = useApiRequestStore();

    return {
        projets,
        hasProjets: projets && projets.length > 0,
        count: projets?.length || 0
    };
};
