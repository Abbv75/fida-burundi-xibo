import React from "react";
import { Stack, Typography } from "@mui/joy";
import { IMAGES } from "../../constant";
import SlideLayout from "./Layout";
import { CardMedia } from "@mui/material";
import { motion } from "framer-motion";

const Summary: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <SlideLayout
            backgroundImage={IMAGES.burundi_hills}
            title="Programmes FIDA au Burundi"
            subtitle="Développement Rural et Sécurité Alimentaire"
        >
            <Stack gap={4}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Typography sx={{ color: "white", fontSize: "1.5vw" }}>
                        Le Fonds International de Développement Agricole (FIDA) accompagne le Burundi dans sa transformation rurale à travers trois programmes majeurs visant à réduire la pauvreté et renforcer la résilience des populations.
                    </Typography>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Stack direction="row" gap={6} justifyContent="center" sx={{ mt: 2 }}>
                        {[
                            { name: "PIPARV-B", desc: "Production & Vulnérabilité" },
                            { name: "PAIFAR-B", desc: "Inclusion Financière" },
                            { name: "PRODER", desc: "Entrepreneuriat Rural" },
                        ].map((prog) => (
                            <motion.div key={prog.name} variants={itemVariants}>
                                <Stack
                                    sx={{
                                        p: 3,
                                        borderRadius: "16px",
                                        background: "rgba(255, 255, 255, 0.15)",
                                        minWidth: "200px",
                                        textAlign: "center",
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                    }}
                                >
                                    <Typography sx={{ color: "#FFD700", fontWeight: "bold", fontSize: "1.8vw" }}>
                                        {prog.name}
                                    </Typography>
                                    <Typography sx={{ color: "white", fontSize: "1vw" }}>
                                        {prog.desc}
                                    </Typography>
                                </Stack>
                            </motion.div>
                        ))}
                    </Stack>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Stack direction="row" gap={4} justifyContent="center" >
                        {[IMAGES.armoirie, IMAGES.logo_fida].map((img, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                src={img}
                                sx={{ width: "8vw", height: "auto", objectFit: "contain", }}
                            />
                        ))}
                    </Stack>
                </motion.div>
            </Stack>
        </SlideLayout>
    );
};

export default Summary;
