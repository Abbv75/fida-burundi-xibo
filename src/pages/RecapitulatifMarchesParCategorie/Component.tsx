import { Stack, Typography, Grid, Box } from "@mui/joy";
import { transformPPMDataForVersion_T } from "../../types";
import { green } from "@mui/material/colors";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import TableCustom from "../../components/TableCustome";
import formatToXOF from "../../helpers/formatToXOF";
import LinearProgressCustom from "../../components/LinearProgressCustom";

const colors = [
    "#4e79a7",
    "#f28e2b",
    "#e15759",
    "#76b7b2",
    "#59a14f",
    "#edc948",
    "#b07aa1",
    "#ff9da7",
    "#9c755f",
    "#bab0ab",
];

export default ({ data }: { data: transformPPMDataForVersion_T }) => {
    const pieSeries = data.donutData.map((d, i) => ({
        name: d.name,
        y: d.value,
        color: colors[i % colors.length],
    }));

    const pieOptions: Highcharts.Options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            height: "70%",
            animation: false,
        },
        title: {
            text: "Répartition du cout total par catégories",
            style: { fontSize: "1.2vw", fontWeight: "bold", color: "#fff" },
        },
        tooltip: {
            pointFormat: "<b>{point.percentage:.1f}%</b> ({point.y})",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "{point.name}: {point.percentage:.1f}%",
                    style: {
                        color: "white",
                        fontWeight: "bold",
                        textOutline: "2px rgba(0,0,0,0.5)",
                        fontSize: '0.9vw'
                    },
                },
            },
        },
        series: [
            {
                type: "pie",
                name: "Répartition du coût",
                data: pieSeries,
            },
        ],
        credits: { enabled: false },
    };

    return (
        <Stack sx={{ gap: 3, p: 4, height: '100%', boxSizing: 'border-box' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    level="h1"
                    sx={{
                        fontSize: "2.8vw",
                        fontWeight: "900",
                        color: "#fff",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                        mb: 1
                    }}
                >
                    Récapitulatif des Marchés par Catégorie
                </Typography>
                <Typography
                    level="h4"
                    sx={{
                        fontSize: "1.4vw",
                        fontWeight: "600",
                        color: "#ffd700",
                        textTransform: "uppercase",
                        letterSpacing: "0.1rem"
                    }}
                >
                    Version : {data.version.numero} ({data.version.annee})
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ flex: 1, minHeight: 0 }}>
                <Grid xs={12} md={8}>
                    <TableCustom
                        data={data.tableauCategories.map((d) => ({
                            ...d,
                            cout_total_usd: formatToXOF(d.cout_total_usd),
                            montant_realise: formatToXOF(d.montant_realise),
                            taux_realisation: <LinearProgressCustom value={d.taux_realisation} />,
                        }))}
                        columns={[
                            { key: "nom", label: "Nom" },
                            { key: "nombre_marches", label: "Marchés", center: true },
                            { key: "cout_total_usd", label: "Cout total" },
                            { key: "montant_realise", label: "Réalisé" },
                            { key: "taux_realisation", label: "Taux" },
                        ]}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <Box 
                        sx={{ 
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(5px)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            p: 2,
                            height: '100%'
                        }} 
                    >
                        <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
};