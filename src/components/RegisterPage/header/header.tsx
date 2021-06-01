import React from "react";
import { NSMLogo } from "./nsmlogo";
import { HeaderTabs } from "./headertabs";
import SelectRegister from "../../SelectRegister";
import { RegisterNames } from "../";

import style from "./header.module.css";
export interface HeaderProps {
  registerNames: RegisterNames[];
  tabNames?: { label: string; value: string }[];
  dataFrom?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const {
    registerNames,
    tabNames = [],
    dataFrom = "medisinske kvalitetsregistre",
  } = props;

  return (
    <div className={style.headerOuterWrapper}>
      <div className={style.headerInnerWrapper}>
        <div className={style.topHeader}>
          <div className={style.topHeaderLeft}>
            <NSMLogo />
            <div className={style.headerText}>
              <h3>Resultater fra {dataFrom}</h3>
            </div>
          </div>
          <div className={style.topHeaderRight}>
            <SelectRegister
              regNames={registerNames}
              selection_bar_height={null}
            />
          </div>
        </div>
        {tabNames.length > 1 ? <HeaderTabs tabNames={tabNames} /> : null}
      </div>
    </div>
  );
};
