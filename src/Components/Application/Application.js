/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Header from '../Header/Header';
import Middle from '../Middle/Middle';
import Slider from '../Slider/Slider';
import './Application.css';


class Application extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentImg: "https://ak3.picdn.net/shutterstock/videos/33521563/thumb/10.jpg?i10c=img.resize(height:160)",
    }
  }

  getUrl = (url) => {
    this.setState({
      currentImg : url
    });
  }

  render() {
    console.log('app');
    console.log(this.state.lastData);
    return (
      <div className="main">
        <Header/>
        <Middle currentImg={this.state.currentImg}/>
        <Slider onGetUrl={this.getUrl}/>
      </div>
    );
  }
}

export default Application;
