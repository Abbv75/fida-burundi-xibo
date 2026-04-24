import React from 'react';
import { Box, Typography } from "@mui/joy";

interface LinearProgressCustomProps {
    value: number;
    progressColor?: string;
    fontSize?: string;
    height?: string;
}

const LinearProgressCustom: React.FC<LinearProgressCustomProps> = ({ 
    value, 
    progressColor = "#2ecc71",
    fontSize = "0.8vw",
    height = "0.7vw"
}) => {
    const safeValue = Math.min(100, Math.max(0, value));
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', width: '100%' }}>
            <Typography sx={{ 
                fontSize: fontSize, 
                color: progressColor, 
                fontWeight: 800,
                minWidth: '2.5vw',
                textAlign: 'right'
            }}>
                {Math.round(safeValue)}%
            </Typography>
            <Box
                sx={{
                    flex: 1,
                    height: height,
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: `${safeValue}%`,
                        height: "100%",
                        borderRadius: "99px",
                        background: progressColor,
                        boxShadow: `0 0 8px ${progressColor}88`,
                        transition: "width 1s ease",
                    }}
                />
            </Box>
        </Box>
    );
};

export default LinearProgressCustom;