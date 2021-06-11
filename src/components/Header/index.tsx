import React from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";
import skdeLogo from "../../img/SKDE_sort.png";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div style={{}}>
      <header className={style.header}>
        <div className={style.logo}>
          <a href={window.location.origin}>
            <img className={style.logo_img} src={skdeLogo} alt="SKDE logo" />
          </a>
        </div>
        <div>
          <a href="https://helse-nord.no/om-oss/kontakt-oss">Kontakt</a>
        </div>
      </header>
    </div>
  );
};

export default Header;
