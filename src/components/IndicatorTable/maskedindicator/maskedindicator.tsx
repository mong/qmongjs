import React from "react";
import style from "./maskedindicator.module.css";

export interface MaskedIndicatorProps {
  text: "Lav dg" | "Lav N" | "Ingen Data";
}

export const MaskedIndicator: React.FC<MaskedIndicatorProps> = ({ text }) => {
  return <div className={style.maskedIndicator}>{text}</div>;
};

export default MaskedIndicator;
