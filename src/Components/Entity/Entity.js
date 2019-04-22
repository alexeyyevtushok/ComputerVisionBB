import React from 'react';
import './Entity.css';

const Entity = props => {
  const { item, onClick, deleteHandler } = props;
  const { color, label } = item;

  return (
    <div className="item" onClick={onClick}>
      <div className="color" style={{ background: color }} />
      <p>{label}</p>
      <div className="delete">
        <i
          className="fas fa-trash-alt"
          onClick={event => deleteHandler(event, item.index)}
        />
      </div>
    </div>
  );
};

export default Entity;
