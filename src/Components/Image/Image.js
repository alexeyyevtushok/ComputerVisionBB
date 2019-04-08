import React from 'react';
import './Image.css';
const Image = () => {
  return (
    <div>
      <img className="bg" src={require('../../img/bg.jpg')} alt="Logo"/>
    </div>
  );
}

export default Image;