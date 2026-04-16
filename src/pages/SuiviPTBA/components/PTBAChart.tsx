import React, { useMemo } from "react";
import { Box } from "@mui/joy";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { TASK_PALETTE } from "./constants";

interface PTBAChartProps {
    data: { name: string; y: number }[];
}

export const PTBAChart: React.FC<PTBAChartProps> = ({ data }) => {
    const options: Highcharts.Options = useMemo(() => ({
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            animation: false,
            spacing: [10, 10, 10, 10],
        },
        title: {
            text: "Répartition du taux de réalisation",
            style: { fontSize: "1vw", fontWeight: "900", color: "#ffd700", textTransform: 'uppercase' },
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<div style="font-size:0.9vw;font-weight:bold;margin-bottom:4px">{point.key}</div>',
            pointFormat: '<div style="font-size:0.8vw">Taux: <b>{point.y:.1f}%</b></div>',
            backgroundColor: "rgba(0,0,0,0.85)",
            style: { color: "#fff" },
            borderWidth: 0,
            borderRadius: 10
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                innerSize: '60%', // Donut style is more premium
                dataLabels: {
                    enabled: true,
                    format: "{point.name}: {point.percentage:.1f}%",
                    distance: 15,
                    style: {
                        color: "white",
                        fontWeight: "bold",
                        textOutline: "2px rgba(0,0,0,0.5)",
                        fontSize: '0.75vw'
                    },
                },
            },
        },
        series: [
            {
                type: "pie",
                name: "Taux de réalisation",
                data: data.map((d, i) => ({
                    ...d,
                    color: TASK_PALETTE[i % TASK_PALETTE.length]
                })),
            },
        ],
        credits: { enabled: false },
    }), [data]);

    return (
        <Box 
            sx={{ 
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                p: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} 
        >
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { width: '100%' } }}
            />
        </Box>
    );
};
