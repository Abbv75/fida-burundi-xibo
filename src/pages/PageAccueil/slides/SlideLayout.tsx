import React from "react";
import { Stack, Typography, Box } from "@mui/joy";
import { green } from "@mui/material/colors";

interface SlideLayoutProps {
    backgroundImage: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ backgroundImage, title, subtitle, children }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for readability
                },
            }}
        >
            <Stack
                sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "80%",
                    maxWidth: "1200px",
                    p: 6,
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.1)", // Glassmorphism
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                    gap: 4,
                }}
            >
                <Stack>
                    <Typography
                        level="h1"
                        sx={{
                            fontSize: "4vw",
                            fontWeight: "900",
                            color: "#fff",
                            textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                            mb: 1,
                        }}
                    >
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography
                            level="h4"
                            sx={{
                                fontSize: "1.8vw",
                                fontWeight: "500",
                                color: green[200],
                                textTransform: "uppercase",
                                letterSpacing: "0.2rem",
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Stack>

                <Box sx={{ color: "#fff", fontSize: "1.4vw", lineHeight: 1.6 }}>
                    {children}
                </Box>
            </Stack>
        </Box>
    );
};

export default SlideLayout;
