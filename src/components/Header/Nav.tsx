import React, { useState, CSSProperties } from "react";

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
