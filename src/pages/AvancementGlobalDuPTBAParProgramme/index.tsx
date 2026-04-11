import { useEffect } from "react";
import { PAGE_T } from "../../types";
import Component from "./Component";
import { usePageLooperStore } from "../../store/usePageLooperStore";
import { useApiRequestStore } from "../../store/apiRequestStore";

export default function AvancementGlobalDuPTBAParProgramme() {
    const { API_mobile_programmeData } = useApiRequestStore();
    const { addPages } = usePageLooperStore();

    useEffect(() => {
        if (!API_mobile_programmeData || API_mobile_programmeData.length === 0) return;

        const chunkSize = 10;
        const newPages: PAGE_T[] = [];

        for (let i = 0; i < API_mobile_programmeData.length; i += chunkSize) {
            const chunk = API_mobile_programmeData.slice(i, i + chunkSize);
            newPages.push({
                id: `AvancementGlobalDuPTBAParProgramme-${i}`,
                component: <Component nbrPage={i / chunkSize + 1} API_mobile_programmeData={chunk} />,
                duration: 30000,
                preload: true
            });
        }

        addPages(newPages, 'AvancementGlobalDuPTBAParProgramme');
    }, [API_mobile_programmeData, addPages]);

    return null;
}
