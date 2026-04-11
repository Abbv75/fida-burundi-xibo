import AvancementGlobalDuPTBAParAction from "../pages/AvancementGlobalDuPTBAParAction";
import AvancementGlobalDuPTBAParActivite from "../pages/AvancementGlobalDuPTBAParActivite";
import AvancementGlobalDuPTBAParProgramme from "../pages/AvancementGlobalDuPTBAParProgramme";
import Summary from "../pages/PageAccueil/slides/Summary";
import Piparvb from "../pages/PageAccueil/slides/Piparvb";
import Proder from "../pages/PageAccueil/slides/Proder";
import Paifarb from "../pages/PageAccueil/slides/Paifarb";
import RecapitulatifMarchesParCategorie from "../pages/RecapitulatifMarchesParCategorie";
import SuiviDesIndicateurs from "../pages/SuiviDesIndicateurs";
import SuiviPTBA from "../pages/SuiviPTBA";
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
        id: "SuiviDesIndicateurs",
        component: <SuiviDesIndicateurs />,
        duration: 1000,
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
    {
        id: "PTBA_ZIBO",
        component: <SuiviPTBA />,
        duration: 1000,
    },
    {
        id: "RecapitulatifMarchesParCategorie",
        component: <RecapitulatifMarchesParCategorie />,
        duration: 1000,
    },
    {
        id: "AvancementGlobalDuPTBAParActivite",
        component: <AvancementGlobalDuPTBAParActivite />,
        duration: 1000,
    },
    {
        id: "AvancementGlobalDuPTBAParAction",
        component: <AvancementGlobalDuPTBAParAction />,
        duration: 1000,
    },
    {
        id: "AvancementGlobalDuPTBAParProgramme",
        component: <AvancementGlobalDuPTBAParProgramme />,
        duration: 1000,
    },
];