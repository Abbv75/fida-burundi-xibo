import React from 'react';
import { Box, Typography, Table } from '@mui/joy';
import { ResponsableTableProps } from '../types';
import { ProgressBar } from '../../SuiviProjets/components/Utils';
import { getPercentageValue, formatPercent } from '../../../helpers';

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
                        <tr style={{ borderBottom: `5px solid white` }}>
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
    );
};
