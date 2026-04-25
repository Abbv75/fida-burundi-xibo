import { Box, Stack, Typography, Grid } from "@mui/joy";
import { MetricChart } from "./components/MetricChart";
import { METRICS, PTBA_PALETTE } from "./components/constants";
import { motion } from "framer-motion";
import { useSuiviPTBAConsolide } from "./hooks/useSuiviPTBAConsolide";

export default function SuiviPTBAConsolide() {
    const { data, hasData } = useSuiviPTBAConsolide();

    if (!hasData) return null;

    return (
        <Stack sx={{ height: "100%", px: "3vw", py: "2vw", gap: "1.5vw", boxSizing: "border-box" }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <Typography level="h1" sx={{ color: "#fff", fontSize: "2.5vw", fontWeight: 900 }}>
                        Suivi PTBA Consolidé (Burundi)
                    </Typography>
                    <Typography sx={{ color: "#ffd700", fontWeight: 600, fontSize: "1vw", textTransform: "uppercase", mt: 0.5 }}>
                        Performance globale par piliers · PIPARV-B · PAIFAR-B · PRODER
                    </Typography>
                </Box>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: 1, minHeight: 0, maxHeight: "80vh", alignSelf: "center", width: "100%", display: "flex" }}
            >
                <Grid container spacing={3} sx={{ flex: 1 }}>
                    {METRICS.map((m, index) => (
                        <Grid key={m.key} xs={12} md={4}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                                style={{ height: '100%' }}
                            >
                                <MetricChart
                                    title={m.label}
                                    description={`Comparaison du ${m.label.toLowerCase()} entre les sous-projets`}
                                    data={data.map((p, i) => ({
                                        name: p.sigle,
                                        y: (p as any)[m.key],
                                        color: PTBA_PALETTE[i % PTBA_PALETTE.length]
                                    }))}
                                />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Stack>
    );
}
