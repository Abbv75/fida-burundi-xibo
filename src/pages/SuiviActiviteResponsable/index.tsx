import React from 'react';
import { Box, Typography, Stack, Table, Sheet } from '@mui/joy';
import { SUIVI_ACTIVITE_RESPONSABLE_ITEM_T } from '../../types';
import { ProgressBar } from '../SuiviProjets/components/Utils';
import { motion } from 'framer-motion';

interface PageProps {
    data: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[];
    projectName: string;
    description?: string;
    currentPage?: number;
    totalPages?: number;
}

const SuiviActiviteResponsable: React.FC<PageProps> = ({ data, projectName, description, currentPage, totalPages }) => {
    const getPercentageValue = (value: string | number, total: string | number) => {
        const v = Number(value);
        const t = Number(total);
        if (t === 0) return 0;
        return Math.round((v / t) * 100);
    };

    const formatPercent = (value: string | number, total: string | number) => {
        return `${getPercentageValue(value, total)}%`;
    };



    return (
        <Stack
            sx={{
                height: "100%",
                px: "2vw",
                py: "1.5vw",
                gap: "1vw",
                boxSizing: "border-box",
                // background: "radial-gradient(circle at top left, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                overflow: "hidden",
            }}
        >
            {/* ── Title ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Box sx={{ textAlign: "center", flexShrink: 0 }}>
                    <Typography
                        level="h1"
                        sx={{
                            fontSize: "2.5vw",
                            fontWeight: 900,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            textShadow: "0 0 20px rgba(233, 69, 96, 0.3)",
                        }}
                    >
                        {projectName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1vw",
                            fontWeight: 600,
                            color: "#ffd700",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            mt: "0.5vw",
                            opacity: 0.85,
                        }}
                    >
                        {description || "Suivi des Activités des Responsables"} {currentPage && totalPages && `· Page ${currentPage}/${totalPages}`}
                    </Typography>
                </Box>
            </motion.div>

            {/* ── Table Wrapper ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        borderRadius: "20px",
                        background: "rgba(0,0,0,0.35)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        '&::-webkit-scrollbar': { width: '8px' },
                        '&::-webkit-scrollbar-thumb': { background: 'rgba(233, 69, 96, 0.4)', borderRadius: '4px' },
                    }}
                >
                    <Table
                        stickyHeader
                        hoverRow
                        sx={{
                            '--Table-headerUnderlineThickness': '1px',
                            '--TableCell-paddingX': '1vw',
                            '--TableCell-paddingY': '0.35vw',
                            '& thead th': {
                                background: "rgba(0, 60, 25, 0.7)",
                                color: "#ffd700",
                                fontWeight: 900,
                                fontSize: "0.9vw",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                            },
                            '& tbody td': {
                                color: "#fff",
                                fontSize: "0.95vw",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                            },
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: '18%' }}>Responsables</th>
                                <th style={{ width: '6%' }}>Type</th>
                                <th style={{ textAlign: 'right' }}>Prévues</th>
                                <th style={{ textAlign: 'right' }}>Réalisées</th>
                                <th style={{ textAlign: 'right' }}>En cours</th>
                                <th style={{ textAlign: 'right' }}>En retard</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <tr style={{borderBottom : `5px solid white`}}>
                                        <td rowSpan={2} style={{ verticalAlign: 'middle', borderRight: '1px solid rgba(255,255,255,0.12)', fontWeight: 800 }}>
                                            <Typography sx={{ color: "#fff", fontSize: "1vw", fontWeight: 800 }}>
                                                {item.responsable}
                                            </Typography>
                                        </td>
                                        <td style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>Activités</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '1.1vw' }}>{item.activites_prevues}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700 }}>{item.activites_realisees}</Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'flex-end', mt: '2px' }}>
                                                <Typography sx={{ fontSize: '0.8vw', color: '#2ecc71', fontWeight: 700 }}>
                                                    {formatPercent(item.activites_realisees, item.activites_prevues)}
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <ProgressBar val={getPercentageValue(item.activites_realisees, item.activites_prevues)} color="#2ecc71" />
                                                </Box>
                                            </Box>
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700 }}>{item.activites_en_cours}</Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'flex-end', mt: '2px' }}>
                                                <Typography sx={{ fontSize: '0.8vw', color: '#f39c12', fontWeight: 700 }}>
                                                    {formatPercent(item.activites_en_cours, item.activites_prevues)}
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <ProgressBar val={getPercentageValue(item.activites_en_cours, item.activites_prevues)} color="#f39c12" />
                                                </Box>
                                            </Box>
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700, color: Number(item.activites_en_retard) > 0 ? '#ff4d4d' : 'inherit' }}>
                                                {item.activites_en_retard}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'flex-end', mt: '2px' }}>
                                                <Typography sx={{ fontSize: '0.8vw', color: Number(item.activites_en_retard) > 0 ? '#ff4d4d88' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                                    {formatPercent(item.activites_en_retard, item.activites_prevues)}
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <ProgressBar val={getPercentageValue(item.activites_en_retard, item.activites_prevues)} color="#ff4d4d" />
                                                </Box>
                                            </Box>
                                        </td>
                                    </tr>
                                    <tr style={{ borderBottom: '3px solid rgba(255,255,255,0.2)' }}>
                                        <td style={{ backgroundColor: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>Tâche</td>
                                        <td style={{ backgroundColor: "rgba(255,255,255,0.02)", textAlign: 'right', fontFamily: 'monospace', fontSize: '1.1vw' }}>{item.taches_prevues}</td>
                                        <td style={{ backgroundColor: "rgba(255,255,255,0.02)", textAlign: 'right', fontFamily: 'monospace' }}>
                                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700 }}>{item.taches_realisees}</Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'flex-end', mt: '2px' }}>
                                                <Typography sx={{ fontSize: '0.8vw', color: '#2ecc71', fontWeight: 700 }}>
                                                    {formatPercent(item.taches_realisees, item.taches_prevues)}
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <ProgressBar val={getPercentageValue(item.taches_realisees, item.taches_prevues)} color="#2ecc71" />
                                                </Box>
                                            </Box>
                                        </td>
                                        <td style={{ backgroundColor: "rgba(255,255,255,0.02)", textAlign: 'right', fontFamily: 'monospace' }}>
                                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700 }}>{item.taches_en_cours}</Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'flex-end', mt: '2px' }}>
                                                <Typography sx={{ fontSize: '0.8vw', color: '#f39c12', fontWeight: 700 }}>
                                                    {formatPercent(item.taches_en_cours, item.taches_prevues)}
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <ProgressBar val={getPercentageValue(item.taches_en_cours, item.taches_prevues)} color="#f39c12" />
                                                </Box>
                                            </Box>
                                        </td>
                                        <td style={{ backgroundColor: "rgba(255,255,255,0.02)", textAlign: 'right', fontFamily: 'monospace' }}>
                                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700, color: Number(item.taches_en_retard) > 0 ? '#ff4d4d' : 'inherit' }}>
                                                {item.taches_en_retard}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'flex-end', mt: '2px' }}>
                                                <Typography sx={{ fontSize: '0.8vw', color: Number(item.taches_en_retard) > 0 ? '#ff4d4d88' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                                    {formatPercent(item.taches_en_retard, item.taches_prevues)}
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <ProgressBar val={getPercentageValue(item.taches_en_retard, item.taches_prevues)} color="#ff4d4d" />
                                                </Box>
                                            </Box>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>

                    </Table>
                </Sheet>
            </motion.div>
        </Stack>
    );
};

export default SuiviActiviteResponsable;
