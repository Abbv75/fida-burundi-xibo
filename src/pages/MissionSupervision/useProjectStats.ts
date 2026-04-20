import { Options } from "highcharts";
import { MISSION_SUPERVISION_T } from "../../types";

export const useProjectStats = (item: MISSION_SUPERVISION_T) => {
    const stats = item.recommandations.statistiques;
    
    const data = [
        { name: "Mise en œuvre", y: stats.execute, color: '#4CAF50', pct: stats.pourcentages.execute },
        { name: "Partiellement mise en œuvre", y: stats.encours, color: '#FF9800', pct: stats.pourcentages.encours },
        { name: "Non exécuté", y: stats.non_execute, color: '#F44336', pct: stats.pourcentages.non_execute },
        { name: "Délai non échu", y: stats.non_entame, color: '#9E9E9E', pct: stats.pourcentages.non_entame },
    ];

    const pieOptions: Options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            height: "450px",
            margin: [0, 0, 0, 0],
            animation: false,
        },
        title: { text: "" },
        plotOptions: {
            pie: {
                innerSize: '60%',
                borderWidth: 0,
                borderRadius: 15,
                dataLabels: {
                    enabled: true,
                    format: '{point.name} : {point.percentage:.1f}%',
                    style: { color: '#fff', fontSize: '1.2vw', textOutline: 'none', fontWeight: 'bold' },
                    distance: 25
                },
                showInLegend: false,
            }
        },
        series: [{
            name: "Récommandations",
            //@ts-ignore
            colorByPoint: true,
            data: data,
            type: 'pie'
        }],
        credits: { enabled: false },
    };

    return {
        data,
        pieOptions
    };
};
