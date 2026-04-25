import { Stack } from "@mui/joy";
import Header from "../Header";
import ActionZone from "./ActionZone";
import { usePageLooperStore } from "../../store/usePageLooperStore";
import { useMemo } from "react";
import Background from "./Background";
import Timer from "./Timer";
import { motion, AnimatePresence } from "framer-motion";

const PageLooper = () => {
    const {
        pages,
        currentIndex,
    } = usePageLooperStore();

    const currentPage = useMemo(() => pages[currentIndex], [pages, currentIndex]);

    if (!currentPage) return null;

    return (
        <>
            {/* background */}
            <Background />

            {/* Timer + page info */}
            <Timer />

            <ActionZone />

            {/* Affichage de la page courante */}
            <Stack
                width={'100%'}
                height={'100vh'}
                sx={{ 
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Header />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 1.02 }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                        style={{ 
                            width: '100%', 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {currentPage?.component}
                    </motion.div>
                </AnimatePresence>
            </Stack>
        </>
    );
};

export default PageLooper;
