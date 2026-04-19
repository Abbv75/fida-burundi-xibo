import { useState, useCallback, useRef } from 'react';
import { useLoadData } from '../useLoadData';
import { usePageLooperStore } from '../../store/usePageLooperStore';
import { useApiRequestStore } from '../../store/apiRequestStore';
import INITIAL_PAGES from '../../constant/initialPages';
import {
    registerSuiviActiviteResponsable
} from './registerers';
import { PAGE_T } from '../../types';
import MissionSupervision from '../../pages/MissionSupervision';
import SuiviProjets from '../../pages/SuiviProjets';
import SuiviPTBAConsolide from '../../pages/SuiviPTBAConsolide';
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

            const allPages: PAGE_T[] = [];

            // 0. Initial Data
            const homeSummary = INITIAL_PAGES.find(p => p.id === "accueil-summary");
            const homePiparvb = INITIAL_PAGES.find(p => p.id === "accueil-piparvb");
            const homeProder = INITIAL_PAGES.find(p => p.id === "accueil-proder");
            const homePaifarb = INITIAL_PAGES.find(p => p.id === "accueil-paifarb");

            const responsablePages = registerSuiviActiviteResponsable(data.suiviActiviteResponsableData);

            // 1. HOME PAGES
            if (homeSummary) allPages.push(homeSummary);
            if (homePiparvb) allPages.push(homePiparvb);
            if (homeProder) allPages.push(homeProder);
            if (homePaifarb) allPages.push(homePaifarb);

            // 2. MIXED STATS & INTERMEDIATE (Impact) PAGES
            
            // PIPARV-B Context
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

            if (data.suiviProjetsData.length > 0) {
                allPages.push({ id: "suivi-projets-1", component: <SuiviProjets />, duration: 35000 });
            }

            // PRODER Context
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

            // PAIFAR-B Context
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

            // 3. ALL SUIVI ACTIVITE RESPONSABLES (Continuous block at the end)
            allPages.push(...responsablePages);

            setPercentageLoadingValue(95);

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
