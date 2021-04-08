import React from "react";

import skdeLogo from "../../img/skde.svg";
import style from "./footer.module.css";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={style.footer}>
      <div>
        <img src={skdeLogo} alt="skde logo"></img>
      </div>
    </footer>
  );
};

export default Footer;
