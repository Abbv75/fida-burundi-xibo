import { useState, useCallback, useRef } from 'react';
import { useLoadData } from '../useLoadData';
import { usePageLooperStore } from '../../store/usePageLooperStore';
import { useApiRequestStore } from '../../store/apiRequestStore';
import INITIAL_PAGES from '../../constant/initialPages';
import {
    registerSuiviIndicateurs,
    registerSuiviActiviteResponsable
} from './registerers';
import { PAGE_T } from '../../types';
import MissionSupervision from '../../pages/MissionSupervision';
import SuiviProjets from '../../pages/SuiviProjets';
import SuiviPTBAConsolide from '../../pages/SuiviPTBAConsolide';
import SuiviPTBAProgramme from '../../pages/SuiviPTBAProgramme';
import FeatureSlide from '../../pages/PageAccueil/FeatureSlide';
import { IMAGES } from '../../constant';

export const usePreloadPages = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [percentageLoadingValue, setPercentageLoadingValue] = useState(0);
    const hasPreloaded = useRef(false);

    const { loadData } = useLoadData();
    const { set: setLoopStore } = usePageLooperStore();

    const preload = useCallback(async () => {
        if (hasPreloaded.current) return;
        hasPreloaded.current = true;

        setIsLoading(true);
        setPercentageLoadingValue(0);

        try {
            setPercentageLoadingValue(5);
            await loadData();
            setPercentageLoadingValue(40);

            const data = useApiRequestStore.getState();

            // 1. Start with Home Sequence
            const allPages: PAGE_T[] = [ ...INITIAL_PAGES ];
            setPercentageLoadingValue(50);

            // 2. Indicators
            try {
                const indicateurPages = registerSuiviIndicateurs(data.suiviIndicateurData);
                allPages.push(...indicateurPages);
            } catch (e) { console.error("Failed to register Indicators:", e); }



            // INTERLEAVE: Impact Agri
            allPages.push({ 
                id: "impact-agri", 
                component: <FeatureSlide 
                    title="Impact PIPARV-B"
                    subtitle="Résilience et Nutrition au cœur du Plateau Central"
                    description="Le projet PIPARV-B cible une réduction de 30% de la malnutrition infantile chronique d'ici juin 2025 grâce à l'intensification rizicole."
                    image={IMAGES.burundi_agriculture_impact}
                    highlights={["-30% Malnutrition", "5 Provinces clés", "Achèvement 2025"]}
                />, 
                duration: 25000 
            });

            // 5. Statistics Dashboards
            if (data.suiviProjetsData.length > 0) {
                allPages.push({ id: "suivi-projets-1", component: <SuiviProjets />, duration: 35000 });
            }
            if (data.suiviPTBAProgramme) {
                allPages.push({ id: "suivi-ptba-programme-1", component: <SuiviPTBAProgramme />, duration: 30000 });
            }

            // INTERLEAVE: Impact Proder
            allPages.push({ 
                id: "impact-proder", 
                component: <FeatureSlide 
                    title="Objectifs PRODER"
                    subtitle="Propulser l'Entrepreneuriat des Jeunes"
                    description="Le programme PRODER vise à créer 39 000 emplois décents et soutenir 7 840 micro-entreprises rurales pour 85 000 bénéficiaires directs."
                    image={IMAGES.burundi_rural_entrepreneurship}
                    highlights={["39k Emplois", "85k Bénéficiaires", "7 840 Entreprises"]}
                />, 
                duration: 25000 
            });

            if (data.suiviPTBAConsolide.length > 0) {
                allPages.push({ id: "suivi-ptba-consolide-1", component: <SuiviPTBAConsolide />, duration: 40000 });
            }

            // INTERLEAVE: Impact Finance
            allPages.push({ 
                id: "impact-paifarb", 
                component: <FeatureSlide 
                    title="Inclusion PAIFAR-B"
                    subtitle="Digitalisation et Accès aux Services Financiers"
                    description="PAIFAR-B assure une couverture nationale dans 14 provinces, facilitant la transition vers le financement additionnel pour pérenniser l'autonomie rurale."
                    image={IMAGES.burundi_financial_inclusion}
                    highlights={["14 Provinces", "Services Digitaux", "Relais de Financement"]}
                />, 
                duration: 25000 
            });

            if (data.missionSupervisionData.length > 0) {
                allPages.push({ id: "mission-supervision-1", component: <MissionSupervision />, duration: 30000 });
            }

            setPercentageLoadingValue(95);

            // 6. Suivi Activité Responsables
            try {
                const responsablePages = registerSuiviActiviteResponsable(data.suiviActiviteResponsableData);
                allPages.push(...responsablePages);
            } catch (e) { console.error("Failed to register Responsable Tracking:", e); }

            setLoopStore({ pages: allPages, currentIndex: 0 });
            setPercentageLoadingValue(100);

            setTimeout(() => setIsLoading(false), 1200);

        } catch (error) {
            console.error("Critical preload system failure:", error);
            setLoopStore({ pages: INITIAL_PAGES, currentIndex: 0 });
            setPercentageLoadingValue(100);
            setTimeout(() => setIsLoading(false), 1000);
        }
    }, [loadData, setLoopStore]);

    return { preload, isLoading, percentageLoadingValue };
};
