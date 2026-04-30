import React from "react";
import { Stack, Typography, Grid, Box } from "@mui/joy";
import { IMAGES } from "../../constant";
import SlideLayout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faWater, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { motion, Variants } from "framer-motion";

const Piparvb: React.FC = () => {
    const points = [
        { icon: faSeedling, title: "Composante 1", text: "Aménagement intégré des Terroirs" },
        { icon: faUsersGear, title: "Composante 2", text: "Structuration communautaire inclusive, amélioration de la productivité, la Valorisation et la diversification / Développement des Coopératives" },
        { icon: faWater, title: "Composante 3", text: "Facilitation, Coordination et Gestion du Projet" },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <SlideLayout
            backgroundImage={IMAGES.burundi_rice}
            title="PIPARV-B"
            subtitle="Projet d’Intensification de la Production Agricole et de Réduction de la Vulnérabilité au Burundi"
        >
            <Stack gap={3} sx={{ mt: 1, alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Typography
                        sx={{
                            color: "white",
                            fontSize: "1.4vw",
                            lineHeight: 1.6,
                            opacity: 0.9,
                            maxWidth: '900px',
                            textAlign: 'center'
                        }}
                    >
                        PIPARV-B transforme les exploitations familiales en leviers de croissance durable en améliorant les rendements et la résilience climatique.
                    </Typography>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ width: '100%', maxWidth: '1100px' }}
                >
                    <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
                        {points.map((p, i) => (
                            <Grid key={i} xs={12} sm={6}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <Box
                                        sx={{
                                            p: 3,
                                            borderRadius: "20px",
                                            background: "rgba(255, 255, 255, 0.12)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 3,
                                            textAlign: 'left',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                background: "rgba(255, 255, 255, 0.18)",
                                                transform: 'translateY(-5px)',
                                                borderColor: "rgba(255, 215, 0, 0.4)"
                                            }
                                        }}
                                    >
                                        <Box sx={{
                                            width: '4vw',
                                            height: '4vw',
                                            minWidth: '4vw',
                                            borderRadius: '12px',
                                            background: 'rgba(255,215,0,0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FontAwesomeIcon icon={p.icon} color="#ffd700" style={{ fontSize: '2vw' }} />
                                        </Box>
                                        <Stack>
                                            <Typography sx={{ color: "#ffd700", fontSize: "1.2vw", fontWeight: "800", mb: 0.2 }}>
                                                {p.title}
                                            </Typography>
                                            <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95vw", fontWeight: 400, lineHeight: 1.3 }}>
                                                {p.text}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Stack>
        </SlideLayout>
    );
};

export default Piparvb;
