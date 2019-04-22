import React from 'react';
import './Slide.css';

const Slide = ({ property, onClick, onContextMenu }) => {
  const { index, picture } = property;
  return (
    <div id={`slide-${index}`} className="slide">
      <img
        className="picture"
        src={picture}
        alt="slide"
        onClick={onClick}
        onContextMenu={onContextMenu}
      />
      <div className="overlay" />
    </div>
  );
};

export default Slide;
