import { Box, Stack, Typography } from "@mui/joy";
import { usePageLooperStore } from "../../store/usePageLooperStore";
import { green, grey } from "@mui/material/colors";

const Timer = () => {
    const {
        pages,
        currentIndex,
        timeLeft
    } = usePageLooperStore();

    const currentPage = pages[currentIndex];

    if (!currentPage) return null;

    return (
        <Stack
            gap={1}
            sx={{
                position: "fixed",
                top: '5.5vw',
                right: '20px',
                zIndex: 10,
                color: 'white',
                background: 'rgba(0, 50, 20, 0.4)',
                p: '15px 25px',
                borderRadius: '12px',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
        >
            <Stack direction="row" alignItems="center" gap={2}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        color: '#FFD700',
                        border: '2px solid #FFD700'
                    }}
                >
                    {Math.ceil(timeLeft)}
                </Box>
                <Stack>
                    <Typography level="body-xs" sx={{ color: green[200], fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Page {currentIndex + 1} / {pages.length}
                    </Typography>
                    <Typography level="title-md" sx={{ color: 'white', fontWeight: 600 }}>
                        {currentPage.id}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Timer;
