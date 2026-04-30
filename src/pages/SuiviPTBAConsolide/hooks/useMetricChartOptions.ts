import { useMemo } from "react";
import { Options } from "highcharts";

interface ChartDataPoint {
    name: string;
    y: number;
    color: string;
}

export const useMetricChartOptions = (data: ChartDataPoint[]) => {
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

    return options;
};
