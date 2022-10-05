import Image from "next/image";
import logo from "../../../../public/img/nsmlogo.svg";
import style from "./nsmlogo.module.css";
import { imgLoader } from "../../../helpers/functions";

export const NSMLogo: React.FC = () => {
  return (
    <div className={style.nsmlogoWrapper}>
      <a href="https://www.kvalitetsregistre.no/">
        <Image
          loader={imgLoader}
          className={style.nsmlogo}
          src={logo}
          alt="kvalitetsregistre.no"
        />
      </a>
    </div>
  );
};
