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
          <a href="https://d13kv0v5vl0wju.cloudfront.net/">
            <img className={style.logo_img} src={skdeLogo} alt="SKDE logo" />
          </a>
        </div>
        <div>
          <Link to="#">Kontakt</Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
