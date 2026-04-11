import { useEffect } from "react";
import { PAGE_T } from "../../types";
import Component from "./Component";
import { usePageLooper } from "../../contexts/PageLooper";
import { transformPPMDataForVersion } from "../../helpers/transformPPMDataForVersion";

export default () => {
    const { addPages, API_mobile_ppmData } = usePageLooper();

    useEffect(() => {
        if (!API_mobile_ppmData) return;

        //@ts-ignore
        const newPages: PAGE_T[] = API_mobile_ppmData.versions
            .map(version => {
                const viewData = transformPPMDataForVersion(
                    API_mobile_ppmData,
                    version.id_version
                );

                if (!viewData) return null; // On ignore cette version

                return {
                    id: `RecapitulatifMarchesParCategorie-${version.id_version}`,
                    component: <Component data={viewData} />,
                    duration: 30000,
                    preload: true
                };
            })
            .filter((p) => p !== null);

        addPages(newPages, "RecapitulatifMarchesParCategorie");
    }, [API_mobile_ppmData]);

    return null
}
