import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Stack, Typography, Sheet, Grid, Divider } from "@mui/joy";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useApiRequestStore } from "../../store/apiRequestStore";
import { MISSION_SUPERVISION_T } from "../../types";

const formatMissionDate = (dateStr: string) => {
    try {
        return format(parseISO(dateStr), "d MMMM yyyy", { locale: fr });
    } catch (e) {
        return dateStr;
    }
};

const ProjectSection = ({ item }: { item: MISSION_SUPERVISION_T }) => {
    const stats = item.recommandations.statistiques;
    const data = [
        { name: "Mise en œuvre", y: stats.execute, color: '#4CAF50', pct: stats.pourcentages.execute },
        { name: "Partiellement mise en œuvre", y: stats.encours, color: '#FF9800', pct: stats.pourcentages.encours },
        { name: "Non exécuté", y: stats.non_execute, color: '#F44336', pct: stats.pourcentages.non_execute },
        { name: "Délai non échu", y: stats.non_entame, color: '#9E9E9E', pct: stats.pourcentages.non_entame },
    ];

    const pieOptions: Options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            height: "250px",  // Augmenté pour une meilleure visibilité
            margin: [0, 0, 0, 0],
            animation: false,
        },
        title: { text: "" },
        plotOptions: {
            pie: {
                innerSize: '50%',
                borderWidth: 0,
                borderRadius: 10,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f}%',
                    style: { color: '#fff', fontSize: '0.9vw', textOutline: 'none', fontWeight: 'bold' },
                    distance: 10
                },
                showInLegend: false,
            }
        },
        series: [{
            name: "Récommandations",
            colorByPoint: true,
            data: data,
            type: 'pie'
        }],
        credits: { enabled: false },
    };

    return (
        <Sheet
            variant="soft"
            sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'xl',
                p: 1,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
                gap: 0.5
            }}
        >
            <Stack
                gap={2}
                direction={'row'}
                alignItems={'center'}
            >
                {/* Header: Uniquement le sigle du projet */}
                <Typography sx={{
                    color: '#FFD700',
                    fontSize: '2.2vw',
                    fontWeight: '900',
                    textAlign: 'center',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                    mb: 0.5,
                    textWrap: 'nowrap'
                }}>
                    {item.projet.sigle}
                </Typography>

                <Divider sx={{
                    height: '100%',
                    width: '2px',
                    // borderColor: "#FFD700",
                    background: "white",
                }} />

                <Typography sx={{
                    color: 'white',
                    fontSize: '0.9vw',
                    fontStyle: 'italic',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {item?.derniere_mission?.type} : {item?.derniere_mission?.objet}
                </Typography>
            </Stack>
            {/* Contenu vertical: Tableau (Haut) et Camembert (Bas) */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                gap: 1,
                mt: 3
            }}>

                {/* Tableau en haut */}
                <Box sx={{ 
                    borderRadius: 'lg', 
                    overflow: 'hidden', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.02)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                                <th style={{ textAlign: 'left', padding: '10px 14px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1vw', letterSpacing: '0.05em', fontWeight: '900' }}>État de mise en œuvre</th>
                                <th style={{ textAlign: 'center', padding: '10px 14px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1vw', letterSpacing: '0.05em', fontWeight: '900' }}>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i} style={{ borderBottom: i === data.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: d.color, boxShadow: `0 0 12px ${d.color}`, flexShrink: 0 }} />
                                        <Typography sx={{ color: '#fff', fontSize: '1.2vw', fontWeight: 500, lineHeight: 1.2 }}>{d.name}</Typography>
                                    </td>
                                    <td style={{ textAlign: 'center', padding: '8px 14px' }}>
                                        <Typography sx={{ color: '#fff', fontSize: '1.3vw', fontWeight: '900', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>{d.y}</Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>

                {/* Camembert en bas */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0 }}>
                    <Box sx={{ width: '100%', height: '250px' }}>
                        <HighchartsReact highcharts={Highcharts} options={pieOptions} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </Box>
                </Box>
            </Box>

            {/* Légende bas: Dernière mission et Date */}
            {item.derniere_mission && (
                <Typography sx={{
                    color: '#FFD700',
                    fontSize: '1vw',
                    fontWeight: '900',
                    textAlign : 'end'
                }}>
                    Dernière date: {formatMissionDate(item.derniere_mission.fin)}
                </Typography>
            )}
        </Sheet>
    );
};

export default function MissionSupervision() {
    const { missionSupervisionData } = useApiRequestStore();

    if (!missionSupervisionData || missionSupervisionData.length === 0) {
        return (
            <Stack sx={{ height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: '#fff', opacity: 0.7 }}>
                    Aucune donnée de supervision disponible.
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack
            sx={{
                gap: 2,
                px: 3,
                py: 2,
                height: '100vh',
                overflow: 'hidden',
                boxSizing: 'border-box',
                position: 'relative',
                background: 'transparent'
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 1 }}>
                <Typography
                    level="h1"
                    sx={{
                        fontSize: "2.8vw",
                        fontWeight: "900",
                        color: "#fff",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
                        mb: 0
                    }}
                >
                    Missions de Supervision
                </Typography>
                <Typography
                    level="h4"
                    sx={{
                        fontSize: "1.3vw",
                        fontWeight: "500",
                        color: "#ffd700",
                        textTransform: "uppercase",
                        letterSpacing: "0.15rem",
                        textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
                        mt: -0.5
                    }}
                >
                    État des recommandations par projet
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ flex: 1, minHeight: 0 }}>
                {missionSupervisionData.map((item, idx) => (
                    <Grid key={idx} xs={4} sx={{ height: '100%' }}>
                        <ProjectSection item={item} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

