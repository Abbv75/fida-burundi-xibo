import React, { useMemo } from "react";
import { Box, Stack, Typography, Grid } from "@mui/joy";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useApiRequestStore } from "../../store/apiRequestStore";

// ─── Constants & Helpers ──────────────────────────────────────────────────────

const METRICS = [
    { key: "tasks", label: "Avancement des tâches", color: "#4CAF50" },
    { key: "indicators", label: "Taux des indicateurs", color: "#2196F3" },
    { key: "costs", label: "Taux des coûts", color: "#FF9800" },
];

const PALETTE = ["#4CAF91", "#F5A623", "#E05252", "#5C9BF5", "#A87CF5"];

// ─── Sub-component Chart ──────────────────────────────────────────────────────

interface MetricChartProps {
    title: string;
    description: string;
    data: { name: string; y: number; color: string }[];
}

const MetricChart: React.FC<MetricChartProps> = ({ title, description, data }) => {
    const options: Options = useMemo(() => ({
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
            spacing: [15, 10, 15, 10],
        },
        title: { text: "" },
        xAxis: {
            categories: data.map(d => d.name),
            labels: { style: { color: "rgba(255,255,255,0.7)", fontSize: "0.8vw" } },
            lineColor: "rgba(255,255,255,0.1)",
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { text: "" },
            labels: { format: "{value}%", style: { color: "rgba(255,255,255,0.4)", fontSize: "0.7vw" } },
            gridLineColor: "rgba(255,255,255,0.05)",
        },
        legend: { enabled: false },
        tooltip: {
            useHTML: true,
            headerFormat: '<div style="font-size:0.9vw;font-weight:bold;color:#ffd700">{point.key}</div>',
            pointFormat: '<div style="font-size:0.8vw;color:#fff">{series.name}: <b>{point.y:.1f}%</b></div>',
            backgroundColor: "rgba(0,0,0,0.85)",
            borderWidth: 0,
            borderRadius: 8,
        },
        plotOptions: {
            column: {
                borderRadius: 5,
                dataLabels: {
                    enabled: true,
                    format: "{y:.0f}%",
                    style: { fontSize: "0.75vw", color: "#fff", textOutline: "none" }
                }
            }
        },
        series: [{
            type: "column",
            name: "Avancement",
            data: data.map(d => ({ y: d.y, color: d.color })),
        }],
        credits: { enabled: false },
    }), [data]);

    return (
        <Box sx={{
            height: "100%",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>
            <Box sx={{ p: "1vw", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1vw" }}>{title}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7vw" }}>{description}</Typography>
            </Box>
            <Box sx={{ flex: 1, position: "relative" }}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{ style: { height: "100%", width: "100%", position: "absolute" } }}
                />
            </Box>
        </Box>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SuiviPTBAConsolide() {
    const { suiviPTBAConsolide: data } = useApiRequestStore();

    if (!data || data.length === 0) return null;

    return (
        <Stack sx={{ height: "100%", px: "3vw", py: "2vw", gap: "1.5vw", boxSizing: "border-box" }}>
            <Box sx={{ textAlign: "center" }}>
                <Typography level="h1" sx={{ color: "#fff", fontSize: "2.5vw", fontWeight: 900 }}>
                    Suivi PTBA Consolidé (Burundi)
                </Typography>
                <Typography sx={{ color: "#ffd700", fontWeight: 600, fontSize: "1vw", textTransform: "uppercase", mt: 0.5 }}>
                    Performance globale par piliers · PIPARV-B · PRODER · PAIFAR-B
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ flex: 1 }}>
                {METRICS.map((m) => (
                    <Grid key={m.key} xs={12} md={4} sx={{ height: "100%" }}>
                        <MetricChart
                            title={m.label}
                            description={`Comparaison du ${m.label.toLowerCase()} entre les sous-projets`}
                            data={data.map((p, i) => ({
                                name: p.sigle,
                                y: (p as any)[m.key],
                                color: PALETTE[i % PALETTE.length]
                            }))}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
