import React, { useMemo } from "react";
import { Box } from "@mui/joy";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartSectionProps {
    dataMetrics: { name: string; value: number; color: string }[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({ dataMetrics }) => {
    const chartOptions: Highcharts.Options = useMemo(() => ({
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
        },
        title: { text: "" },
        xAxis: {
            categories: dataMetrics.map(d => d.name),
            labels: {
                style: { color: "rgba(255,255,255,0.7)", fontSize: "0.9vw", fontWeight: "bold" },
            },
            lineColor: "rgba(255,255,255,0.2)",
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { text: "Pourcentage (%)", style: { color: "rgba(255,255,255,0.5)" } },
            labels: { format: "{value}%", style: { color: "rgba(255,255,255,0.4)" } },
            gridLineColor: "rgba(255,255,255,0.05)",
        },
        legend: { enabled: false },
        tooltip: {
            useHTML: true,
            pointFormat: '<div style="font-size:0.9vw;color:#fff"><b>{point.y:.1f}%</b></div>',
            backgroundColor: "rgba(0,0,0,0.85)",
            borderWidth: 0,
            borderRadius: 8,
        },
        plotOptions: {
            column: {
                borderRadius: 5,
                colorByPoint: true,
                dataLabels: {
                    enabled: true,
                    format: "{y:.1f}%",
                    style: { fontSize: "1vw", color: "#fff", textOutline: "none" }
                }
            }
        },
        colors: dataMetrics.map(d => d.color),
        series: [{
            type: "column",
            name: "Taux",
            data: dataMetrics.map(d => d.value),
        }],
        credits: { enabled: false },
    }), [dataMetrics]);

    return (
        <Box sx={{ width: '100%', height: '100%', minHeight: '400px' }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </Box>
    );
};
