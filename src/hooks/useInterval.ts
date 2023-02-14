import { useEffect, useRef, useState } from "react";

const useInterval = (callback: () => void, ms: number, max?: number) => {
  const ref = useRef<NodeJS.Timeout>();
  const [iteration, setIteration] = useState(0);

  const increment = () => setIteration((prev) => prev + 1);

  const start = () => {
    ref.current = setInterval(() => {
      callback();
      increment();
    }, ms);
  };

  const end = () => clearInterval(ref.current);

  useEffect(() => {
    if (iteration === max) end();
    // eslint-disable-next-line
  }, [iteration]);

  return [start, end];
};

export default useInterval;
