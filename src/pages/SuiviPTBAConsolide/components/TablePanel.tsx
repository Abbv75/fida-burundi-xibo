import React from "react";
import { Box, Typography } from "@mui/joy";
import { ProjetConsolideEntry } from "../../../service/suiviPTBAConsolide";
import { PALETTE } from "./constants";
import { fmt, ProgressBar } from "./Utils";

interface TablePanelProps {
    projets: ProjetConsolideEntry[];
}

export const TablePanel: React.FC<TablePanelProps> = ({ projets }) => (
    <Box
        sx={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.12)",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }}
    >
        {/* Header */}
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr",
                gap: "0.5vw",
                px: "1.2vw",
                py: "0.9vw",
                background: "rgba(0, 60, 25, 0.7)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            {["Projet", "Taux d'exécution", "Taux de réalisation"].map((h) => (
                <Typography
                    key={h}
                    sx={{
                        color: "#ffd700",
                        fontWeight: 900,
                        fontSize: "0.85vw",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                    }}
                >
                    {h}
                </Typography>
            ))}
        </Box>

        {/* Rows */}
        <Box sx={{ overflowY: "auto", flex: 1 }}>
            {projets.map((p, i) => {
                const color = PALETTE[i % PALETTE.length];
                return (
                    <Box
                        key={`${p.code}-${i}`}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1.4fr 1fr 1fr",
                            gap: "0.5vw",
                            px: "1.2vw",
                            py: "0.85vw",
                            alignItems: "center",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            transition: "background 0.2s",
                            "&:hover": {
                                background: "rgba(255,255,255,0.05)",
                            },
                        }}
                    >
                        {/* Sigle */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                            <Box
                                sx={{
                                    width: "0.5vw",
                                    height: "2.2vw",
                                    borderRadius: "3px",
                                    background: color,
                                    flexShrink: 0,
                                }}
                            />
                            <Box>
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 800,
                                        fontSize: "1vw",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {p.sigle}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.45)",
                                        fontSize: "0.65vw",
                                        lineHeight: 1.2,
                                        fontWeight: 400,
                                    }}
                                >
                                    {p.pays}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Taux d'exécution */}
                        <Box>
                            <Typography
                                sx={{
                                    color,
                                    fontWeight: 700,
                                    fontSize: "0.95vw",
                                    mb: "0.2vw",
                                }}
                            >
                                {fmt(p.taux_execution)}
                            </Typography>
                            <ProgressBar val={p.taux_execution} color={color} />
                        </Box>

                        {/* Taux de réalisation */}
                        <Box>
                            <Typography
                                sx={{
                                    color: "#ffd700",
                                    fontWeight: 700,
                                    fontSize: "0.95vw",
                                    mb: "0.2vw",
                                }}
                            >
                                {fmt(p.taux_realisation)}
                            </Typography>
                            <ProgressBar val={p.taux_realisation} color="#ffd700" />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    </Box>
);
