import React from "react";
import "./Entity.css";

const Entity = props => {
  const { item, onClick } = props;
  const { color, label } = item;
  return (
    <div className="item" onClick={onClick}>
      <div className="color" style={{ background: color }} />
      <p>{label}</p>
    </div>
  );
};

export default Entity;
