import React from "react";
import { Stack, Typography, Box } from "@mui/joy";
import SlideLayout from "./Layout";

interface FeatureSlideProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    highlights: string[];
}

const FeatureSlide: React.FC<FeatureSlideProps> = ({ title, subtitle, description, image, highlights }) => {
    return (
        <SlideLayout
            backgroundImage={image}
            title={title}
            subtitle={subtitle}
        >
            <Stack gap={4} sx={{ mt: 2, alignItems: 'center', textAlign: 'center' }}>
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

                <Stack direction="row" gap={3} justifyContent="center" sx={{ width: '100%' }}>
                    {highlights.map((h, i) => (
                        <Box
                            key={i}
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
                    ))}
                </Stack>
            </Stack>
        </SlideLayout>
    );
};

export default FeatureSlide;
