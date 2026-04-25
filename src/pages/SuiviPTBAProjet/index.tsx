import React from "react";
import { Stack, Typography, Box, Grid, Sheet } from "@mui/joy";
import { PTBAConsolideProject } from "../../service/suiviPTBAConsolide";
import { motion } from "framer-motion";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface SuiviPTBAProjetProps {
    project: PTBAConsolideProject;
}

const SuiviPTBAProjet: React.FC<SuiviPTBAProjetProps> = ({ project }) => {
    const dataMetrics = [
        { name: "Avancement des tâches", value: project.tasks, color: "#3498db" },
        { name: "Taux des indicateurs", value: project.indicators, color: "#2ecc71" },
        { name: "Taux des coûts", value: project.costs, color: "#e74c3c" },
    ];

    const chartOptions: Highcharts.Options = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
        },
        title: { text: "" },
        xAxis: {
            categories: dataMetrics.map(d => d.name),
            labels: {
                style: { color: "rgba(255,255,255,0.7)", fontSize: "0.9vw", fontWeight: "bold" },
            },
            lineColor: "rgba(255,255,255,0.2)",
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { text: "Pourcentage (%)", style: { color: "rgba(255,255,255,0.5)" } },
            labels: { format: "{value}%", style: { color: "rgba(255,255,255,0.4)" } },
            gridLineColor: "rgba(255,255,255,0.05)",
        },
        legend: { enabled: false },
        tooltip: {
            useHTML: true,
            pointFormat: '<div style="font-size:0.9vw;color:#fff"><b>{point.y:.1f}%</b></div>',
            backgroundColor: "rgba(0,0,0,0.85)",
            borderWidth: 0,
            borderRadius: 8,
        },
        plotOptions: {
            column: {
                borderRadius: 5,
                colorByPoint: true,
                dataLabels: {
                    enabled: true,
                    format: "{y:.1f}%",
                    style: { fontSize: "1vw", color: "#fff", textOutline: "none" }
                }
            }
        },
        colors: dataMetrics.map(d => d.color),
        series: [{
            type: "column",
            name: "Taux",
            data: dataMetrics.map(d => d.value),
        }],
        credits: { enabled: false },
    };

    return (
        <Stack sx={{ height: "100%", px: "3vw", py: "2vw", gap: "2vw", boxSizing: "border-box", overflow: "hidden" }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <Typography level="h1" sx={{ color: "#fff", fontSize: "2.5vw", fontWeight: 900 }}>
                        Suivi PTBA - {project.sigle !== "N/A" ? project.sigle : project.pays}
                    </Typography>
                    <Typography sx={{ color: "#ffd700", fontWeight: 600, fontSize: "1vw", textTransform: "uppercase", mt: 0.5 }}>
                        Performance par projet
                    </Typography>
                </Box>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: 1, display: "flex", minHeight: 0 }}
            >
                <Sheet
                    variant="soft"
                    sx={{
                        background: 'rgba(0,0,0,0.35)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 'xl',
                        p: 3,
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        boxSizing: 'border-box',
                        gap: 4
                    }}
                >
                    <Grid container spacing={6} sx={{ flex: 1, alignItems: 'center', minHeight: 0 }}>
                        <Grid xs={12} md={5}>
                            <Box sx={{
                                borderRadius: 'xl',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.03)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                            }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: 'rgba(0, 60, 25, 0.7)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <th style={{ textAlign: 'left', padding: '18px 20px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1.2vw', letterSpacing: '0.08em', fontWeight: '900' }}>Indicateur de Performance</th>
                                            <th style={{ textAlign: 'center', padding: '18px 20px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1.2vw', letterSpacing: '0.08em', fontWeight: '900' }}>Taux (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataMetrics.map((d, i) => (
                                            <tr key={i} style={{ borderBottom: i === dataMetrics.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                                                <td style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: d.color, boxShadow: `0 0 15px ${d.color}`, flexShrink: 0 }} />
                                                    <Typography sx={{ color: '#fff', fontSize: '1.4vw', fontWeight: 600, lineHeight: 1.2 }}>{d.name}</Typography>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                                                    <Typography sx={{ color: '#fff', fontSize: '1.6vw', fontWeight: '900', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{d.value.toFixed(1)}%</Typography>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        </Grid>

                        <Grid xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0 }}>
                            <Box sx={{ width: '100%', height: '100%', minHeight: '400px' }}>
                                <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{ style: { height: '100%', width: '100%' } }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Sheet>
            </motion.div>
        </Stack>
    );
};

export default SuiviPTBAProjet;
