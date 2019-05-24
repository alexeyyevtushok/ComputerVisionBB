import React from 'react';
import './Box.css';

const Box = props => {
  const { color, label, onClickToDel, onClick } = props;
  return (
    <div className="boxesItem" onClick={onClick}>
      <div className="boxesColor" style={{ background: color }} />
      <p>{label}</p>
      <div className="boxesIcons" />
      <div className="boxesDelete">
        <i className="fas fa-trash-alt" onClick={onClickToDel} />
      </div>
    </div>
  );
};

export default Box;
