import { useApiRequestStore } from "../../store/apiRequestStore";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Stack, Typography } from "@mui/joy";
import { green, red, amber } from "@mui/material/colors";
import TableCustom from "../../components/TableCustome";

export default function SuiviPTBAProgramme() {
    const { suiviPTBAProgramme } = useApiRequestStore();
    const graph = suiviPTBAProgramme?.donnees_graphique;

    const categories = graph?.categories ?? [];
    const series = graph?.series ?? [];

    // --- TableCustom ---
    const tableColumns = [{ label: "Indicateur", key: "type" }, ...categories.map(c => ({ label: c, key: c }))];

    const tableData = series.map(serie => {
        const row: Record<string, any> = { type: serie.name };
        serie.data.forEach((val, idx) => {
            row[categories[idx]] = val !== undefined ? `${val}%` : "0%";
        });
        return row;
    });

    // Integrated Burundi Color Palette
    const barColors = [green[600], amber[600], red[700]];

    const chartSeries = series.map((serie, i) => ({
        type: "column" as const,
        name: serie.name,
        data: serie.data ?? [],
        color: barColors[i % barColors.length],
        dataLabels: {
            enabled: true,
            style: {
                color: "white",
                fontWeight: "bold",
                textOutline: "2px rgba(0,0,0,0.5)",
                fontSize: "1vw",
            },
            formatter: function(this: any): string {
                return (this.y !== null && this.y !== undefined) ? Math.round(this.y) + "%" : "";
            }
        },
    }));

    const options: Options = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            animation: false,
            spacingBottom: 30,
            spacingTop: 10,
        },
        title: { text: "" },
        xAxis: {
            categories,
            labels: { 
                style: { 
                    fontSize: "1.2vw", 
                    color: '#fff', 
                    fontWeight: 'bold' 
                } 
            },
            lineColor: 'rgba(255,255,255,0.3)',
        },
        yAxis: {
            min: 0,
            max: 100,
            title: { 
                text: "Taux d'exécution (%)",
                style: { color: '#fff', fontSize: '1vw' }
            },
            labels: { 
                style: { color: '#fff', fontSize: '1vw' },
                format: '{value}%'
            },
            gridLineColor: 'rgba(255,255,255,0.1)',
        },
        legend: {
            enabled: true,
            itemStyle: { fontSize: "1.1vw", color: '#fff', fontWeight: 'bold' },
            itemHoverStyle: { color: '#FFD700' },
            align: 'center',
            verticalAlign: 'bottom',
        },
        tooltip: {
            valueSuffix: " %",
            headerFormat: '<div style="font-size: 1.2vw; font-weight: bold; margin-bottom: 5px">{point.key}</div>',
            pointFormat: '<div style="font-size: 1vw">{series.name} : <b>{point.y}%</b></div>',
            useHTML: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            style: { color: '#fff' },
            borderWidth: 0,
            borderRadius: 10
        },
        plotOptions: {
            series: { animation: false },
            column: {
                borderRadius: 5,
                pointPadding: 0.1,
                groupPadding: 0.15,
                borderWidth: 0,
                shadow: false
            },
        },
        series: chartSeries,
        credits: { enabled: false },
    };

    if (!suiviPTBAProgramme) {
        return (
            <Stack sx={{ height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: '#fff' }}>Données de suivi PTBA non disponibles</Typography>
            </Stack>
        );
    }

    return (
        <Stack 
            sx={{ 
                gap: 2, 
                px: 5, 
                py: 2, 
                height: '100%', 
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    level="h1"
                    sx={{
                        fontSize: "2.8vw",
                        fontWeight: "900",
                        color: "#fff",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                        mb: 0
                    }}
                >
                    Suivi du PTBA par programme
                </Typography>
                <Typography
                    level="h4"
                    sx={{
                        fontSize: "1.3vw",
                        fontWeight: "600",
                        color: "#ffd700",
                        textTransform: "uppercase",
                        letterSpacing: "0.1rem"
                    }}
                >
                    {suiviPTBAProgramme.version_ptba.libelle_complet}
                </Typography>
            </Box>

            <Stack sx={{ flex: 1, minHeight: 0, gap: 2 }}>
                {/* Table with glass design */}
                <Box
                    sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        p: 1,
                        '& thead *': {
                            fontSize: '1vw !important',
                            background: 'rgba(255, 255, 255, 0.1) !important',
                            color: '#ffd700 !important',
                        },
                        '& tbody *': {
                            fontSize: '0.9vw !important',
                            color: '#fff !important',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05) !important'
                        }
                    }}
                >
                    <TableCustom columns={tableColumns} data={tableData} />
                </Box>

                {/* Chart Box */}
                <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
                    <HighchartsReact 
                        highcharts={Highcharts} 
                        options={options} 
                        containerProps={{ 
                            style: { 
                                height: "100%", 
                                width: "100%", 
                                position: 'absolute' ,
                            } 
                        }}
                    />
                </Box>
            </Stack>
        </Stack>
    );
}
