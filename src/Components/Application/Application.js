/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import Header from "../Header/Header";
import Middle from "../Middle/Middle";
import Slider from "../Slider/Slider";
import "./Application.css";
import axios from "axios";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg:
        "http://pcexpert86.ru/image/cache/catalog/thumbs/nofoto-1200x800.gif"
    };
  }

  componentDidMount() {
    axios.get("/api/images/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          currentImg: res.data[res.data.length - 1].picture
        });
      }
    });
  }

  getUrl = url => {
    this.setState({
      currentImg: url
    });
  };

  render() {
    const { currentImg } = this.state;
    return (
      <div className="main">
        <Header />
        <Middle currentImg={currentImg} />
        <Slider onGetUrl={this.getUrl} />
      </div>
    );
  }
}

export default Application;
