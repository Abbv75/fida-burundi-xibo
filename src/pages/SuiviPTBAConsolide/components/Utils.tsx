import React from "react";
import { Box } from "@mui/joy";

export const fmt = (val: number) => `${val.toFixed(2)}%`;

interface ProgressBarProps {
    val: number;
    color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ val, color }) => (
    <Box
        sx={{
            width: "100%",
            height: "0.7vw",
            borderRadius: "99px",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            position: "relative",
        }}
    >
        <Box
            sx={{
                width: `${Math.min(val, 100)}%`,
                height: "100%",
                borderRadius: "99px",
                background: color,
                boxShadow: `0 0 8px ${color}88`,
                transition: "width 1s ease",
            }}
        />
    </Box>
);
