import React from "react";
import { Box, Typography } from "@mui/joy";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMetricChartOptions } from "../hooks/useMetricChartOptions";

interface MetricChartProps {
    title: string;
    description: string;
    data: { name: string; y: number; color: string }[];
}

export const MetricChart: React.FC<MetricChartProps> = ({ title, description, data }) => {
    const options = useMetricChartOptions(data);

    return (
        <Box sx={{
            height: "100%",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>
            <Box sx={{ p: "1vw", background: "rgba(0, 60, 25, 0.7)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <Typography sx={{ color: "#ffd700", fontWeight: 900, fontSize: "1.1vw", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7vw" }}>{description}</Typography>
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
