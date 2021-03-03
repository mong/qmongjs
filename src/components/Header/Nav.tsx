import React, { useState, CSSProperties } from "react";
import { NavLink } from "react-router-dom";

import style from "./nav.module.css";

type HeaderProps = {};

const Nav: React.FC<HeaderProps> = () => {
  const [menuToggle, updateMenuToggle] = useState(false);
  const styleTop: CSSProperties = menuToggle ? { transform: "scale(0)" } : {};
  const styleMiddle: CSSProperties = menuToggle
    ? { transform: "translate(0px, 0px) rotate(45deg)  scale(1.2)" }
    : {};
  const styleBottom: CSSProperties = menuToggle
    ? { transform: "translate(0px, -7px) rotate(-45deg)  scale(1.2)" }
    : {};
  const styleBtn: CSSProperties = menuToggle ? { borderRadius: "100%" } : {};
  const styleNavLinks: CSSProperties = menuToggle ? { display: "flex" } : {};
  const handleClick = () => updateMenuToggle(!menuToggle);

  return (
    <div className={style.navBar}>
      <div className={style.navLinks} style={styleNavLinks}>
        <NavLink to="/kvalitetsregistre" activeStyle={{ fontWeight: 600 }}>
          Kvalitetsregistre
        </NavLink>
        <a href="https://helseatlas.no/">Helseatlas</a>
        <a href="https://helse-nord.no/skde/pasientstrommer">Pasientstrømmer</a>
        <a href="https://helse-nord.no/skde">Om SKDE</a>
      </div>
      <button
        className={style.hamburgerbtn}
        onClick={() => handleClick()}
        style={styleBtn}
      >
        <span className={style.hamburgerWrapper}>
          <span className={style.lineTop} style={styleTop}></span>
          <span className={style.lineMiddle} style={styleMiddle}></span>
          <span className={style.lineBottom} style={styleBottom}></span>
        </span>
      </button>
    </div>
  );
};

export default Nav;
