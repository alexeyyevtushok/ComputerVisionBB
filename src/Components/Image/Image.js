import React from 'react';
import './Image.css';
const Image = ({currentImg}) => {
  return (
    <div>
      <img className="currentImg" src={currentImg} alt="Logo"/>
    </div>
  );
}

export default Image;