import React from 'react';
import { Box, Typography, Table } from '@mui/joy';
import { ResponsableTableProps } from '../types';
import LinearProgressCustom from '../../../components/LinearProgressCustom';
import { getPercentageValue } from '../../../helpers';

export const ResponsableTable: React.FC<ResponsableTableProps> = ({ data }) => {
    return (
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
                    <th style={{ width: '30%' }}>Responsables</th>
                    <th style={{ textAlign: 'right' }}>Prévues</th>
                    <th style={{ textAlign: 'right' }}>Réalisées</th>
                    <th style={{ textAlign: 'right' }}>En cours</th>
                    <th style={{ textAlign: 'right' }}>En retard</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                        <td style={{ verticalAlign: 'middle', borderRight: '1px solid rgba(255,255,255,0.12)', fontWeight: 800 }}>
                            <Typography sx={{ color: "#fff", fontSize: "1vw", fontWeight: 800 }}>
                                {item.responsable}
                            </Typography>
                        </td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '1.1vw' }}>{item.activites_prevues}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700 }}>{item.activites_realisees}</Box>
                            <LinearProgressCustom 
                                value={getPercentageValue(item.activites_realisees, item.activites_prevues)} 
                                progressColor="#2ecc71" 
                                fontSize="0.8vw" 
                                height="0.6vw" 
                            />
                        </td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700 }}>{item.activites_en_cours}</Box>
                            <LinearProgressCustom 
                                value={getPercentageValue(item.activites_en_cours, item.activites_prevues)} 
                                progressColor="#f39c12" 
                                fontSize="0.8vw" 
                                height="0.6vw" 
                            />
                        </td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                            <Box sx={{ fontSize: '1.1vw', fontWeight: 700, color: Number(item.activites_en_retard) > 0 ? '#ff4d4d' : 'inherit' }}>
                                {item.activites_en_retard}
                            </Box>
                            <LinearProgressCustom 
                                value={getPercentageValue(item.activites_en_retard, item.activites_prevues)} 
                                progressColor="#ff4d4d" 
                                fontSize="0.8vw" 
                                height="0.6vw" 
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
