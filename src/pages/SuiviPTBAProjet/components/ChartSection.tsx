import React from "react";
import { Box } from "@mui/joy";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { usePTBAChartOptions } from "../hooks/usePTBAChartOptions";
import { ChartSectionProps } from "../types";

export const ChartSection: React.FC<ChartSectionProps> = ({ dataMetrics }) => {
    const chartOptions = usePTBAChartOptions(dataMetrics);

    return (
        <Box sx={{ width: '100%', height: '100%', minHeight: '400px' }}>
            <HighchartsReact 
                highcharts={Highcharts} 
                options={chartOptions} 
                containerProps={{ style: { height: '100%', width: '100%' } }} 
            />
        </Box>
    );
};
