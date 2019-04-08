import React from 'react';
import Image from '../Image/Image';
import './Middle.css'

const Middle = () => {
  return (
    <div className="midleMain">
      <div className="leftbarNav">
        <p>Entities</p>
        <div className="item">
          <div className="color red"></div>
          <p>Car</p>
        </div>
        <div className="item">
          <div className="color blue"></div>
          <p>Plane</p>
        </div>
        <div className="item">
          <div className="color green"></div>
          <p>Person</p>
        </div>
      </div>
      <div className="targetImg">
        <p>Image</p>
        <Image />
      </div>
    </div>

  );
}

export default Middle;