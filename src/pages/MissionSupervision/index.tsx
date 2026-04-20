import { Box, Stack, Typography, Grid } from "@mui/joy";
import { useApiRequestStore } from "../../store/apiRequestStore";
import { ProjectSection } from "./ProjectSection";

export default function MissionSupervision({ projectIndex = -1 }: { projectIndex?: number }) {
    const { missionSupervisionData } = useApiRequestStore();
    
    // Si projectIndex est -1 (par défaut), on affiche tous les projets (comportement original si besoin)
    // Sinon, on affiche uniquement le projet spécifié par l'index
    const displayData = projectIndex === -1 
        ? missionSupervisionData 
        : [missionSupervisionData[projectIndex]].filter(Boolean);

    if (!missionSupervisionData || missionSupervisionData.length === 0 || displayData.length === 0) {
        return (
            <Stack sx={{ height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: '#fff', opacity: 0.7 }}>
                    Aucune donnée de supervision disponible.
                </Typography>
            </Stack>
        );
    }

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
                    Missions de Supervision
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
                    État des recommandations {projectIndex !== -1 ? `pour ${displayData[0].projet.sigle}` : 'par projet'}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', gap: 2 }}>
                {projectIndex === -1 ? (
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                        {displayData.map((item, idx) => (
                            <Grid key={idx} xs={4} sx={{ height: '100%' }}>
                                <ProjectSection item={item} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ flex: 1, height: '100%' }}>
                        <ProjectSection item={displayData[0]} />
                    </Box>
                )}
            </Box>
        </Stack>
    );
}
