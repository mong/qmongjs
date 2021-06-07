import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import style from "./index.module.css";
import skdeLogo from "../../img/skde.svg";
import Nav from "./Nav";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const { path } = useRouteMatch();
  if (path === "/") {
    return (
      <header className={style.header}>
        <div className={style.headerContainer}>
          <div className={style.logo}>
            <a href="/">
              <img className={style.logo_img} src={skdeLogo} alt="SKDE logo" />
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <div style={{}}>
      <header className={style.header}>
        <div className={style.headerContainer}>
          <div className={style.logo}>
            <Link to="/">
              <img className={style.logo_img} src={skdeLogo} alt="SKDE logo" />
            </Link>
          </div>
          <div style={{ width: "80%" }}>
            <Nav />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
