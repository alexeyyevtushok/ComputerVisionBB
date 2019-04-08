import React from 'react';
import './Slide.css';

const Slide = ({property,onClick}) => {
  const {index, picture} = property;
  return (
      <div id={`slide-${index}`} className="slide">
          <img src={picture} alt="slide" onClick={onClick}/>
      </div>
  );
}

export default Slide;