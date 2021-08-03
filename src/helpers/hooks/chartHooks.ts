import { useState, useLayoutEffect } from "react";

export const useElementDimensions = (element: Element | null | undefined) => {
  if (element) {
    const { top, bottom, right, left, width, height } =
      element.getBoundingClientRect();
    return { top, bottom, right, left, width, height };
  }
  return { top: 0, bottom: 0, right: 0, left: 0, width: 0, height: 0 };
};

export const useLegendItemPosition = function (
  element: SVGGElement | null | undefined,
  legendWidth: number,
  vMargin: number,
  hMargin: number,
  legendLabelsString: string,
  textWidth: number
) {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: vMargin / 2,
  });
  const previousElemDim = useElementDimensions(element?.previousElementSibling);
  const parentElementDim = useElementDimensions(element?.parentElement);
  const currentElementDim = useElementDimensions(element);

  const newLegendWidth =
    previousElemDim.right -
    parentElementDim.left +
    hMargin +
    currentElementDim.width;

  useLayoutEffect(() => {
    if (!element) {
      setPosition({ x: 0, y: vMargin / 2 });
    } else if (!element.previousElementSibling) {
      setPosition({ x: 0, y: Math.ceil(vMargin / 2) });
    } else if (newLegendWidth <= legendWidth) {
      const x = Math.ceil(
        previousElemDim.right - parentElementDim.left + hMargin
      );
      const y = Math.ceil(
        previousElemDim.top - parentElementDim.top + vMargin / 2
      );
      setPosition({ x, y });
    } else if (newLegendWidth > legendWidth) {
      const x = 0;
      const y = Math.ceil(
        previousElemDim.top -
          parentElementDim.top +
          currentElementDim.height +
          vMargin / 2
      );
      setPosition({ x, y });
    }
  }, [
    element,
    legendWidth,
    vMargin,
    hMargin,
    newLegendWidth,
    currentElementDim.left,
    currentElementDim.height,
    parentElementDim.left,
    parentElementDim.top,
    previousElemDim.right,
    previousElemDim.top,
    legendLabelsString,
    textWidth,
  ]);

  return position;
};

export default useLegendItemPosition;
