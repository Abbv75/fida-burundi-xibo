import { useMemo } from "react";
import { Options } from "highcharts";
import { ProjetSimpleEntry } from "../../../service/suiviProjets";
import { PALETTE } from "../components/constants";

export const useChartOptions = (projets: ProjetSimpleEntry[]) => {
    const chartColors = useMemo(
        () => projets.map((_, i) => PALETTE[i % PALETTE.length]),
        [projets]
    );

    const chartOptions: Options = useMemo(
        () => ({
            chart: {
                type: "column",
                backgroundColor: "transparent",
                animation: false,
                spacingBottom: 20,
                spacingTop: 10,
                spacingLeft: 20,
                spacingRight: 20,
            },
            title: { text: "" },
            xAxis: {
                categories: projets.map((p) => p.sigle),
                labels: {
                    style: {
                        fontSize: "0.85vw",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: "500",
                    },
                },
                lineColor: "rgba(255,255,255,0.2)",
                tickColor: "rgba(255,255,255,0.2)",
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: "Pourcentage (%)",
                    style: { color: "rgba(255,255,255,0.5)", fontSize: "0.75vw" },
                },
                labels: {
                    style: { color: "rgba(255,255,255,0.4)", fontSize: "0.7vw" },
                    format: "{value}%",
                },
                gridLineColor: "rgba(255,255,255,0.05)",
            },
            legend: { enabled: false },
            tooltip: {
                useHTML: true,
                headerFormat:
                    '<div style="font-size:1vw;font-weight:bold;margin-bottom:4px;color:#ffd700">{point.key}</div>',
                pointFormat:
                    '<div style="font-size:0.85vw;color:#fff">Taux de réalisation : <b style="color:#ffd700">{point.y:.2f}%</b></div>',
                backgroundColor: "rgba(0,0,0,0.85)",
                borderWidth: 0,
                borderRadius: 10,
                shadow: false,
            },
            plotOptions: {
                series: {
                    animation: false,
                    dataLabels: {
                        enabled: true,
                        format: "{y:.1f}%",
                        style: {
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "0.9vw",
                            textOutline: "2px rgba(0,0,0,0.8)",
                        },
                    },
                },
                column: {
                    borderRadius: 8,
                    pointPadding: 0.15,
                    groupPadding: 0.1,
                    borderWidth: 0,
                    shadow: false,
                },
            },
            series: [
                {
                    type: "column",
                    name: "Taux de réalisation",
                    data: projets.map((p, i) => ({
                        y: p.taux_realisation,
                        color: chartColors[i],
                    })),
                },
            ],
            credits: { enabled: false },
        }),
        [projets, chartColors]
    );

    return chartOptions;
};
