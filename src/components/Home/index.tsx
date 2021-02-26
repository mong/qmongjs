import React from "react";

import style from "./index.module.css";

import Main from "./Main";

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <Main />
    </div>
  );
};

export default Home;
