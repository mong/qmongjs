import React from "react";
import style from "./footer.module.css";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  const skdeLogo = "/img/SKDE_hvit_lys.png";
  const helseNordLogo = "/img/hf_nord-white.svg";
  const NSMLogo = "/img/NSM_logo_hvit.png";
  const helseatlasLogo = "/img/Logo_atlas_hvit.png";
  return (
    <footer className={style.footer}>
      <div className={style.footerTop}>
        <div>
          <a href="/">
            <img src={skdeLogo} alt="skde logo" width="99px" height="40px" />
          </a>
        </div>
        <div className={style.skdeContact}>
          <strong>Telefon:</strong>
          <a href="tel:77755800"> 777 55 800</a>
          <br />
          <strong>E-post:</strong>
          <a href="mailto:postmottak@helse-nord.no">
            {" "}
            postmottak@helse-nord.no
          </a>
          <br />
          <strong>Webredaktør:</strong>
          <a href="mailto:webmaster@skde.no"> webmaster@skde.no</a>
          <br />
        </div>
        <div className={style.skdePrivacy}>
          <a title="Link til kontakt SKDE" href={`/kontakt`}>
            Kontakt
          </a>
          <br />
          <a title="Link til personvern" href={`/personvern`}>
            Personvern
          </a>
        </div>
      </div>
      <div className={style.footerBottom}>
        <div>
          <a title="Link til Helse Nord RHF" href="https://www.helse-nord.no">
            <img
              src={helseNordLogo}
              alt="Helse Nord logo"
              width="180px"
              height="40px"
            />
          </a>
        </div>
        <div>
          <a
            title="Link til kvalitetsregistre"
            href="https://www.kvalitetsregistre.no"
          >
            <img src={NSMLogo} alt="NSM logo" width="287px" height="32px" />
          </a>
        </div>
        <div>
          <a title="Link til helseatlas" href="https://www.helesatlas.no">
            <img
              src={helseatlasLogo}
              alt="Helseatlas logo"
              width="146px"
              height="40px"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
