import React from "react";
import { Stack, Typography, Box } from "@mui/joy";
import SlideLayout from "./Layout";
import { motion, Variants } from "framer-motion";

interface FeatureSlideProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    highlights: string[];
}

const FeatureSlide: React.FC<FeatureSlideProps> = ({ title, subtitle, description, image, highlights }) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
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
            backgroundImage={image}
            title={title}
            subtitle={subtitle}
        >
            <Stack gap={4} sx={{ mt: 2, alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Typography
                        sx={{
                            color: "white",
                            fontSize: "1.6vw",
                            lineHeight: 1.6,
                            opacity: 0.95,
                            maxWidth: '1000px',
                            textShadow: '2px 2px 10px rgba(0,0,0,0.5)'
                        }}
                    >
                        {description}
                    </Typography>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', width: '100%' }}
                >
                    {highlights.map((h, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <Box
                                sx={{
                                    px: 4,
                                    py: 2,
                                    borderRadius: "15px",
                                    background: "rgba(0, 60, 25, 0.6)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 215, 0, 0.3)",
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                                }}
                            >
                                <Typography sx={{ color: "#ffd700", fontSize: "1.3vw", fontWeight: "900" }}>
                                    {h}
                                </Typography>
                            </Box>
                        </motion.div>
                    ))}
                </motion.div>
            </Stack>
        </SlideLayout>
    );
};

export default FeatureSlide;
