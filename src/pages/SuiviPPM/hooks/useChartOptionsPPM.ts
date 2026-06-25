import { useMemo } from 'react';
import { PPM_CATEGORIE_T } from '../../../types';

const PALETTE = [
    "#FFB84C",
    "#F266AB",
    "#A459D1",
    "#2CD3E1",
    "#4D4C7D",
    "#00DFA2",
    "#F6FA70",
    "#FF0060",
];

export const useChartOptionsPPM = (data: PPM_CATEGORIE_T[]) => {
    return useMemo(() => {
        const activeData = data.filter(d => d.nombre_marches > 0 && d.cout_total_usd > 0);
        
        const chartData = activeData.map((d, i) => ({
            name: d.code_categorie,
            y: d.cout_total_usd,
            color: PALETTE[i % PALETTE.length]
        }));

        return {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent',
                style: {
                    fontFamily: "'Inter', sans-serif"
                }
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br/>Valeur: {point.y:,.0f} USD',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                        style: {
                            color: '#FFFFFF',
                            textOutline: 'none',
                            fontWeight: '600',
                            fontSize: '11px'
                        }
                    },
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Budget',
                colorByPoint: true,
                data: chartData
            }],
            credits: {
                enabled: false
            }
        };
    }, [data]);
};
