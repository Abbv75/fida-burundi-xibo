import { Box, Sheet, Stack, Typography } from "@mui/joy";
import {
    faPause,
    faPlay,
    faArrowRight,
    faArrowLeft,
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePageLooperStore } from "../../store/usePageLooperStore";
import { yellow } from "@mui/material/colors";

const ActionZone = () => {
    const {
        isPlaying,
        pages,
        nextPage,
        set,
    } = usePageLooperStore();

    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startHideTimer = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // 3 seconds timeout
    }, []);

    const showAndReset = useCallback(() => {
        setIsVisible(true);
        startHideTimer();
    }, [startHideTimer]);

    const setCurrentIndex = (index: number | ((prev: number) => number)) => set((state) => ({ currentIndex: typeof index === 'function' ? index(state.currentIndex) : index }));
    const setIsPlaying = (isPlaying: boolean | ((prev: boolean) => boolean)) => set((state) => ({ isPlaying: typeof isPlaying === 'function' ? isPlaying(state.isPlaying) : isPlaying }));

    const prevPage = () => setCurrentIndex((prev: number) => (prev === 0 ? pages.length - 1 : prev - 1));
    const firstPage = () => setCurrentIndex(0);
    const lastPage = () => setCurrentIndex(pages.length - 1);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const threshold = window.innerHeight - 80; // Detect bottom 80px
            
            if (!isVisible) {
                // If hidden, only show if mouse is at the bottom
                if (e.clientY >= threshold) {
                    showAndReset();
                }
            } else {
                // If visible, reset the timer on any movement
                startHideTimer();
            }
        };

        const handleKey = (e: KeyboardEvent) => {
            // Keys always show and reset for accessibility
            showAndReset();
            
            switch (e.key) {
                case "Tab":
                case " ":
                    e.preventDefault();
                    setIsPlaying((p: boolean) => !p); break;
                case "ArrowRight": nextPage(); break;
                case "ArrowLeft": prevPage(); break;
                case "ArrowUp": lastPage(); break;
                case "ArrowDown": firstPage(); break;
            }
        };

        const handleTouch = (e: TouchEvent) => {
            const touch = e.touches[0];
            const threshold = window.innerHeight - 100;
            if (touch.clientY >= threshold) {
                showAndReset();
            } else if (isVisible) {
                startHideTimer();
            }
        };

        window.addEventListener("keydown", handleKey);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouch);

        startHideTimer(); // Initial hide timer

        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchstart", handleTouch);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [pages, nextPage, isVisible, showAndReset, startHideTimer]);

    const ControlBtn = ({ icon, label, shortcut, onClick, color = "white", active = false }: any) => (
        <Stack 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            alignItems="center"
            justifyContent="center"
            spacing={0.5}
            sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                px: 2,
                py: 1,
                borderRadius: '10px',
                '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)'
                },
                '&:active': {
                    transform: 'translateY(0px)',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                }
            }}
        >
            <Box sx={{ 
                fontSize: '1.2vw', 
                color: active ? '#FFD700' : color,
                filter: active ? 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))' : 'none'
            }}>
                <FontAwesomeIcon icon={icon} />
            </Box>
            <Typography sx={{ 
                fontSize: '0.7vw', 
                fontWeight: 'bold', 
                color: active ? '#FFD700' : 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                {label}
            </Typography>
            <Typography sx={{ 
                fontSize: '0.5vw', 
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 'normal'
            }}>
                [{shortcut}]
            </Typography>
        </Stack>
    );

    return (
        <Sheet
            sx={{
                position: "fixed", 
                bottom: '1.5vw',
                left: "50%",
                transform: `translateX(-50%) translateY(${isVisible ? '0' : '200%'})`,
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                display: "flex",
                alignItems: 'center',
                gap: '0.5vw',
                p: '0.5vw 1.5vw',
                borderRadius: "20px",
                background: 'rgba(0, 40, 20, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                pointerEvents: isVisible ? 'auto' : 'none',
                zIndex: 1000
            }}
            onMouseEnter={showAndReset}
        >
            <ControlBtn 
                icon={isPlaying ? faPause : faPlay} 
                label={isPlaying ? "Pause" : "Lecture"} 
                shortcut="Espace" 
                onClick={() => setIsPlaying(!isPlaying)}
                active={!isPlaying}
                color={!isPlaying ? yellow[600] : "white"}
            />
            
            <Box sx={{ width: '1px', height: '2vw', bgcolor: 'rgba(255,255,255,0.1)', mx: 1 }} />

            <ControlBtn 
                icon={faArrowLeft} 
                label="Précédent" 
                shortcut="←" 
                onClick={prevPage}
            />
            <ControlBtn 
                icon={faArrowRight} 
                label="Suivant" 
                shortcut="→" 
                onClick={nextPage}
            />

            <Box sx={{ width: '1px', height: '2vw', bgcolor: 'rgba(255,255,255,0.1)', mx: 1 }} />

            <ControlBtn 
                icon={faArrowDown} 
                label="Première" 
                shortcut="↓" 
                onClick={firstPage}
            />
            <ControlBtn 
                icon={faArrowUp} 
                label="Dernière" 
                shortcut="↑" 
                onClick={lastPage}
            />
        </Sheet>
    )
}

export default ActionZone