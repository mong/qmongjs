import React from "react";
import style from "./index.module.css";
import Link from "next/link";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const skdeLogo = "/img/SKDE_sort.png";
  return (
    <div style={{}}>
      <header className={style.header}>
        <div className={style.logo}>
          <Link href="/">
            <a>
              <img className={style.logo_img} src={skdeLogo} alt="SKDE logo" />
            </a>
          </Link>
        </div>
        <div>
          <Link href={`/kontakt`}>Kontakt</Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
