import { MutableRefObject, useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useResizeObserver = function (
  ref: MutableRefObject<Element | null>
) {
  const [dimensions, setDimensions] = useState<ResizeObserverEntry | null>(
    null
  );
  useEffect(() => {
    const observeTarget = ref?.current;

    if (!observeTarget) {
      return;
    }

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        entries.forEach((entry) => {
          setDimensions(entry);
        });
      }
    );

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
