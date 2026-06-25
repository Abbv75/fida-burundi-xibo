import { useQuery } from '@tanstack/react-query';
import { PPM_DATA_T, PPM_API_RESPONSE_T } from '../types';

const ENDPOINTS = [
    'https://proder.fidaburundi.org/ApiConsolide/API_ppm.php',
    'https://paifarb.fidaburundi.org/ApiConsolide/API_ppm.php',
    'https://piparvb.fidaburundi.org/ApiConsolide/API_ppm.php'
];

export const useSuiviPPM = () => {
    return useQuery<PPM_DATA_T[]>({
        queryKey: ['suiviPPM'],
        queryFn: async () => {
            const results = await Promise.allSettled(
                ENDPOINTS.map(async (url) => {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${url}`);
                    }
                    const data: PPM_API_RESPONSE_T = await response.json();
                    if (!data.success) {
                        throw new Error(`API returned failure for ${url}`);
                    }
                    return data.data;
                })
            );

            const allData: PPM_DATA_T[] = [];
            
            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    // result.value is an array of PPM_DATA_T
                    result.value.forEach(item => {
                        allData.push(item);
                    });
                } else {
                    console.error('Failed to fetch PPM data:', result.reason);
                }
            });

            return allData;
        },
        refetchInterval: 5 * 60 * 1000, // Refresh every 5 mins
        enabled: false, // Managed by preloader manually
    });
};
