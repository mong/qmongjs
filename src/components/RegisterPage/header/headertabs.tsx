import React from "react";
import { Link, useParams } from "react-router-dom";

import style from "./headertabs.module.css";

export interface HeaderTabProps {
  tabNames: { label: string; value: string }[];
  activeTab: string;
}

export const HeaderTabs: React.FC<HeaderTabProps> = ({
  tabNames,
  activeTab,
}) => {
  const tabs = tabNames.map((tabName, i) => {
    return (
      <Tab
        tabName={tabName}
        activeTab={activeTab}
        key={`${tabName.value.replace(/\s/g, "")}${i}`}
      />
    );
  });

  return (
    <div className={style.tabs}>
      <div className={style.tabsWrapper}>
        <ul className={style.tabsUL}>{tabs}</ul>
      </div>
    </div>
  );
};

interface TabProps {
  tabName: { value: string; label: string };
  activeTab: string;
}

const Tab: React.FC<TabProps> = ({ tabName, activeTab }) => {
  const { tab } = useParams();
  const { register } = useParams();

  const clickedStyle =
    activeTab === tabName.value
      ? {
          color: "#6da7df",
          boxShadow: "-7px 7px 10px -5px #ccc",
          backgroundColor: "white",
          borderBottom: "3px solid white",
          borderRadius: "5px",
        }
      : {};
  const path = register ? `/${register}` : "/alle";

  return (
    <li className={style.tabsLI}>
      <Link
        to={`${path}/${tabName.value}`}
        role="tab"
        aria-selected={tabName.value === tab}
        style={clickedStyle}
        className={style.tabsLink}
      >
        {tabName.label}
      </Link>
    </li>
  );
};
