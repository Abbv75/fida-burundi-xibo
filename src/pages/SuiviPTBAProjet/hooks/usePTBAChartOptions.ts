import { useMemo } from "react";
import { Options } from "highcharts";
import { PTBAMetric } from "../types";

export const usePTBAChartOptions = (dataMetrics: PTBAMetric[]) => {
    const options: Options = useMemo(() => ({
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
            lineColor: "rgba(255,255,255,0.1)",
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { text: "" },
            labels: { format: "{value}%", style: { color: "rgba(255,255,255,0.4)", fontSize: "0.8vw" } },
            gridLineColor: "rgba(255,255,255,0.05)",
        },
        legend: { enabled: false },
        tooltip: {
            useHTML: true,
            headerFormat: '<div style="font-size:1vw;font-weight:bold;color:#ffd700">{point.key}</div>',
            pointFormat: '<div style="font-size:0.9vw;color:#fff">{series.name}: <b>{point.y:.1f}%</b></div>',
            backgroundColor: "rgba(0,0,0,0.85)",
            borderWidth: 0,
            borderRadius: 8,
        },
        plotOptions: {
            column: {
                borderRadius: 8,
                dataLabels: {
                    enabled: true,
                    format: "{y:.0f}%",
                    style: { fontSize: "1vw", color: "#fff", textOutline: "none", fontWeight: "bold" }
                }
            }
        },
        series: [{
            type: "column",
            name: "Niveau",
            data: dataMetrics.map(d => ({ y: d.value, color: d.color })),
        }],
        credits: { enabled: false },
    }), [dataMetrics]);

    return options;
};
