import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Stack, Typography } from "@mui/joy";
import Marquee from "react-fast-marquee";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useApiRequestStore } from "../../store/apiRequestStore";

export default function MissionSupervision() {
    const { missionSupervisionData } = useApiRequestStore();
    
    if (!missionSupervisionData || missionSupervisionData.length === 0) {
        return (
            <Stack sx={{ height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: '#fff', opacity: 0.7 }}>
                    Aucune donnée de supervision disponible.
                </Typography>
            </Stack>
        );
    }

    const categories = missionSupervisionData.map(item => item.projet.sigle);
    const fullNames = missionSupervisionData.map(item => item.projet.intitule);

    const executeData = missionSupervisionData.map(item => item.recommandations.statistiques.execute);
    const encoursData = missionSupervisionData.map(item => item.recommandations.statistiques.encours);
    const nonExecuteData = missionSupervisionData.map(item => item.recommandations.statistiques.non_execute);
    const nonEntameData = missionSupervisionData.map(item => item.recommandations.statistiques.non_entame);

    const formatMissionDate = (dateStr: string) => {
        try {
            return format(parseISO(dateStr), "d MMMM yyyy", { locale: fr });
        } catch (e) {
            return dateStr;
        }
    };

    const options: Options = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
            spacingBottom: 50, 
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
        },
        title: { text: "" },
        xAxis: {
            categories,
            labels: { 
                style: { 
                    fontSize: "1.4vw", 
                    fontWeight: '900',
                    color: '#FFD700', 
                    textOutline: '2px rgba(0,0,0,0.8)'
                },
                padding: 10
            },
            lineColor: 'rgba(255,255,255,0.3)',
        },
        yAxis: {
            min: 0,
            title: { 
                text: "Nombre de récommandations",
                style: { color: '#fff', fontSize: '1vw', fontWeight: 'bold' }
            },
            labels: {
                style: { color: '#fff', fontSize: '1vw' }
            },
            gridLineColor: 'rgba(255,255,255,0.15)',
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: '1.2vw',
                    textOutline: '2px rgba(0,0,0,0.5)'
                }
            }
        },
        legend: {
            enabled: true,
            itemStyle: { fontSize: "1.1vw", color: '#fff', fontWeight: 'bold' },
            itemHoverStyle: { color: '#FFD700' },
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            y: 35
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<div style="font-size: 1.2vw; font-weight: bold; color: {point.color}">{point.key}</div>',
            pointFormat: '<div style="font-size: 1vw">{series.name}: <b>{point.y}</b></div>',
            footerFormat: '<div style="font-size: 0.8vw; font-style: italic; margin-top: 5px; opacity: 0.8; max-width: 300px">{point.fullName}</div>'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 4,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    style: {
                        color: 'white',
                        textOutline: '2px rgba(0,0,0,0.5)',
                        fontSize: '1.1vw',
                        fontWeight: 'bold'
                    },
                    formatter: function() {
                        return this.y && this.y > 0 ? this.y : null;
                    }
                }
            },
            series: {
                keys: ['y', 'fullName'] 
            }
        },
        series: [
            {
                name: "Mise en œuvre",
                data: executeData.map((y, i) => [y, fullNames[i]]),
                color: '#4CAF50', 
                type: 'column'
            },
            {
                name: "Partiellement mise en œuvre",
                data: encoursData.map((y, i) => [y, fullNames[i]]),
                color: '#FF9800', 
                type: 'column'
            },
            {
                name: "Non exécuté",
                data: nonExecuteData.map((y, i) => [y, fullNames[i]]),
                color: '#F44336', 
                type: 'column'
            },
            {
                name: "Délai d'exécution non échu",
                data: nonEntameData.map((y, i) => [y, fullNames[i]]),
                color: '#9E9E9E', 
                type: 'column'
            }
        ],
        credits: { enabled: false },
    };

    return (
        <Stack 
            sx={{ 
                gap: '10vh', 
                px: 4, 
                py: 1, 
                height: '100%', 
                overflow: 'hidden', 
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                position: 'relative'
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 0.5 }}>
                <Typography
                    level="h1"
                    sx={{
                        fontSize: "2.5vw", 
                        fontWeight: "900",
                        color: "#fff",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
                        mb: 0
                    }}
                >
                    Missions de Supervision
                </Typography>
                <Typography
                    level="h4"
                    sx={{
                        fontSize: "1.1vw", 
                        fontWeight: "500",
                        color: "#ffd700",
                        textTransform: "uppercase",
                        letterSpacing: "0.15rem",
                        textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
                        mt: -0.5 
                    }}
                >
                    État des recommandations par projet
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    flex: 1, 
                    minHeight: 0,
                    position: 'relative',
                    width: '100%',
                }}
            >
                <HighchartsReact 
                    highcharts={Highcharts} 
                    options={options} 
                    containerProps={{ 
                        style: { 
                            height: "100%", 
                            width: "100%", 
                            position: 'absolute'
                        } 
                    }}
                />
            </Box>

            {/* Scrolling Mission Info */}
            <Box sx={{ bgcolor: 'rgba(0,0,0,0.3)', py: 0.5, mb: 1, borderRadius: '8px' }}>
                <Marquee gradient={false} speed={50}>
                    {missionSupervisionData.map((item, idx) => {
                        const m = item.derniere_mission;
                        if (!m) return null;
                        return (
                            <Typography 
                                key={idx} 
                                sx={{ 
                                    color: '#fff', 
                                    fontSize: '1vw', 
                                    mx: 6, 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <span style={{ color: '#FFD700', fontWeight: 'bold' }}>• {item.projet.sigle} :</span>
                                Dernière mission de {m.type} effectuée du {formatMissionDate(m.debut)} au {formatMissionDate(m.fin)}. 
                                <span style={{ fontStyle: 'italic', opacity: 0.9 }}> {m.objet}</span>
                            </Typography>
                        );
                    })}
                </Marquee>
            </Box>
        </Stack>
    );
}
