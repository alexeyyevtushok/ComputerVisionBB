import React from 'react';
import './Box.css';

const Box = props => {
  const { color, label, onClick } = props;
  return (
    <div className="boxesItem">
      <div className="boxesColor" style={{ background: color }} />
      <p>{label}</p>

      <div className="boxesIcons" />
      <div className="boxesDelete">
        <i className="fas fa-trash-alt" onClick={onClick} />
      </div>
    </div>
  );
};

export default Box;
