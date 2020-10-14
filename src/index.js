import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



const indicator_hosp = window.indicator_hosp
const indicator_hf = window.indicator_hf
const indicator_rhf= window.indicator_rhf
const indicator_nation = window.indicator_nat
const description = window.description
const tu_names = window.tu_names


ReactDOM.render(
  //<React.StrictMode>
    <App 
      data = {{indicator_hf, indicator_rhf , indicator_hosp, indicator_nation,tu_names, description}}
      />,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

