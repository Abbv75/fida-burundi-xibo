import { Box, Card, CardContent, CardCover, LinearProgress, Stack, Typography } from "@mui/joy";
import BURUNDI_ARMES from "../../assets/images/armoirie.png";
import { CardMedia } from "@mui/material";
import { IMAGES } from "../../constant";

interface LoadingScreenProps {
    progress: number;
}

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
    return (
        <Card
            sx={{
                width: "100vw",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                p: 0,
                borderRadius: 0,
                border: "none"
            }}
        >
            <CardCover>
                <CardMedia
                    component={'img'}
                    src={IMAGES.sable}
                />
            </CardCover>
            <CardCover
                sx={{
                    background: "linear-gradient(135deg, #004D40 0%, #00241B 100%)",
                    opacity: 0.9
                }}
            />

            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                }}
            >
                <CardMedia
                    component="img"
                    src={BURUNDI_ARMES}
                    sx={{
                        width: "12vw",
                        filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
                        mb: 2,
                    }}
                />

                <Typography
                    level="h1"
                    sx={{
                        fontSize: "3vw",
                        color: "#FFD700",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.2rem",
                        mb: 1
                    }}
                >
                    République du Burundi
                </Typography>

                <Box sx={{ width: "100%", mt: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography level="body-md" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 'bold' }}>
                            {progress < 40 ? "Récupération des données..." : progress < 90 ? "Génération des graphiques..." : "Finalisation..."}
                        </Typography>
                        <Typography level="body-md" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                            {Math.round(progress)}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        determinate
                        value={progress}
                        sx={{
                            height: "10px",
                            borderRadius: "5px",
                            backgroundColor: "rgba(255,255,255,0.1)",
                            "--LinearProgress-progressColor": "#FFD700",
                            boxShadow: "0 0 15px rgba(255, 215, 0, 0.2)"
                        }}
                    />
                </Box>

                <Typography
                    level="body-xs"
                    sx={{
                        position: 'fixed',
                        bottom: '40px',
                        opacity: 0.5,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: "white"
                    }}
                >
                    Chargement en cours...
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LoadingScreen;
