import React, { Component } from "react";
import "./Entity.css";

class Entity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };
  }

  clickHandler = () => this.setState({ isClicked: !this.state.isClicked });

  render() {
    const { item } = this.props;
    const { color, label } = item;
    const { isClicked } = this.state;

    let clicked = isClicked
      ? { background: "whitesmoke", border: "2px solid #737373" }
      : {};
    return (
      <div className="item" onClick={() => this.clickHandler()} style={clicked}>
        <div className="color" style={{ background: color }} />
        <p>{label}</p>
      </div>
    );
  }
}

export default Entity;
