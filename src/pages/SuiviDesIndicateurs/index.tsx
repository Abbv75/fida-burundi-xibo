import { useEffect } from "react";
import { PAGE_T } from "../../types";
import Component from "./Component";
import { usePageLooperStore } from "../../store/usePageLooperStore";
import { useApiRequestStore } from "../../store/apiRequestStore";

export default () => {
    const { addPages } = usePageLooperStore();
    const { suiviIndicateurData } = useApiRequestStore();

    useEffect(() => {
        const newPages: PAGE_T[] = suiviIndicateurData.map(value => {
            return {
                id: `Suivit-inidicateurs-${value.code_ref_ind}`,
                component: <Component data={value} />,
                duration: 30000,
                preload: true
            }
        })

        addPages(newPages, 'SuiviDesIndicateurs');
    }, [suiviIndicateurData, addPages])

    return null
}
