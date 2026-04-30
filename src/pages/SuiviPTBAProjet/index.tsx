import React from "react";
import { Stack, Typography, Box, Grid, Sheet } from "@mui/joy";
import { motion } from "framer-motion";
import { TableSection } from "./components/TableSection";
import { ChartSection } from "./components/ChartSection";
import { usePTBAMetrics } from "./hooks/usePTBAMetrics";
import { SuiviPTBAProjetProps } from "./types";

const SuiviPTBAProjet: React.FC<SuiviPTBAProjetProps> = ({ project }) => {
    const dataMetrics = usePTBAMetrics(project);

    return (
        <Stack sx={{ height: "100%", px: "3vw", py: "2vw", gap: "2vw", boxSizing: "border-box", overflow: "hidden" }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <Typography level="h1" sx={{ color: "#fff", fontSize: "2.5vw", fontWeight: 900 }}>
                        Suivi du PTBA Consolidé - {project.sigle !== "N/A" ? project.sigle : project.pays}
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
                            <TableSection dataMetrics={dataMetrics} />
                        </Grid>

                        <Grid xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0 }}>
                            <ChartSection dataMetrics={dataMetrics} />
                        </Grid>
                    </Grid>
                </Sheet>
            </motion.div>
        </Stack>
    );
};

export default SuiviPTBAProjet;
