import React from "react";
import style from "./index.module.css";
import skdeLogo from "../../img/SKDE_sort.png";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div style={{}}>
      <header className={style.header}>
        <div className={style.logo}>
          <a href="https://d13kv0v5vl0wju.cloudfront.net/">
            <img className={style.logo_img} src={skdeLogo} alt="SKDE logo" />
          </a>
        </div>
        <div>
          <a href="/#">Kontakt</a>
        </div>
      </header>
    </div>
  );
};

export default Header;
