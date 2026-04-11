import { useEffect } from "react";
import { PAGE_T } from "../../types";
import Component from "./Component";
import { usePageLooper } from "../../contexts/PageLooper";

export default () => {
    const { addPages, suiviIndicateurData } = usePageLooper();

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
    }, [suiviIndicateurData])

    return null
}
