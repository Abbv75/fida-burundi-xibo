import { Box, Stack, Typography, Sheet } from "@mui/joy";
import { EXECUTION_COMPOSANTE_ITEM_T, EXECUTION_COMPOSANTE_PROJET_T } from "../../types";

interface ExecutionComposanteProps {
    project: EXECUTION_COMPOSANTE_PROJET_T['projet'];
    anneeReference: string;
    composantes: EXECUTION_COMPOSANTE_ITEM_T[];
    isLastPage?: boolean;
    currentPage?: number;
    totalPages?: number;
    totals?: {
        budget: number;
        depense: number;
        totalAct: number;
        realisees: number;
        tauxPhysSum: number;
        totalGlobal: number;
        realiseesGlobal: number;
        tauxGlobalSum: number;
        compCount: number;
    };
}

export default function ExecutionComposante({
    project,
    anneeReference,
    composantes,
    isLastPage = true,
    currentPage = 1,
    totalPages = 1,
    totals
}: ExecutionComposanteProps) {
    const today = new Date().toLocaleDateString('fr-FR');

    const avgTauxCons = totals && totals.budget > 0 ? (totals.depense / totals.budget) * 100 : 0;
    const avgTauxPhys = totals && totals.compCount > 0 ? totals.tauxPhysSum / totals.compCount : 0;
    const avgTauxGlobal = totals && totals.compCount > 0 ? totals.tauxGlobalSum / totals.compCount : 0;

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
                    Exécution par Composante
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
                    Bilan de performance - {project.sigle_projet}
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
                            {project.sigle_projet} - {anneeReference}
                        </Typography>
                        {totalPages > 1 && (
                            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2vw', fontWeight: '600' }}>
                                Page {currentPage} sur {totalPages}
                            </Typography>
                        )}
                    </Stack>

                    <Box sx={{ borderRadius: 'lg', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '1.1vw' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                                    <th rowSpan={2} style={thStyle}>Sous/ Composante</th>
                                    <th colSpan={4} style={thStyle}>Bilan de l'exécution du PTBA au {today}</th>
                                    <th colSpan={3} style={{ ...thStyle, backgroundColor: 'rgba(200,200,200,0.15)' }}>Bilan Exécution Physique globale</th>
                                </tr>
                                <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                    <th style={thSubStyle}>Coût (%)</th>
                                    <th style={thSubStyle}>Nombre d'activités</th>
                                    <th style={thSubStyle}>Activités réalisées</th>
                                    <th style={thSubStyle}>Taux (%)</th>
                                    <th style={{ ...thSubStyle, backgroundColor: 'rgba(200,200,200,0.15)' }}>Nombre d'activités</th>
                                    <th style={{ ...thSubStyle, backgroundColor: 'rgba(200,200,200,0.15)' }}>Activité réalisées</th>
                                    <th style={{ ...thSubStyle, backgroundColor: 'rgba(200,200,200,0.15)' }}>Taux (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {composantes.map((comp, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                                        <td style={tdStyle}>{comp.code}: {comp.intitule}</td>
                                        <td style={tdCenterStyle}>{Math.round(comp.financier.taux_consommation)} %</td>
                                        <td style={tdCenterStyle}>{comp.physique.total_activites}</td>
                                        <td style={tdCenterStyle}>{comp.physique.realisees}</td>
                                        <td style={tdCenterStyle}>{Math.round(comp.physique.taux_avancement)} %</td>
                                        <td style={tdGlobalStyle}>{comp.global.total_activites}</td>
                                        <td style={tdGlobalStyle}>{comp.global.realisees || '-'}</td>
                                        <td style={tdGlobalStyle}>{Math.round(comp.global.taux_avancement)} %</td>
                                    </tr>
                                ))}
                            </tbody>
                            {isLastPage && totals && (
                                <tfoot>
                                    <tr style={{ backgroundColor: 'rgba(255,255,255,0.1)', fontWeight: '900' }}>
                                        <td style={tdStyle}>Total</td>
                                        <td style={tdCenterStyle}>{Math.round(avgTauxCons)} %</td>
                                        <td style={tdCenterStyle}>{totals.totalAct}</td>
                                        <td style={tdCenterStyle}>{totals.realisees}</td>
                                        <td style={tdCenterStyle}>{Math.round(avgTauxPhys)} %</td>
                                        <td style={tdGlobalStyle}>{totals.totalGlobal}</td>
                                        <td style={tdGlobalStyle}>{totals.realiseesGlobal}</td>
                                        <td style={tdGlobalStyle}>{Math.round(avgTauxGlobal)} %</td>
                                    </tr>
                                </tfoot>
                            )}
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
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#FFD700',
    fontWeight: '900',
    fontSize: '1vw'
};

const thSubStyle: React.CSSProperties = {
    padding: '10px 12px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
    fontWeight: '700',
    fontSize: '0.9vw'
};

const tdStyle: React.CSSProperties = {
    padding: '12px 15px',
    border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '1vw'
};

const tdCenterStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
    fontWeight: '700',
    fontSize: '1.1vw'
};

const tdGlobalStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
    fontWeight: '700',
    fontSize: '1.1vw',
    backgroundColor: 'rgba(200,200,200,0.1)'
};
