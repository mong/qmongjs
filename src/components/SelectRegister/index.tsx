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
}

const SelectRegister = (props: selectedRegisterProps) => {
  const { regNames, selection_bar_height } = props;
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
        <ul>
          {regNames.map((reg: registerNames) => (
            <li key={reg.rname}>
              <Link to={`/kvalitetsregistre/${reg.rname}`}>
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
