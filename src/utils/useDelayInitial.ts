import { useEffect, useState } from "react";

function useDelayInitial<T>(value: T, delayedValue: T): T {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayed(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return delayed ? delayedValue : value;
}

export default useDelayInitial;
