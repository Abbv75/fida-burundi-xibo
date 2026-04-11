import { useEffect } from "react";
import { usePageLooper } from "../../contexts/PageLooper";
import Summary from "./slides/Summary";
import Piparvb from "./slides/Piparvb";
import Proder from "./slides/Proder";
import Paifarb from "./slides/Paifarb";

const PageAccueil = () => {
    const { addPages } = usePageLooper();

    useEffect(() => {
        addPages([
            {
                id: "accueil-1-summary",
                component: <Summary />,
                duration: 20000,
            },
            {
                id: "accueil-2-piparvb",
                component: <Piparvb />,
                duration: 25000,
            },
            {
                id: "accueil-3-proder",
                component: <Proder />,
                duration: 25000,
            },
            {
                id: "accueil-4-paifarb",
                component: <Paifarb />,
                duration: 25000,
            }
        ], "accueil-");
    }, [addPages]);

    return null;
};

export default PageAccueil;
