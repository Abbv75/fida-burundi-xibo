import { Stack } from "@mui/joy";
import Header from "../Header";
import ActionZone from "./ActionZone";
import { usePageLooperStore } from "../../store/usePageLooperStore";
import { useMemo } from "react";
import Background from "./Background";
import Timer from "./Timer";

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

                {currentPage?.component}
            </Stack>
        </>
    );
};

export default PageLooper;
