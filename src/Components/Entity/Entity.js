import React, { Component } from "react";
import "./Entity.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  submit = (e, item) => {
    e.stopPropagation();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteHandler(e, item.index)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  render() {
    const {
      item,
      onClick,
      modifyHandler,
      modifyAcceptHandler,
      modifyInput,
      changeModify,
      modifyInputError
    } = this.props;
    const { color, label } = item;
    return (
      <div className="item" onClick={onClick}>
        <div className="color" style={{ background: color }} />
        <p>{label}</p>
        <div className="icons" />
        <div className="modify">
          <i
            className="fas fa-user-edit"
            onClick={event => modifyHandler(event, item.index)}
          />
        </div>
        <div className="delete">
          <i
            className="fas fa-trash-alt"
            onClick={event => this.submit(event, item)}
          />
        </div>
        <form
          className="modifyForm"
          onClick={e => {
            e.stopPropagation();
          }}
          onSubmit={e => {
            modifyAcceptHandler(e, item.index);
          }}
        >
          <input
            style={modifyInputError ? { border: "1px solid maroon" } : {}}
            type="text"
            id="modifyInput"
            value={modifyInput}
            onChange={changeModify}
          />
          <button title="Accept" type="submit">
            <i className="fas fa-check" />
          </button>
        </form>
      </div>
    );
  }
}

export default Entity;
