import { Stack, Typography, Grid, Box } from "@mui/joy";
import TableCustom from "../../components/TableCustome";
import { PTBA_ZIBO_T } from "../../service/ptba_zibo/get";
import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import LinearProgressCustom from "../../components/LinearProgressCustom";

const colors = [
    "#4e79a7",
    "#f28e2b",
    "#59a14f",
    "#e15759",
    "#76b7b2",
    "#edc948",
    "#b07aa1",
    "#ff9da7",
    "#9c755f",
    "#bab0ab",
];

interface SuiviPTBAProps {
    data: PTBA_ZIBO_T;
}

const SuiviPTBA = ({ data }: SuiviPTBAProps) => {
    const transformedData = useMemo(() => {
        return data.activites.map((act) => {
            const total_prop_percent = parseFloat(act.total_prop || "0");
            const taux_decaissement_percent = parseFloat(act.taux_decaissement || "0");

            return {
                ...act,
                total_prop_percent,
                taux_decaissement_percent,
                total_prop: <LinearProgressCustom value={total_prop_percent} progressColor={colors[0]} />,
                taux_decaissement: <LinearProgressCustom value={taux_decaissement_percent} progressColor={colors[1]} />,
            };
        });
    }, [data]);

    const allZero = useMemo(
        () => transformedData.every((d) => d.total_prop_percent === 0),
        [transformedData]
    );

    const pieSeries = useMemo(
        () => (
            allZero
                ? []
                : transformedData.map((d, i) => ({
                    name: d.intitule_activite_ptba,
                    y: d.total_prop_percent,
                    color: colors[i % colors.length],
                }))
        ),
        [transformedData, allZero]
    )

    const pieOptions: Highcharts.Options = useMemo(() => ({
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            height: "70%",
            animation: false,
        },
        title: {
            text: "Répartition du taux de réalisation par activités",
            style: { fontSize: "1vw", fontWeight: "bold", color: "#fff" },
        },
        tooltip: {
            pointFormat: "<b>{point.percentage:.1f}%</b> ({point.y}%)",
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
                        fontSize: '0.8vw'
                    },
                },
            },
        },
        series: [
            {
                type: "pie",
                name: "Taux de réalisation",
                data: pieSeries,
            },
        ],
        credits: { enabled: false },
    }), [pieSeries]);

    return (
        <Stack sx={{ gap: 3, p: 3 }}>
            <Typography
                level="h4"
                fontSize={"2.5vw"}
                textColor={"white"}
                fontWeight={300}
                sx={{ textAlign: 'center' }}
            >
                Suivi des tâches de <Typography fontWeight={900} textColor={"#ffd700"} >{data.responsable}</Typography>
            </Typography>

            <Grid container spacing={2}>
                <Grid xs={12} md={allZero ? 12 : 8}>
                    <TableCustom
                        columns={[
                            { label: "Intitulé", key: "intitule_activite_ptba" },
                            { label: "Avancement", key: "total_prop" },
                            { label: "Taux de décaissement", key: "taux_decaissement" },
                        ]}
                        data={transformedData}
                    />
                </Grid>

                {!allZero && pieSeries?.length > 0 && (
                    <Grid xs={12} md={4}>
                         <Box 
                            sx={{ 
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(5px)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                p: 2
                            }} 
                        >
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={pieOptions}
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
};

export default SuiviPTBA;
