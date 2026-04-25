import React from 'react';
import { Box, Stack, Typography, Sheet } from "@mui/joy";
import { INDICATEUR_ITEM_T, INDICATEUR_PROJET_T } from "../../types";

interface IndicateursProps {
    project: INDICATEUR_PROJET_T['projet'];
    indicateurs: INDICATEUR_ITEM_T[];
    currentPage?: number;
    totalPages?: number;
}

const ProgressBarNumber = ({ value, max, color = "#d4e6b5" }: { value: number, max: number, color?: string }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <Box sx={{ position: 'relative', width: '100%', height: '1.8vw', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <Box sx={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                height: '100%', 
                width: `${Math.min(100, percentage)}%`, 
                backgroundColor: color,
                opacity: 0.8
            }} />
            <Typography sx={{ 
                position: 'relative', 
                zIndex: 1, 
                textAlign: 'right', 
                pr: 1, 
                lineHeight: '1.8vw', 
                fontSize: '1vw', 
                fontWeight: '900', 
                color: '#000' 
            }}>
                {value.toLocaleString()}
            </Typography>
        </Box>
    );
};

const PercentageBadge = ({ value }: { value: number }) => {
    const color = value >= 100 ? '#2ecc71' : value >= 50 ? '#f39c12' : '#c0392b';
    return (
        <Box sx={{ 
            backgroundColor: color, 
            color: '#fff', 
            borderRadius: '6px', 
            px: 1, 
            py: 0.5, 
            textAlign: 'center', 
            fontWeight: '800', 
            fontSize: '0.9vw',
            minWidth: '4vw'
        }}>
            {value.toFixed(2).replace('.', ',')}%
        </Box>
    );
};

export default function Indicateurs({ project, indicateurs, currentPage = 1, totalPages = 1 }: IndicateursProps) {
    // Find max previsto for bars scaling on this page
    const maxPrevu = Math.max(...indicateurs.map(i => i.total_prevu), 1);

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
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 'xl',
                        p: 3,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
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
                                <tr style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                                    <th style={{ ...thStyle, textAlign: 'left', width: '60%' }}>Indicateur</th>
                                    <th style={{ ...thStyle, width: '12%' }}>Total Prévu</th>
                                    <th style={{ ...thStyle, width: '12%' }}>Total Réalisé</th>
                                    <th style={{ ...thStyle, width: '8%' }}>(%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indicateurs.map((ind, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                                        <td style={{ ...tdStyle, fontWeight: '500' }}>{ind.code}: {ind.intitule}</td>
                                        <td style={tdStyle}>
                                            <ProgressBarNumber value={ind.total_prevu} max={maxPrevu} />
                                        </td>
                                        <td style={tdStyle}>
                                            <ProgressBarNumber value={ind.total_realise} max={maxPrevu} />
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                                            <PercentageBadge value={ind.pourcentage} />
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
    fontSize: '1vw',
    textTransform: 'uppercase'
};

const tdStyle: React.CSSProperties = {
    padding: '10px 15px',
    border: '1px solid rgba(255,255,255,0.1)',
};
