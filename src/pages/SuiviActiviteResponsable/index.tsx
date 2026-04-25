import React from 'react';
import { Box, Typography, Stack, Sheet } from '@mui/joy';
import { motion } from 'framer-motion';
import { SuiviActiviteResponsableProps } from './types';
import { ResponsableTable } from './components/ResponsableTable';

const SuiviActiviteResponsable: React.FC<SuiviActiviteResponsableProps> = ({ data, projectName, description, currentPage, totalPages }) => {
    return (
        <Stack
            sx={{
                height: "100%",
                px: "2vw",
                py: "1.5vw",
                gap: "1vw",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            {/* ── Title ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Box sx={{ textAlign: "center", flexShrink: 0 }}>
                    <Typography
                        level="h1"
                        sx={{
                            fontSize: "2.5vw",
                            fontWeight: 900,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            textShadow: "0 0 20px rgba(233, 69, 96, 0.3)",
                        }}
                    >
                        {projectName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1vw",
                            fontWeight: 600,
                            color: "#ffd700",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            mt: "0.5vw",
                            opacity: 0.85,
                        }}
                    >
                        {description || "Suivi des Activités des Responsables"} {currentPage && totalPages && `· Page ${currentPage}/${totalPages}`}
                    </Typography>
                </Box>
            </motion.div>

            {/* ── Table Wrapper ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        borderRadius: "20px",
                        background: "rgba(0,0,0,0.35)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        '&::-webkit-scrollbar': { width: '8px' },
                        '&::-webkit-scrollbar-thumb': { background: 'rgba(233, 69, 96, 0.4)', borderRadius: '4px' },
                    }}
                >
                    <ResponsableTable data={data} />
                </Sheet>
            </motion.div>
        </Stack>
    );
};

export default SuiviActiviteResponsable;

