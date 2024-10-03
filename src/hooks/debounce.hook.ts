import { useEffect, useState } from "react";

export const useDevounce = <T>(value: T, delay = 500) => {
  const [devounceValue, setDevounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDevounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return devounceValue;
};
