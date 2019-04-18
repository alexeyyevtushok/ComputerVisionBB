import React from "react";
import "./Entity.css";
import axios from "axios";

const Entity = props => {
  const { item, onClick } = props;
  const { color, label } = item;
  const deleteHandler = (event, index) => {
    event.stopPropagation();
    axios.delete(`/api/entities/${index}`);
  };
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
