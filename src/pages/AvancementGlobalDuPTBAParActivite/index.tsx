import { useEffect } from "react";
import { PAGE_T } from "../../types";
import Component from "./Component";
import { usePageLooperStore } from "../../store/usePageLooperStore";
import { useApiRequestStore } from "../../store/apiRequestStore";

export default function AvancementGlobalDuPTBAParActivite() {
    const { API_mobile_activiteData } = useApiRequestStore();
    const { addPages } = usePageLooperStore();

    useEffect(() => {
        if (!API_mobile_activiteData || API_mobile_activiteData.length === 0) return;

        const chunkSize = 11;
        const newPages: PAGE_T[] = [];

        for (let i = 0; i < API_mobile_activiteData.length; i += chunkSize) {
            const chunk = API_mobile_activiteData.slice(i, i + chunkSize);
            newPages.push({
                id: `AvancementGlobalDuPTBAParActivite-${i}`,
                component: <Component nbrPage={i / chunkSize + 1} API_mobile_activiteData={chunk} />,
                duration: 30000,
                preload: true
            });
        }

        addPages(newPages, 'AvancementGlobalDuPTBAParActivite');
    }, [API_mobile_activiteData, addPages]);

    return null;
}
