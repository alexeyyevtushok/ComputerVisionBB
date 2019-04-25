import React from 'react';
import './Box.css';

const Box = props => {
  const { color, label, onClick } = props;
  return (
    <div className="boxesItem" onClick={onClick}>
      <div className="boxesColor" style={{ background: color }} />
      <p>{label}</p>
    </div>
  );
};

export default Box;
