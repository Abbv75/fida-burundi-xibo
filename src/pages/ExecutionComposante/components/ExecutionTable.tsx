import React from "react";
import LinearProgressCustom from "../../../components/LinearProgressCustom";
import { ExecutionTableProps } from "../types";
import {
    thStyle,
    thSubStyle,
    tdStyle,
    tdCenterStyle,
    tdProgressStyle,
    tdGlobalStyle,
    tdGlobalProgressStyle
} from "../styles";


export const ExecutionTable: React.FC<ExecutionTableProps> = ({
    composantes,
    today,
    isLastPage,
    totals,
    avgTauxCons,
    avgTauxPhys,
    avgTauxGlobal
}) => {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '1.1vw' }}>
            <thead>
                <tr style={{ backgroundColor: 'rgba(0, 60, 25, 0.7)' }}>
                    <th rowSpan={2} style={thStyle}>Sous/ Composante</th>
                    <th colSpan={4} style={thStyle}>Bilan de l'exécution du PTBA au {today}</th>
                    <th colSpan={3} style={{ ...thStyle, backgroundColor: 'rgba(255,255,255,0.1)' }}>Bilan Exécution Physique globale</th>
                </tr>
                <tr style={{ backgroundColor: 'rgba(0, 60, 25, 0.5)' }}>
                    <th style={thSubStyle}>Coût (%)</th>
                    <th style={thSubStyle}>Nombre d'activités</th>
                    <th style={thSubStyle}>Activités réalisées</th>
                    <th style={thSubStyle}>Taux (%)</th>
                    <th style={{ ...thSubStyle, backgroundColor: 'rgba(255,255,255,0.1)' }}>Nombre d'activités</th>
                    <th style={{ ...thSubStyle, backgroundColor: 'rgba(255,255,255,0.1)' }}>Activité réalisées</th>
                    <th style={{ ...thSubStyle, backgroundColor: 'rgba(255,255,255,0.1)' }}>Taux (%)</th>
                </tr>
            </thead>
            <tbody>
                {composantes.map((comp, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                        <td style={tdStyle}>{comp.code}: {comp.intitule}</td>
                        <td style={tdProgressStyle}>
                            <LinearProgressCustom value={comp.financier.taux_consommation} progressColor="#f39c12" />
                        </td>
                        <td style={tdCenterStyle}>{comp.physique.total_activites}</td>
                        <td style={tdCenterStyle}>{comp.physique.realisees}</td>
                        <td style={tdProgressStyle}>
                            <LinearProgressCustom value={comp.physique.taux_avancement} progressColor="#2ecc71" />
                        </td>
                        <td style={tdGlobalStyle}>{comp.global.total_activites}</td>
                        <td style={tdGlobalStyle}>{comp.global.realisees || '-'}</td>
                        <td style={tdGlobalProgressStyle}>
                            <LinearProgressCustom value={comp.global.taux_avancement} progressColor="#3498db" />
                        </td>
                    </tr>
                ))}
            </tbody>
            {isLastPage && totals && (
                <tfoot>
                    <tr style={{ backgroundColor: 'rgba(255,255,255,0.1)', fontWeight: '900' }}>
                        <td style={tdStyle}>Total</td>
                        <td style={tdProgressStyle}>
                            <LinearProgressCustom value={avgTauxCons} progressColor="#f39c12" />
                        </td>
                        <td style={tdCenterStyle}>{totals.totalAct}</td>
                        <td style={tdCenterStyle}>{totals.realisees}</td>
                        <td style={tdProgressStyle}>
                            <LinearProgressCustom value={avgTauxPhys} progressColor="#2ecc71" />
                        </td>
                        <td style={tdGlobalStyle}>{totals.totalGlobal}</td>
                        <td style={tdGlobalStyle}>{totals.realiseesGlobal}</td>
                        <td style={tdGlobalProgressStyle}>
                            <LinearProgressCustom value={avgTauxGlobal} progressColor="#3498db" />
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    );
};
