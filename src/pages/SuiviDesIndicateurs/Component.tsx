import { Stack, Typography, Box } from "@mui/joy";
import { SUIVI_INDICATEUR_T } from "../../types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { green, amber } from "@mui/material/colors";

const Component = ({ data }: { data: SUIVI_INDICATEUR_T }) => {
    const categories = data.donnees_annees.map(d => d.annee);

    const options: Highcharts.Options = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
            spacingBottom: 40,
            spacingTop: 10,
        },

        title: { text: "" },

        xAxis: {
            categories: categories as any[],
            labels: { 
                style: { 
                    fontSize: "1.2vw", 
                    color: '#fff', 
                    fontWeight: 'bold' 
                } 
            },
            lineColor: 'rgba(255,255,255,0.3)',
            tickColor: 'rgba(255,255,255,0.3)',
        } as any,

        yAxis: {
            min: 0,
            title: { 
                text: "Valeurs",
                style: { color: '#fff', fontSize: '1vw' }
            },
            labels: { 
                style: { color: '#fff', fontSize: '1vw' }
            },
            gridLineColor: 'rgba(255,255,255,0.1)',
        },

        legend: {
            enabled: true,
            itemStyle: { fontSize: "1.1vw", color: '#fff', fontWeight: 'bold' },
            itemHoverStyle: { color: '#FFD700' },
            align: 'center',
            verticalAlign: 'bottom',
        },

        tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            style: { color: '#fff' },
            borderWidth: 0,
            borderRadius: 10,
            headerFormat: '<div style="font-size: 1.2vw; font-weight: bold; margin-bottom: 5px">{point.key}</div>',
        },

        plotOptions: {
            series: {
                animation: false,
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "1vw",
                        fontWeight: "bold",
                        color: "#fff",
                        textOutline: "2px rgba(0,0,0,0.5)",
                    },
                },
            },
            column: {
                borderRadius: 5,
                borderWidth: 0,
                pointPadding: 0.15,
                shadow: false
            },
        },

        series: [
            {
                type: "column",
                name: "Cible prévisionnelle",
                data: data.donnees_annees.map(d => d.cible),
                color: amber[700],
            },
            {
                type: "spline", 
                name: "Réalisations cumulées",
                data: data.donnees_annees.map(d => d.realisation),
                color: green[400],
                lineWidth: 4,
                marker: {
                    enabled: true,
                    radius: 6,
                    symbol: "circle",
                    lineWidth: 2,
                    lineColor: '#fff'
                },
            },
        ],

        credits: { enabled: false },
    };

    return (
        <Stack 
            sx={{ 
                gap: 2, 
                px: 5, 
                py: 2, 
                height: '100%', 
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    level="h1"
                    sx={{
                        fontSize: "2.5vw",
                        fontWeight: "900",
                        color: "#fff",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                        mb: 1
                    }}
                >
                    Suivi des Indicateurs
                </Typography>
                <Typography
                    level="h4"
                    sx={{
                        fontSize: "1.4vw",
                        fontWeight: "600",
                        color: "#ffd700",
                        textTransform: "uppercase",
                        letterSpacing: "0.1rem",
                        maxWidth: '90%',
                        mx: 'auto'
                    }}
                >
                    {data.intitule}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, position: 'relative', width: '100%', mt: 2 }}>
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(5px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }} 
                />
                
                <HighchartsReact 
                    highcharts={Highcharts} 
                    options={options} 
                    containerProps={{ 
                        style: { 
                            height: "100%", 
                            width: "100%", 
                            position: 'absolute',
                            zIndex: 1
                        } 
                    }}
                />
            </Box>
        </Stack>
    );
};

export default Component;