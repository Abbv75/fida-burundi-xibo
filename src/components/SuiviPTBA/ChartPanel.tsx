import React, { useMemo } from "react";
import { Box } from "@mui/joy";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ProjetConsolideEntry } from "../../service/suiviPTBAConsolide";
import { PTBA_PALETTE } from "../../constant/ptbaColors";

interface ChartPanelProps {
    projets: ProjetConsolideEntry[];
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ projets }) => {
    const chartColors = useMemo(
        () => projets.map((_, i) => PTBA_PALETTE[i % PTBA_PALETTE.length]),
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
                spacingLeft: 0,
                spacingRight: 10,
            },
            title: { text: "" },
            xAxis: {
                categories: projets.map((p) => p.sigle),
                labels: {
                    style: {
                        fontSize: "1vw",
                        color: "#fff",
                        fontWeight: "bold",
                    },
                },
                lineColor: "rgba(255,255,255,0.2)",
                tickColor: "rgba(255,255,255,0.2)",
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: "Taux de réalisation (%)",
                    style: { color: "rgba(255,255,255,0.6)", fontSize: "0.85vw" },
                },
                labels: {
                    style: { color: "rgba(255,255,255,0.6)", fontSize: "0.8vw" },
                    format: "{value}%",
                },
                gridLineColor: "rgba(255,255,255,0.07)",
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
                            fontSize: "0.85vw",
                            textOutline: "2px rgba(0,0,0,0.7)",
                        },
                    },
                },
                column: {
                    borderRadius: 8,
                    pointPadding: 0.1,
                    groupPadding: 0.15,
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

    return (
        <Box
            sx={{
                height: "100%",
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                overflow: "hidden",
            }}
        >
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
    );
};
