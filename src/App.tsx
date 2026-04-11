import React, { useEffect, useRef } from "react";
import PageLooper from "./components/PageLooper";
import { usePageLooperStore } from "./store/usePageLooperStore";
import { usePreloadPages } from "./hooks/usePreloadPages/usePreloadPages";
import LoadingScreen from "./components/LoadingScreen";

const App: React.FC = () => {
  const { isPlaying, pages, currentIndex, nextPage, set } = usePageLooperStore();
  const { preload, isLoading, percentageLoadingValue } = usePreloadPages();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    preload();
  }, [preload]);

  useEffect(() => {
    if (isLoading || !isPlaying || !pages[currentIndex]) return;

    const duration = pages[currentIndex].duration;
    set({ timeLeft: duration / 1000 });

    timerRef.current = setInterval(() => {
      set((state) => {
        if (state.timeLeft <= 1) {
          nextPage();
          return { timeLeft: duration / 1000 };
        }
        return { timeLeft: state.timeLeft - 1 };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPlaying, pages, nextPage, set, isLoading]);

  if (isLoading) {
    return <LoadingScreen progress={percentageLoadingValue} />;
  }

  return <PageLooper />;
};

export default App;
