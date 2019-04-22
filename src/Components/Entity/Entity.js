<<<<<<< HEAD
import React from "react";
import "./Entity.css";

const Entity = props => {
  const { item, onClick, deleteHandler } = props;
  const { color, label } = item;

  // const toParent = (event,index) => {
  //   deleteHandler(event,index)
  // }

=======
import React from 'react';
import './Entity.css';

const Entity = props => {
  const {
    item,
    onClick,
    deleteHandler,
    modifyHandler,
    modifyAcceptHandler,
  } = props;
  const { color, label } = item;

>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b
  return (
    <div className="item" onClick={onClick}>
      <div className="color" style={{ background: color }} />
      <p>{label}</p>
<<<<<<< HEAD
=======
      <div className="icons" />
      <div className="modify">
        <i
          className="fas fa-user-edit"
          onClick={event => modifyHandler(event, item.index)}
        />
      </div>
>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b
      <div className="delete">
        <i
          className="fas fa-trash-alt"
          onClick={event => deleteHandler(event, item.index)}
        />
      </div>
<<<<<<< HEAD
=======
      <form
        className="modifyForm"
        onClick={e => {
          e.stopPropagation();
        }}
        onSubmit={e => {
          modifyAcceptHandler(e, item.index);
        }}
      >
        <input type="text" id="modifyInput" />
        <button title="Accept" type="submit">
          <i className="fas fa-check" />
        </button>
      </form>
>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b
    </div>
  );
};

export default Entity;
