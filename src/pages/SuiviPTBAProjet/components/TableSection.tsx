import React from "react";
import { Box, Typography } from "@mui/joy";

import { TableSectionProps } from "../types";

export const TableSection: React.FC<TableSectionProps> = ({ dataMetrics }) => {
    return (
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
                        <th style={{ textAlign: 'left', padding: '18px 20px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1.2vw', letterSpacing: '0.08em', fontWeight: '900' }}>Indicateur de Performance</th>
                        <th style={{ textAlign: 'center', padding: '18px 20px', color: '#FFD700', textTransform: 'uppercase', fontSize: '1.2vw', letterSpacing: '0.08em', fontWeight: '900' }}>Taux (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {dataMetrics.map((d, i) => (
                        <tr key={i} style={{ borderBottom: i === dataMetrics.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: d.color, boxShadow: `0 0 15px ${d.color}`, flexShrink: 0 }} />
                                <Typography sx={{ color: '#fff', fontSize: '1.4vw', fontWeight: 600, lineHeight: 1.2 }}>{d.name}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                                <Typography sx={{ color: '#fff', fontSize: '1.6vw', fontWeight: '900', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>{d.value.toFixed(1)}%</Typography>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};
