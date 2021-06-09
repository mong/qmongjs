import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useEventListener } from "../../helpers/hooks";

import style from "./index.module.css";

interface registerNames {
  rname?: string;
  full_name?: string;
  registerField?: string;
}
interface selectedRegisterProps {
  regNames: registerNames[];
  selection_bar_height: number | null;
  activeTab: string;
}

const SelectRegister = (props: selectedRegisterProps) => {
  const [value, setValue] = useState("");
  const { regNames, selection_bar_height, activeTab } = props;
  const [btnToggle, updateBtnToggle] = useState(false);
  const btnStyle = btnToggle ? { border: "2px solid #00263d" } : {};
  const linkWrapperStyle = btnToggle ? {} : { display: "none" };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!btnToggle) {
      return;
    }
    switch (event.key) {
      case "Esc":
      case "Escape":
        updateBtnToggle(!btnToggle);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  useEventListener("keydown", handleKeyDown);

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };

  const filteredReg =
    value.length > 0
      ? [
        ...regNames.filter(
          (reg) =>
            reg.rname?.toLowerCase().includes(value.toLocaleLowerCase()) ||
            reg.full_name?.toLowerCase().includes(value.toLocaleLowerCase())
        ),
      ]
      : regNames;

  return (
    <>
      <div style={{ position: "sticky", top: selection_bar_height! }}>
        <button
          className={style.registerBtn}
          style={btnStyle}
          onClick={() => updateBtnToggle(!btnToggle)}
        >
          Velg register
        </button>
      </div>
      <div className={style.linkWrapper} style={linkWrapperStyle}>
        <div className={style.searchInputWrapper}>
          <input
            onChange={handleInputChange}
            value={value}
            className={style.searchInput}
            type="text"
            placeholder="Søk etter register"
          />
        </div>
        <ul>
          {filteredReg.map((reg: registerNames) => (
            <li key={reg.rname}>
              <Link
                onClick={() => updateBtnToggle(!btnToggle)}
                to={`/r/${reg.rname}/${activeTab}`}
              >
                {reg.full_name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => updateBtnToggle(!btnToggle)}
          className={style.select_reg_close}
        >
          <i className="far fa-times-circle" />
        </button>
      </div>
    </>
  );
};

export default SelectRegister;
