import React from 'react';
import './Entity.css';

const Entity = ({item,onClick}) => {
  const {color, label} = item;
  return (
    <div className="item" onClick={onClick}>
      <div className="color" style={{background: color}}></div>
      <p>{label}</p>
    </div>
  );
}

export default Entity;