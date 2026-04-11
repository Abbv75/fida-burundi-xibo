import React, { useEffect, useRef } from "react";
import PageLooper from "./components/PageLooper";
import { usePageLooperStore } from "./store/usePageLooperStore";
import { useLoadData } from "./hooks/useLoadData";
import INITIAL_PAGES from "./constant/initialPages";

const App: React.FC = () => {
  const { isPlaying, pages, currentIndex, nextPage, set } = usePageLooperStore();
  const { loadData } = useLoadData();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    set({ pages: INITIAL_PAGES });
    loadData();
  }, [loadData, set]);

  useEffect(() => {
    if (!isPlaying || !pages[currentIndex]) return;

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
  }, [currentIndex, isPlaying, pages, nextPage, set]);

  return <PageLooper />;
};

export default App;

