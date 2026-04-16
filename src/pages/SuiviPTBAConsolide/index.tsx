import { Box, Stack, Typography, Grid } from "@mui/joy";
import { useApiRequestStore } from "../../store/apiRequestStore";
import { MetricChart } from "./components/MetricChart";
import { METRICS, PTBA_PALETTE } from "./components/constants";

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
                    <Grid key={m.key} xs={12} md={4}>
                        <MetricChart
                            title={m.label}
                            description={`Comparaison du ${m.label.toLowerCase()} entre les sous-projets`}
                            data={data.map((p, i) => ({
                                name: p.sigle,
                                y: (p as any)[m.key],
                                color: PTBA_PALETTE[i % PTBA_PALETTE.length]
                            }))}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
