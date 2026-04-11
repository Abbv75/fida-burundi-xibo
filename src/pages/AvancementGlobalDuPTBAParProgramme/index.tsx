import { usePageLooperStore } from "../../store/usePageLooperStore";
import { useEffect } from "react";
import Component from "./Component";
import { PAGE_T } from "../../types";

export default () => {
    const { API_mobile_programmeData, addPages } = usePageLooperStore();

    useEffect(() => {
        if (!API_mobile_programmeData || API_mobile_programmeData.length === 0) return;

        const chunkSize = 6; // nombre d'éléments par page
        const newPages: PAGE_T[] = [];

        for (let i = 0; i < API_mobile_programmeData.length; i += chunkSize) {
            const chunk = API_mobile_programmeData.slice(i, i + chunkSize);

            newPages.push({
                id: `AvancementGlobalDuPTBAParProgramme-${i / chunkSize + 1}`,
                component: <Component nbrPage={i / chunkSize + 1} API_mobile_programmeData={chunk} />,
                duration: 30000,
                preload: true,
            });
        }

        addPages(newPages, "AvancementGlobalDuPTBAParProgramme");
    }, [API_mobile_programmeData, addPages]);

    return null;
}
