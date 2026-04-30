import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Stack, Typography, Sheet, Grid } from "@mui/joy";
import { formatMissionDate } from "../../helpers";
import { MISSION_SUPERVISION_T } from "../../types";

import { useProjectStats } from "./hooks/useProjectStats";

export const ProjectSection = ({ item }: { item: MISSION_SUPERVISION_T }) => {
    const { data, pieOptions } = useProjectStats(item);

    return (
        <Sheet
            variant="soft"
            sx={{
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(12px)',
                borderRadius: 'xl',
                p: 2,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
                gap: 2
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ mb: 2 }}
            >
                <Stack direction="row" gap={3} alignItems="center">
                    <Typography sx={{
                        color: '#FFD700',
                        fontSize: '3vw',
                        fontWeight: '900',
                        textAlign: 'center',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
                        textWrap: 'nowrap'
                    }}>
                        {item.projet.sigle}
                    </Typography>

                    <Box sx={{ height: '4vw', width: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />

                    <Typography sx={{
                        color: 'white',
                        fontSize: '1.4vw',
                        fontStyle: 'italic',
                        fontWeight: '500',
                        opacity: 0.9
                    }}>
                        {item?.derniere_mission?.type} : {item?.derniere_mission?.objet}
                    </Typography>
                </Stack>

                <Stack sx={{
                    bgcolor: 'rgba(255, 215, 0, 0.12)',
                    p: '12px 24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    alignItems: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                    <Typography sx={{ color: '#FFD700', fontSize: '2vw', fontWeight: '900', lineHeight: 1 }}>
                        {item.recommandations.total}
                    </Typography>
                    <Typography sx={{ color: 'white', fontSize: '0.8vw', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em' }}>
                        Recommandations
                    </Typography>
                </Stack>
            </Stack>

            <Grid container spacing={6} sx={{ flex: 1, alignItems: 'center', minHeight: 0 }}>
                <Grid xs={5}>
                    <Box sx={{
                        borderRadius: 'xl',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.03)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'rgba(0, 60, 25, 0.7)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ textAlign: 'left', padding: '16px 20px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1.2vw', letterSpacing: '0.08em', fontWeight: '900' }}>État de mise en œuvre</th>
                                    <th style={{ textAlign: 'center', padding: '16px 20px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1.2vw', letterSpacing: '0.08em', fontWeight: '900' }}>Nombre</th>
                                    <th style={{ textAlign: 'center', padding: '16px 20px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1.2vw', letterSpacing: '0.08em', fontWeight: '900' }}>Taux</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d, i) => (
                                    <tr key={i} style={{ borderBottom: i === data.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                                        <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: d.color, boxShadow: `0 0 15px ${d.color}`, flexShrink: 0 }} />
                                            <Typography sx={{ color: '#fff', fontSize: '1.4vw', fontWeight: 600, lineHeight: 1.2 }}>{d.name}</Typography>
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '14px 20px' }}>
                                            <Typography sx={{ color: '#fff', fontSize: '1.5vw', fontWeight: '900', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{d.y}</Typography>
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '14px 20px' }}>
                                            <Typography sx={{ color: '#fff', fontSize: '1.5vw', fontWeight: '900', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{d.pct}%</Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot style={{ borderTop: '3px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                <tr>
                                    <td style={{ padding: '16px 20px' }}>
                                        <Typography sx={{ color: '#FFD700', fontSize: '1.4vw', fontWeight: '900', textTransform: 'uppercase' }}>Total</Typography>
                                    </td>
                                    <td style={{ textAlign: 'center', padding: '16px 20px' }}>
                                        <Typography sx={{ color: '#FFD700', fontSize: '1.6vw', fontWeight: '900' }}>{item.recommandations.total}</Typography>
                                    </td>
                                    <td style={{ textAlign: 'center', padding: '16px 20px' }}>
                                        <Typography sx={{ color: '#FFD700', fontSize: '1.6vw', fontWeight: '900' }}>100%</Typography>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </Box>
                </Grid>

                <Grid xs={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0 }}>
                    <Box sx={{ width: '100%', height: '450px' }}>
                        <HighchartsReact highcharts={Highcharts} options={pieOptions} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </Box>
                </Grid>
            </Grid>

            {item.derniere_mission && (
                <Stack
                    direction="row"
                    alignItems={"flex-end"}
                    justifyContent="flex-end"
                    gap={2}
                >
                    <Typography sx={{
                        color: '#FFD700',
                        fontSize: '1vw',
                        fontWeight: '900',
                    }}>
                        Date début: {formatMissionDate(item.derniere_mission.debut)}
                    </Typography>
                    <Box
                        width={20}
                        sx={{ aspectRatio: 1 }}
                        bgcolor={'#FFD700'}
                        borderRadius={30}
                    />
                    <Typography sx={{
                        color: '#FFD700',
                        fontSize: '1vw',
                        fontWeight: '900',
                    }}>
                        Date fin: {formatMissionDate(item.derniere_mission.fin)}
                    </Typography>
                </Stack>
            )}
        </Sheet>
    );
};
