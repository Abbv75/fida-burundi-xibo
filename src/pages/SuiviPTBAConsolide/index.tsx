import React, { useMemo } from "react";
import { Box, Stack, Typography, Grid } from "@mui/joy";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useApiRequestStore } from "../../store/apiRequestStore";
import { ProjetConsolideEntry } from "../../service/suiviPTBAConsolide";

// ─── Palette ──────────────────────────────────────────────────────────────────

const PALETTE = [
    "#4CAF91", // teal-green
    "#F5A623", // amber
    "#E05252", // red
    "#5C9BF5", // blue
    "#A87CF5", // purple
    "#F5D062", // gold
    "#4FD1C5", // cyan
    "#F5875C", // coral
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (val: number) => `${val.toFixed(2)}%`;

const progressBar = (val: number, color: string) => (
    <Box
        sx={{
            width: "100%",
            height: "0.7vw",
            borderRadius: "99px",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            position: "relative",
        }}
    >
        <Box
            sx={{
                width: `${Math.min(val, 100)}%`,
                height: "100%",
                borderRadius: "99px",
                background: color,
                boxShadow: `0 0 8px ${color}88`,
                transition: "width 1s ease",
            }}
        />
    </Box>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

interface TablePanelProps {
    projets: ProjetConsolideEntry[];
}

const TablePanel: React.FC<TablePanelProps> = ({ projets }) => (
    <Box
        sx={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.12)",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }}
    >
        {/* Header */}
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr",
                gap: "0.5vw",
                px: "1.2vw",
                py: "0.9vw",
                background: "rgba(0, 60, 25, 0.7)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            {["Projet", "Taux d'exécution", "Taux de réalisation"].map((h) => (
                <Typography
                    key={h}
                    sx={{
                        color: "#ffd700",
                        fontWeight: 900,
                        fontSize: "0.85vw",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                    }}
                >
                    {h}
                </Typography>
            ))}
        </Box>

        {/* Rows */}
        <Box sx={{ overflowY: "auto", flex: 1 }}>
            {projets.map((p, i) => {
                const color = PALETTE[i % PALETTE.length];
                return (
                    <Box
                        key={`${p.code}-${i}`}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1.4fr 1fr 1fr",
                            gap: "0.5vw",
                            px: "1.2vw",
                            py: "0.85vw",
                            alignItems: "center",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            transition: "background 0.2s",
                            "&:hover": {
                                background: "rgba(255,255,255,0.05)",
                            },
                        }}
                    >
                        {/* Sigle */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                            <Box
                                sx={{
                                    width: "0.5vw",
                                    height: "2.2vw",
                                    borderRadius: "3px",
                                    background: color,
                                    flexShrink: 0,
                                }}
                            />
                            <Box>
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 800,
                                        fontSize: "1vw",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {p.sigle}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.45)",
                                        fontSize: "0.65vw",
                                        lineHeight: 1.2,
                                        fontWeight: 400,
                                    }}
                                >
                                    {p.pays}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Taux d'exécution */}
                        <Box>
                            <Typography
                                sx={{
                                    color,
                                    fontWeight: 700,
                                    fontSize: "0.95vw",
                                    mb: "0.2vw",
                                }}
                            >
                                {fmt(p.taux_execution)}
                            </Typography>
                            {progressBar(p.taux_execution, color)}
                        </Box>

                        {/* Taux de réalisation */}
                        <Box>
                            <Typography
                                sx={{
                                    color: "#ffd700",
                                    fontWeight: 700,
                                    fontSize: "0.95vw",
                                    mb: "0.2vw",
                                }}
                            >
                                {fmt(p.taux_realisation)}
                            </Typography>
                            {progressBar(p.taux_realisation, "#ffd700")}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    </Box>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SuiviPTBAConsolide() {
    const { suiviPTBAConsolide: projets } = useApiRequestStore();

    const chartColors = useMemo(
        () => projets.map((_, i) => PALETTE[i % PALETTE.length]),
        [projets]
    );

    const chartOptions: Options = useMemo(
        () => ({
            chart: {
                type: "column",
                backgroundColor: "transparent",
                animation: false,
                spacingBottom: 20,
                spacingTop: 10,
                spacingLeft: 0,
                spacingRight: 10,
            },
            title: { text: "" },
            xAxis: {
                categories: projets.map((p) => p.sigle),
                labels: {
                    style: {
                        fontSize: "1vw",
                        color: "#fff",
                        fontWeight: "bold",
                    },
                },
                lineColor: "rgba(255,255,255,0.2)",
                tickColor: "rgba(255,255,255,0.2)",
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: "Taux de réalisation (%)",
                    style: { color: "rgba(255,255,255,0.6)", fontSize: "0.85vw" },
                },
                labels: {
                    style: { color: "rgba(255,255,255,0.6)", fontSize: "0.8vw" },
                    format: "{value}%",
                },
                gridLineColor: "rgba(255,255,255,0.07)",
            },
            legend: { enabled: false },
            tooltip: {
                useHTML: true,
                headerFormat:
                    '<div style="font-size:1vw;font-weight:bold;margin-bottom:4px;color:#ffd700">{point.key}</div>',
                pointFormat:
                    '<div style="font-size:0.85vw;color:#fff">Taux de réalisation : <b style="color:#ffd700">{point.y:.2f}%</b></div>',
                backgroundColor: "rgba(0,0,0,0.85)",
                borderWidth: 0,
                borderRadius: 10,
                shadow: false,
            },
            plotOptions: {
                series: {
                    animation: false,
                    dataLabels: {
                        enabled: true,
                        format: "{y:.1f}%",
                        style: {
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "0.85vw",
                            textOutline: "2px rgba(0,0,0,0.7)",
                        },
                    },
                },
                column: {
                    borderRadius: 8,
                    pointPadding: 0.1,
                    groupPadding: 0.15,
                    borderWidth: 0,
                    shadow: false,
                },
            },
            series: [
                {
                    type: "column",
                    name: "Taux de réalisation",
                    data: projets.map((p, i) => ({
                        y: p.taux_realisation,
                        color: chartColors[i],
                    })),
                },
            ],
            credits: { enabled: false },
        }),
        [projets, chartColors]
    );

    if (!projets || projets.length === 0) {
        return (
            <Stack
                sx={{
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography
                    level="h4"
                    sx={{ color: "rgba(255,255,255,0.5)", fontSize: "1.5vw" }}
                >
                    Aucune donnée consolidée disponible
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack
            sx={{
                height: "100%",
                px: "3vw",
                py: "2vw",
                gap: "1.2vw",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            {/* ── Title ── */}
            <Box sx={{ textAlign: "center", flexShrink: 0 }}>
                <Typography
                    level="h1"
                    sx={{
                        fontSize: "2.4vw",
                        fontWeight: 900,
                        color: "#fff",
                        textShadow: "2px 2px 15px rgba(0,0,0,0.6)",
                        lineHeight: 1.2,
                    }}
                >
                    Suivi du PTBA Consolidé
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1vw",
                        fontWeight: 600,
                        color: "#ffd700",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        opacity: 0.85,
                        mt: "0.3vw",
                    }}
                >
                    Taux de réalisation par projet · {projets.length} sous-projets
                </Typography>
            </Box>

            {/* ── Content: Table (left) + Chart (right) ── */}
            <Grid
                container
                spacing={2}
                sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}
            >
                {/* Left: Table */}
                <Grid xs={12} md={4} sx={{ height: "100%" }}>
                    <TablePanel projets={projets} />
                </Grid>

                {/* Right: Chart */}
                <Grid xs={12} md={8} sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            height: "100%",
                            background: "rgba(0,0,0,0.25)",
                            backdropFilter: "blur(12px)",
                            borderRadius: "20px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions}
                            containerProps={{
                                style: {
                                    height: "100%",
                                    width: "100%",
                                    position: "absolute",
                                    inset: 0,
                                },
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}
