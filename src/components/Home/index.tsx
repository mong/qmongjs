import React from "react";

import style from "./index.module.css";

import Header from "../Header";
import Main from "./Main";
import Footer from "../Footer";

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
