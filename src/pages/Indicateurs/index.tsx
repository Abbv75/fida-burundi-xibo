import React from 'react';
import { Box, Stack, Typography, Sheet } from "@mui/joy";
import { INDICATEUR_ITEM_T, INDICATEUR_PROJET_T } from "../../types";
import LinearProgressCustom from "../../components/LinearProgressCustom";

interface IndicateursProps {
    project: INDICATEUR_PROJET_T['projet'];
    indicateurs: INDICATEUR_ITEM_T[];
    currentPage?: number;
    totalPages?: number;
}

export default function Indicateurs({ project, indicateurs, currentPage = 1, totalPages = 1 }: IndicateursProps) {
    const getProgressColor = (value: number) => {
        if (value >= 100) return '#2ecc71';
        if (value >= 50) return '#f39c12';
        return '#c0392b';
    };

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
                    Indicateurs de Performance
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
                    Suivi des résultats - {project.sigle}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 4, pb: 4 }}>
                <Sheet
                    variant="soft"
                    sx={{
                        background: 'rgba(0,0,0,0.35)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 'xl',
                        p: 3,
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography sx={{ color: '#FFD700', fontSize: '2.2vw', fontWeight: '900', textShadow: '1px 1px 5px rgba(0,0,0,0.5)' }}>
                            {project.sigle}
                        </Typography>
                        {totalPages > 1 && (
                            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2vw', fontWeight: '600' }}>
                                Page {currentPage} sur {totalPages}
                            </Typography>
                        )}
                    </Stack>

                    <Box sx={{ borderRadius: 'lg', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '1vw' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'rgba(0, 60, 25, 0.7)', borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                                    <th style={{ ...thStyle, textAlign: 'left', width: '55%' }}>Indicateur</th>
                                    <th style={{ ...thStyle, width: '14%' }}>Total Prévu</th>
                                    <th style={{ ...thStyle, width: '14%' }}>Total Réalisé</th>
                                    <th style={{ ...thStyle, width: '17%' }}>Progression (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indicateurs.map((ind, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                                        <td style={tdStyle}>{ind.code}: {ind.intitule}</td>
                                        <td style={tdNumberStyle}>
                                            {ind.total_prevu.toLocaleString()}
                                        </td>
                                        <td style={tdNumberStyle}>
                                            {ind.total_realise.toLocaleString()}
                                        </td>
                                        <td style={tdProgressStyle}>
                                            <LinearProgressCustom 
                                                value={ind.pourcentage} 
                                                progressColor={getProgressColor(ind.pourcentage)}
                                                fontSize="0.9vw"
                                                height="0.8vw"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Sheet>
            </Box>
        </Stack>
    );
}

const thStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'center',
    color: '#FFD700',
    fontWeight: '900',
    fontSize: '0.95vw',
    textTransform: 'uppercase',
    border: '1px solid rgba(255,255,255,0.1)'
};

const tdStyle: React.CSSProperties = {
    padding: '12px 15px',
    border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '1vw',
    fontWeight: 700
};

const tdNumberStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'right',
    border: '1px solid rgba(255,255,255,0.1)',
    fontWeight: '800',
    fontSize: '1.2vw',
    fontFamily: 'monospace'
};

const tdProgressStyle: React.CSSProperties = {
    padding: '8px 15px',
    border: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center'
};
