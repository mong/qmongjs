import React from "react";
import style from "./index.module.css";
import skdeLogo from "../../../public/img/SKDE_sort.png";
import Link from "next/link";
import Image from "next/image";
import { imgLoader } from "../../helpers/functions";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div style={{}}>
      <header className={style.header}>
        <div className={style.logo}>
          <Link href="/">
            <a>
              <Image
                loader={imgLoader}
                className={style.logo_img}
                src={skdeLogo}
                alt="SKDE logo"
                height="39px"
                width="96px"
              />
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
