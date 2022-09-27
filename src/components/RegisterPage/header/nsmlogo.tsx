import Image from "next/image";
import logo from "../../../../public/img/nsmlogo.svg";
import style from "./nsmlogo.module.css";

export const NSMLogo: React.FC = () => {
  return (
    <div className={style.nsmlogoWrapper}>
      <a href="https://www.kvalitetsregistre.no/">
        <Image
          className={style.nsmlogo}
          src={logo}
          alt="kvalitetsregistre.no"
        />
      </a>
    </div>
  );
};
