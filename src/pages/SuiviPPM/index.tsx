import React from "react";
import { Box, Stack, Typography, Grid } from "@mui/joy";
import { TablePPM, ChartPPM } from "./components";
import { motion } from "framer-motion";
import { PPM_DATA_T } from "../../types";

export interface SuiviPPMProps {
    project: PPM_DATA_T;
}

export default function SuiviPPM({ project }: SuiviPPMProps) {
    if (!project || !project.data) {
        return null;
    }

    const totalMarches = project.data.totaux_globaux?.nombre_marches || 0;
    const totalUSD = project.data.totaux_globaux?.cout_total_usd_formatted || "0 USD";

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
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
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
                        Plan de Passation de Marchés - {project.projet.sigle_projet}
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
                        Total des Marchés: {totalMarches} | Coût Total: {totalUSD}
                    </Typography>
                </Box>
            </motion.div>

            {/* Content: Table (left) + Chart (right) */}
            <Grid
                container
                spacing={2}
                sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}
            >
                {/* Left: Table */}
                <Grid xs={12} md={7} sx={{ display: 'flex' }} flex={1}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        <TablePPM data={project.data.totaux_par_categorie} />
                    </motion.div>
                </Grid>

                {/* Right: Chart */}
                <Grid xs={12} md={5} sx={{ display: 'flex' }} flex={1} >
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        <ChartPPM data={project.data.totaux_par_categorie} />
                    </motion.div>
                </Grid>
            </Grid>
        </Stack>
    );
}
