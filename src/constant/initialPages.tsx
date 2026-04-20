import Summary from "../pages/PageAccueil/Summary";
import Piparvb from "../pages/PageAccueil/Piparvb";
import Proder from "../pages/PageAccueil/Proder";
import Paifarb from "../pages/PageAccueil/Paifarb";

export default [
    {
        id: "accueil-summary",
        component: <Summary />,
        duration: 20000,
    },
    {
        id: "accueil-piparvb",
        component: <Piparvb />,
        duration: 25000,
    },
    {
        id: "accueil-paifarb",
        component: <Paifarb />,
        duration: 25000,
    },
    {
        id: "accueil-proder",
        component: <Proder />,
        duration: 25000,
    },
];