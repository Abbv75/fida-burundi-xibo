import React from "react";
import { Box, Typography } from "@mui/joy";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChartPanelProps } from "../types";
import { useChartOptions } from "../hooks/useChartOptions";

export const ChartPanel: React.FC<ChartPanelProps> = ({ projets }) => {
    const chartOptions = useChartOptions(projets);

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
                flex : 1
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
                    Comparatif des Taux de Réalisation
                </Typography>
                <Typography
                    sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.75vw",
                    }}
                >
                    Visualisation graphique de l'avancement cumulé par sous-projet
                </Typography>
            </Box>

            <Box sx={{ flex: 1, position: "relative" }}>
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
