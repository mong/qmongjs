import { useEffect, useRef } from "react";

export const useEventListener = (
  eventName: string,
  handler: Function,
  targetElement = global
) => {
  const listenerRef = useRef<Function>();

  useEffect(() => {
    listenerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = targetElement && targetElement.addEventListener;
    if (!isSupported) return;
    const eventListener = (event: Event) =>
      !!listenerRef.current && listenerRef.current(event);
    targetElement.addEventListener(eventName, eventListener);
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, targetElement]);
};

export default useEventListener;
