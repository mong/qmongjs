import style from "./nsmlogo.module.css";

export const NSMLogo: React.FC = () => {
  const logo = "/img/nsmlogo.svg";
  return (
    <div className={style.nsmlogoWrapper}>
      <a href="https://www.kvalitetsregistre.no/">
        <img className={style.nsmlogo} src={logo} alt="kvalitetsregistre.no" />
      </a>
    </div>
  );
};
