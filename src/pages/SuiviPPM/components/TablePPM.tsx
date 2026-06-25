import React from "react";
import { Box, Typography } from "@mui/joy";
import { PPM_CATEGORIE_T } from "../../../types";

const PALETTE = [
    "#FFB84C",
    "#F266AB",
    "#A459D1",
    "#2CD3E1",
    "#4D4C7D",
    "#00DFA2",
    "#F6FA70",
    "#FF0060",
];

export interface TablePPMProps {
    data: PPM_CATEGORIE_T[];
}

export const TablePPM: React.FC<TablePPMProps> = ({ data }) => {
    // Filter out categories with 0 marches if desired, or show them all. We will show all that have > 0.
    const activeData = data.filter(d => d.nombre_marches > 0);

    return (
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
                flex: 1
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1.2fr",
                    gap: "0.5vw",
                    px: "1.2vw",
                    py: "0.9vw",
                    background: "rgba(0, 60, 25, 0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                {["Catégorie", "Nombre de Marchés", "Coût Total (USD)"].map((h) => (
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
                {activeData.map((d, i) => {
                    const color = PALETTE[i % PALETTE.length];
                    return (
                        <Box
                            key={`${d.code_categorie}-${i}`}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1.5fr 1fr 1.2fr",
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
                            {/* Categorie */}
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
                                        {d.code_categorie}
                                    </Typography>
                                    {d.nom_categorie && (
                                        <Typography
                                            sx={{
                                                color: "rgba(255,255,255,0.45)",
                                                fontSize: "0.65vw",
                                                lineHeight: 1.2,
                                                fontWeight: 400,
                                            }}
                                        >
                                            {d.nom_categorie}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            {/* Nombre de marches */}
                            <Typography
                                sx={{
                                    color: "#fff",
                                    fontSize: "1vw",
                                    fontWeight: 600,
                                }}
                            >
                                {d.nombre_marches}
                            </Typography>

                            {/* Coût Total */}
                            <Typography
                                sx={{
                                    color: "#ffd700",
                                    fontSize: "1vw",
                                    fontWeight: 700,
                                }}
                            >
                                {d.cout_total_usd_formatted}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};
