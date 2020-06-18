import React, { Component } from 'react';
import Image from '../Image/Image';
import './Middle.css';
import EntitiesField from '../EntitiesField/EntitiesField.jsx';
import BoxesField from '../BoxesField/BoxesField';

class Middle extends Component {
  render() {
    return (
      <div className="midleMain">
        <EntitiesField />
        <div className="targetImg">
          <p>Image</p>
          <Image />
        </div>
        <BoxesField />
      </div>
    );
  }
}

export default Middle;
