import { useState, useEffect, useCallback } from "react";
import { formatTimeRemaining } from "../utils/helpers";

export const useTimer = (endTime: number): string => {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    formatTimeRemaining(endTime),
  );

  const updateTimer = useCallback(() => {
    setTimeRemaining(formatTimeRemaining(endTime));
  }, [endTime]);

  useEffect(() => {
    updateTimer();

    const interval = setInterval(() => {
      const now = Date.now();

      if (now >= endTime) {
        clearInterval(interval);
        setTimeRemaining("00h 00m 00s");
      } else {
        updateTimer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, updateTimer]);

  return timeRemaining;
};
