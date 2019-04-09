import React from 'react';
import './Entity.css';

const Entity = ({item}) => {
  const {color, label} = item;
  return (
    <div className="item">
      <div className="color" style={{background: color}}></div>
      <p>{label}</p>
    </div>
  );
}

export default Entity;