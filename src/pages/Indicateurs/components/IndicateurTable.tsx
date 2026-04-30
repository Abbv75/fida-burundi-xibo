import React from 'react';
import LinearProgressCustom from "../../../components/LinearProgressCustom";
import { IndicateurTableProps } from "../types";
import { thStyle, tdStyle, tdNumberStyle, tdProgressStyle } from "../styles";

export const IndicateurTable: React.FC<IndicateurTableProps> = ({ indicateurs }) => {
    const getProgressColor = (value: number) => {
        if (value >= 100) return '#2ecc71';
        if (value >= 50) return '#f39c12';
        return '#c0392b';
    };

    return (
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
    );
};
