import React, { useMemo } from "react";
import { Box, Typography } from "@mui/joy";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface MetricChartProps {
    title: string;
    description: string;
    data: { name: string; y: number; color: string }[];
}

export const MetricChart: React.FC<MetricChartProps> = ({ title, description, data }) => {
    const options: Options = useMemo(() => ({
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
            spacing: [15, 10, 15, 10],
        },
        title: { text: "" },
        xAxis: {
            categories: data.map(d => d.name),
            labels: { style: { color: "rgba(255,255,255,0.7)", fontSize: "0.8vw" } },
            lineColor: "rgba(255,255,255,0.1)",
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { text: "" },
            labels: { format: "{value}%", style: { color: "rgba(255,255,255,0.4)", fontSize: "0.7vw" } },
            gridLineColor: "rgba(255,255,255,0.05)",
        },
        legend: { enabled: false },
        tooltip: {
            useHTML: true,
            headerFormat: '<div style="font-size:0.9vw;font-weight:bold;color:#ffd700">{point.key}</div>',
            pointFormat: '<div style="font-size:0.8vw;color:#fff">{series.name}: <b>{point.y:.1f}%</b></div>',
            backgroundColor: "rgba(0,0,0,0.85)",
            borderWidth: 0,
            borderRadius: 8,
        },
        plotOptions: {
            column: {
                borderRadius: 5,
                dataLabels: {
                    enabled: true,
                    format: "{y:.0f}%",
                    style: { fontSize: "0.75vw", color: "#fff", textOutline: "none" }
                }
            }
        },
        series: [{
            type: "column",
            name: "Avancement",
            data: data.map(d => ({ y: d.y, color: d.color })),
        }],
        credits: { enabled: false },
    }), [data]);

    return (
        <Box sx={{
            height: "100%",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>
            <Box sx={{ p: "1vw", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1vw" }}>{title}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7vw" }}>{description}</Typography>
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
