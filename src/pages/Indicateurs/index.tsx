import React from 'react';
import { Box, Stack, Typography, Sheet } from "@mui/joy";
import { motion } from "framer-motion";
import { IndicateursProps } from "./types";
import { IndicateurTable } from "./components/IndicateurTable";

export default function Indicateurs({ project, indicateurs, currentPage = 1, totalPages = 1 }: IndicateursProps) {
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
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
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
                        Indicateurs de Performance
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
                        Suivi des résultats - {project.sigle}
                    </Typography>
                </Box>
            </motion.div>

            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 4, pb: 4 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                    <Sheet
                        variant="soft"
                        sx={{
                            background: 'rgba(0,0,0,0.35)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: 'xl',
                            p: 3,
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                            <Typography sx={{ color: '#FFD700', fontSize: '2.2vw', fontWeight: '900', textShadow: '1px 1px 5px rgba(0,0,0,0.5)' }}>
                                {project.sigle}
                            </Typography>
                            {totalPages > 1 && (
                                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2vw', fontWeight: '600' }}>
                                    Page {currentPage} sur {totalPages}
                                </Typography>
                            )}
                        </Stack>

                        <Box sx={{ borderRadius: 'lg', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>
                            <IndicateurTable indicateurs={indicateurs} />
                        </Box>
                    </Sheet>
                </motion.div>
            </Box>
        </Stack>
    );
}

