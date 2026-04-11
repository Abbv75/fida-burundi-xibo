import { useState, useCallback, useRef } from 'react';
import { useLoadData } from '../useLoadData';
import { usePageLooperStore } from '../../store/usePageLooperStore';
import { useApiRequestStore } from '../../store/apiRequestStore';
import INITIAL_PAGES from '../../constant/initialPages';
import { 
    registerSuiviIndicateurs, 
    registerSuiviPTBA, 
    registerAvancementActivite, 
    registerAvancementAction, 
    registerAvancementProgramme 
} from './registerers';
import { PAGE_T } from '../../types';

export const usePreloadPages = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [percentageLoadingValue, setPercentageLoadingValue] = useState(0);
    const hasPreloaded = useRef(false);
    
    const { loadData } = useLoadData();
    const { set: setLoopStore } = usePageLooperStore();

    const preload = useCallback(async () => {
        // Strict guard to prevent infinite re-entry or double execution
        if (hasPreloaded.current) return;
        hasPreloaded.current = true;

        setIsLoading(true);
        setPercentageLoadingValue(0);

        try {
            // --- STEP 1: Fetch Raw Data ---
            setPercentageLoadingValue(5);
            await loadData();
            setPercentageLoadingValue(40);

            const data = useApiRequestStore.getState();
            
            // --- STEP 2: Start with Static Base ---
            const allPages: PAGE_T[] = [...INITIAL_PAGES];
            setPercentageLoadingValue(50);

            // --- STEP 3: Granular & Isolated Dynamic Registration ---
            // Indicators
            try {
                const indicateurPages = registerSuiviIndicateurs(data.suiviIndicateurData);
                allPages.push(...indicateurPages);
            } catch (e) { console.error("Failed to register Indicators:", e); }
            setPercentageLoadingValue(65);

            // PTBA Tasks
            try {
                const ptbaPages = registerSuiviPTBA(data.ptba_ziboData);
                allPages.push(...ptbaPages);
            } catch (e) { console.error("Failed to register PTBA:", e); }
            setPercentageLoadingValue(80);

            // Global Progress
            try {
                const activitePages = registerAvancementActivite(data.API_mobile_activiteData);
                const actionPages = registerAvancementAction(data.API_mobile_actionData);
                const programmePages = registerAvancementProgramme(data.API_mobile_programmeData);
                allPages.push(...activitePages, ...actionPages, ...programmePages);
            } catch (e) { console.error("Failed to register Global Progress:", e); }
            setPercentageLoadingValue(95);

            // --- STEP 4: Finalize & Launch ---
            setLoopStore({ pages: allPages, currentIndex: 0 });
            setPercentageLoadingValue(100);
            
            // Artificial delay for smooth transition (Premium UX effect)
            setTimeout(() => {
                setIsLoading(false);
            }, 1200);

        } catch (error) {
            console.error("Critical preload system failure:", error);
            setLoopStore({ pages: INITIAL_PAGES, currentIndex: 0 });
            setPercentageLoadingValue(100);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [loadData, setLoopStore]);

    return { preload, isLoading, percentageLoadingValue };
};
