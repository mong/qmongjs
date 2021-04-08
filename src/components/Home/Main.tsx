import React from "react";
import { Link } from "react-router-dom";

import style from "./main.module.css";

import headerImage from "../../img/shutterstock_1511792492.jpg";

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  return (
    <main>
      <header>
        <div
          className={style.headerContainer}
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          <div className={style.headerContent}>
            <h1 className={style.pageTitle}>SKDE</h1>
            <p>
              Senter for klinisk dokumentasjon og evaluering (SKDE) jobber med å
              kartlegge og synliggjøre geografiske ulikheter i
              spesialisthelsetjenesten. Målet er å bidra til likeverdige
              helsetjenester av god kvalitet uansett hvor pasientene bor.
            </p>
          </div>
        </div>
      </header>
      <section>
        <h1>Resultater fra SKDE</h1>
        <nav className={style.homeBodyNav}>
          <div
            className={style.linkWrapper}
            style={{ backgroundColor: "#689ba3" }}
          >
            <Link to="/kvalitetsregistre">
              <div className={style.linkContent}>
                <i className="fa fa-line-chart"></i>
                <h4>Kvalitetsregistre</h4>
              </div>
            </Link>
          </div>

          <div
            className={style.linkWrapper}
            style={{ backgroundColor: "#02508e" }}
          >
            <a href="https://helseatlas.no/">
              <div className={style.linkContent}>
                <i className="fa fa-globe-americas"></i>
                <h4>Helseatlas</h4>
              </div>
            </a>
          </div>

          <div
            className={style.linkWrapper}
            style={{ backgroundColor: "#78ac8a" }}
          >
            <a href="https://helse-nord.no/skde/pasientstrommer">
              <div className={style.linkContent}>
                <i className="fas fa-route"></i>
                <h4>Pasientstrømmer</h4>
              </div>
            </a>
          </div>

          <div
            className={style.linkWrapper}
            style={{ backgroundColor: "#7bb5de" }}
          >
            <a href="https://helse-nord.no/skde">
              <div className={style.linkContent}>
                <i className="fas fa-hospital"></i>
                <h4>Om SKDE</h4>
              </div>
            </a>
          </div>
        </nav>
      </section>
    </main>
  );
};

export default Main;
