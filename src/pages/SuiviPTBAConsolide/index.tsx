import React from "react";
import { Box, Stack, Typography, Grid } from "@mui/joy";
import { useApiRequestStore } from "../../store/apiRequestStore";
import { TablePanel } from "../../components/SuiviPTBA/TablePanel";
import { ChartPanel } from "../../components/SuiviPTBA/ChartPanel";

export default function SuiviPTBAConsolide() {
    const { suiviPTBAConsolide: projets } = useApiRequestStore();

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
                    <ChartPanel projets={projets} />
                </Grid>
            </Grid>
        </Stack>
    );
}
