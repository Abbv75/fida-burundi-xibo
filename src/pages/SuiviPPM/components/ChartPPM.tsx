import React from "react";
import { Box, Typography } from "@mui/joy";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PPM_CATEGORIE_T } from "../../../types";
import { useChartOptionsPPM } from "../hooks/useChartOptionsPPM";

export interface ChartPPMProps {
    data: PPM_CATEGORIE_T[];
}

export const ChartPPM: React.FC<ChartPPMProps> = ({ data }) => {
    const chartOptions = useChartOptionsPPM(data);

    return (
        <Box
            sx={{
                height: "100%",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flex: 1
            }}
        >
            <Box
                sx={{
                    px: "1.5vw",
                    py: "1vw",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(0, 60, 25, 0.7)",
                }}
            >
                <Typography
                    sx={{
                        color: "#ffd700",
                        fontSize: "1.1vw",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Répartition par Catégorie (USD)
                </Typography>
                <Typography
                    sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.75vw",
                    }}
                >
                    Visualisation graphique du budget PPM
                </Typography>
            </Box>

            <Box sx={{ flex: 1, position: "relative", p: "1vw" }}>
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
        </Box>
    );
};
