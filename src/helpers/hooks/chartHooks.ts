import { useState, useEffect } from "react";

export const elementDimensions = (element: Element | null | undefined) => {
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
  const previousElemDim = elementDimensions(element?.previousElementSibling);
  const parentElementDim = elementDimensions(element?.parentElement);
  const currentElementDim = elementDimensions(element);

  const newLegendWidth =
    previousElemDim.right -
    parentElementDim.left +
    hMargin +
    currentElementDim.width;

  useEffect(() => {
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

export const useTextWidth = (
  element: SVGTextElement | null,
  label: string,
  color: string,
  legendWidth: number
) => {
  const [textWidth, setTextWidth] = useState(0);
  useEffect(() => {
    if (element) {
      const w = element.getComputedTextLength();
      setTextWidth(w);
    }
  }, [element, setTextWidth, label, color, legendWidth]);

  return textWidth;
};
