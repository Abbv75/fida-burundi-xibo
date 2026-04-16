import React, { useMemo } from "react";
import { Stack, Typography, Grid, Box } from "@mui/joy";
import { PTBA_ZIBO_T } from "../../service/ptba_zibo";
import { PTBAChart } from "./components/PTBAChart";
import { PTBATable } from "./components/PTBATable";

interface SuiviPTBAProps {
    data: PTBA_ZIBO_T;
}

const SuiviPTBA: React.FC<SuiviPTBAProps> = ({ data }) => {
    const chartData = useMemo(() => {
        return data.activites
            .map((act) => ({
                name: act.intitule_activite_ptba,
                y: parseFloat(act.total_prop || "0"),
            }))
            .filter(d => d.y > 0);
    }, [data.activites]);

    const hasData = chartData.length > 0;

    return (
        <Stack 
            sx={{ 
                height: '100%', 
                px: '4vw', 
                py: '3vw', 
                gap: '2vw', 
                boxSizing: 'border-box',
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    level="h1"
                    sx={{
                        fontSize: "2.8vw",
                        fontWeight: 900,
                        color: "#fff",
                        textShadow: "2px 2px 15px rgba(0,0,0,0.6)",
                        lineHeight: 1.1,
                    }}
                >
                    Suivi Opérationnel <Typography sx={{ color: "#ffd700" }}>PTBA</Typography>
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1.2vw",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.6)",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        mt: 1
                    }}
                >
                    Responsable : {data.responsable}
                </Typography>
            </Box>

            {/* Content Grid */}
            <Grid container spacing={3} sx={{ flex: 1, minHeight: 0 }}>
                {/* Table Section */}
                <Grid xs={12} md={hasData ? 8 : 12} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <PTBATable activities={data.activites} />
                </Grid>

                {/* Chart Section */}
                {hasData && (
                    <Grid xs={12} md={4} sx={{ height: '100%' }}>
                        <PTBAChart data={chartData} />
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
};

export default SuiviPTBA;
