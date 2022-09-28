import { useState } from "react";
import { useEventListener } from "../../helpers/hooks";

import style from "./index.module.css";
import { RegisterNames } from "../RegisterPage";
import Link from "next/link";

interface selectedRegisterProps {
  regNames: RegisterNames[];
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
          ...regNames
            .filter(
              (reg) =>
                reg.rname?.toLowerCase().includes(value.toLocaleLowerCase()) ||
                reg.full_name?.toLowerCase().includes(value.toLocaleLowerCase())
            )
            .filter(
              (reg) =>
                (reg.caregiver_data || reg.dg_data || reg.resident_data) &&
                reg.rname !== "dummy"
            ),
        ]
      : regNames.filter(
          (reg) =>
            (reg.caregiver_data || reg.dg_data || reg.resident_data) &&
            reg.rname !== "dummy"
        );

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
          <li>
            <Link href={`/alle/${activeTab}`} passHref>
              <a>
                <b onClick={() => updateBtnToggle(!btnToggle)}>Alle registre</b>
              </a>
            </Link>
          </li>
          {filteredReg.map((reg: RegisterNames) => {
            const tabName =
              activeTab === "sykehus" && reg.caregiver_data
                ? "sykehus"
                : activeTab === "opptaksomraade" && reg.resident_data
                ? "opptaksomraade"
                : activeTab === "datakvalitet" && reg.dg_data
                ? "datakvalitet"
                : "sykehus";

            return (
              <li key={reg.rname}>
                <Link href={`/${reg.rname}/${tabName}`} passHref>
                  <a onClick={() => updateBtnToggle(!btnToggle)}>
                    {reg.full_name}
                  </a>
                </Link>
              </li>
            );
          })}
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
