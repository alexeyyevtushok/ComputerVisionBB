import React from 'react';
import './Slide.css';

const Slide = ({ property, onClick, onDelete }) => {
  const { index, picture } = property;
  return (
    <div id={`slide-${index}`} className="slide">
      <div className="imageDelete" onClick={onDelete}>
        <i className="fas fa-trash-alt" />
      </div>
      <img
        className="picture"
        src={picture}
        alt="slide"
        onClick={onClick}
        // onContextMenu={onContextMenu}
      />
    </div>
  );
};

export default Slide;
