import { Typography, LinearProgress, Box } from "@mui/joy";
import { green } from "@mui/material/colors";

interface LinearProgressCustomProps {
    value: number;
    progressColor?: string;
}

const LinearProgressCustom = ({ value, progressColor = green[500] }: LinearProgressCustomProps) => (
    <Box
        sx={{
            position: "relative",
            width: "100%",
            height: '2vw',
            borderRadius: '1vw',
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}
    >
        <LinearProgress
            determinate
            value={Math.min(100, Math.max(0, value))}
            sx={{
                height: "100%",
                borderRadius: 0,
                backgroundColor: 'transparent',
                "--LinearProgress-progressThickness": '100%',
                "--LinearProgress-radius": '0px',
                "& .MuiLinearProgress-progress": {
                    background: `linear-gradient(90deg, ${green[800]} 0%, ${green[400]} 100%)`,
                    transition: 'width 1s ease-in-out',
                }
            }}
        />
        <Typography
            level="body-md"
            sx={{
                position: "absolute",
                width: "100%",
                top: 0,
                left: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "900",
                fontSize: '0.9vw',
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
            }}
        >
            {value.toFixed(1)}%
        </Typography>
    </Box>
);

export default LinearProgressCustom;