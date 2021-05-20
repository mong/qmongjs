import logo from "../../../img/nsmlogo.svg";
import style from "./nsmlogo.module.css";

export const NSMLogo: React.FC = () => {
  return (
    <div className={style.nsmlogoWrapper}>
      <a href="https://www.kvalitetsregistre.no/">
        <img className={style.nsmlogo} src={logo} alt="kvalitetsregistre.no" />
      </a>
    </div>
  );
};
