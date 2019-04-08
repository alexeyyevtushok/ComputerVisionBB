/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Header from '../Header/Header';
import Middle from '../Middle/Middle';
import Slider from '../Slider/Slider';
import './Application.css';


class Application extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <Middle />
        <Slider />
      </div>
    );
  }
}

export default Application;
