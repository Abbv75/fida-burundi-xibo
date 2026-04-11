import { usePageLooperStore } from "../../store/usePageLooperStore";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Stack, Typography } from "@mui/joy";
import { green, red, amber, blue, purple, grey } from "@mui/material/colors";
import { useMemo } from "react";

export default function SuiviPTBAConsolide() {
    const { suiviPTBAConsolide } = usePageLooperStore();
    const graph = suiviPTBAConsolide?.donnees_graphique;

    const labels = graph?.series.map(s => s.name) ?? [];
    const valeurs = graph?.series.flatMap(s => s.data ?? []) ?? [];

    // Premium Burundi-inspired Palette for multiple bars
    const palette = [
        green[600],
        amber[600],
        red[600],
        blue[600],
        purple[600],
        "#546E7A", // Blue-grey
    ];

    const dataColoree = useMemo(() => valeurs.map((val, i) => ({
        y: val,
        color: palette[i % palette.length],
    })), [valeurs]);

    const options: Options = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
            spacingBottom: 40,
            spacingTop: 10,
        },
        title: { text: "" },
        xAxis: {
            categories: labels,
            labels: { 
                style: { 
                    fontSize: "1.2vw", 
                    color: '#fff', 
                    fontWeight: 'bold' 
                } 
            },
            lineColor: 'rgba(255,255,255,0.3)',
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { 
                text: "Taux d'exécution (%)",
                style: { color: '#fff', fontSize: '1vw' }
            },
            labels: { 
                style: { color: '#fff', fontSize: '1vw' },
                format: '{value}%'
            },
            gridLineColor: 'rgba(255,255,255,0.1)',
        },
        legend: { enabled: false },
        tooltip: {
            useHTML: true,
            headerFormat: '<div style="font-size: 1.2vw; font-weight: bold; margin-bottom: 5px">{point.key}</div>',
            pointFormat: '<div style="font-size: 1vw">Taux d\'exécution : <b>{point.y}%</b></div>',
            backgroundColor: 'rgba(0,0,0,0.8)',
            style: { color: '#fff' },
            borderWidth: 0,
            borderRadius: 10
        },
        plotOptions: {
            series: {
                animation: false,
                dataLabels: {
                    enabled: true,
                    format: "{y}%",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.1vw",
                        textOutline: "2px rgba(0,0,0,0.5)",
                    },
                },
            },
            column: {
                borderRadius: 5,
                pointPadding: 0.15,
                borderWidth: 0,
                shadow: false
            },
        },
        series: [
            {
                type: "column",
                name: "Pourcentage d'exécution",
                data: dataColoree as any,
            },
        ],
        credits: { enabled: false },
    };

    if (!suiviPTBAConsolide) {
        return (
            <Stack sx={{ height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: '#fff' }}>Données de suivi consolidé non disponibles</Typography>
            </Stack>
        );
    }

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
                        fontSize: "2.8vw",
                        fontWeight: "900",
                        color: "#fff",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                        mb: 0
                    }}
                >
                    Suivi du PTBA Consolidé
                </Typography>
                <Typography
                    level="h4"
                    sx={{
                        fontSize: "1.3vw",
                        fontWeight: "600",
                        color: "#ffd700",
                        textTransform: "uppercase",
                        letterSpacing: "0.1rem"
                    }}
                >
                    {suiviPTBAConsolide.version_ptba.libelle_complet}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, position: 'relative', width: '100%', mt: 2 }}>
                {/* Visual Glass Effect Container (Optional but nice) */}
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
}
