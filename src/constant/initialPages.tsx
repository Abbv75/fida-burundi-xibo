import Summary from "../pages/PageAccueil/Summary";
import Piparvb from "../pages/PageAccueil/Piparvb";
import Proder from "../pages/PageAccueil/Proder";
import Paifarb from "../pages/PageAccueil/Paifarb";
import MissionSupervision from "../pages/MissionSupervision";
import SuiviPTBAConsolide from "../pages/SuiviPTBAConsolide";
import SuiviPTBAProgramme from "../pages/SuiviPTBAProgramme";

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
        id: "accueil-proder",
        component: <Proder />,
        duration: 25000,
    },
    {
        id: "accueil-paifarb",
        component: <Paifarb />,
        duration: 25000,
    },
    {
        id: "MissionSupervision",
        component: <MissionSupervision />,
        duration: 30000,
    },
    {
        id: "SuiviPTBAProgramme",
        component: <SuiviPTBAProgramme />,
        duration: 30000,
    },
    {
        id: "SuivitPTBAConsolide",
        component: <SuiviPTBAConsolide />,
        duration: 30000,
    },
];