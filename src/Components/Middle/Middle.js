import React, { Component } from "react";
import axios from "axios";
import Image from "../Image/Image";
import "./Middle.css";
import Entity from "../Entity/Entity";
import Konva from "konva";

class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      addInput: false,
      valueInput: this.generateRandomColor()
    };
  }

  generateRandomColor = () => Konva.Util.getRandomColor();

  componentDidMount() {
    axios.get("/api/entities/").then(res => {
      this.setState({
        entities: res.data
      });
    });
  }

  addEntity = e => {
    e.preventDefault();
    const entity = {
      color: e.target.color.value,
      label: e.target.label.value
    };
    axios.post("/api/entities/", entity).then(res => {
      this.setState(state => {
        const entities = state.entities.push(res.data);
        return entities;
      });
    });
    this.setState({
      valueInput: this.generateRandomColor()
    });
  };

  changeInput = () => {
    this.setState({
      addInput: !this.state.addInput,
      valueInput: this.generateRandomColor()
    });
  };

  inputValueHandler = event => {
    this.setState({
      valueInput: event.target.value
    });
  };

  render() {
    const { currentImg } = this.props;
    const { entities, addInput, valueInput } = this.state;
    return (
      <div className="midleMain">
        <div className="leftbarNav">
          <p>Entities</p>
          <div
            title="Add entity"
            onClick={() => this.changeInput()}
            className={
              addInput ? "addBtn fas fa-user-slash" : "addBtn fas fa-user-plus"
            }
          >
            <span>{addInput ? "Close" : "Add entity"}</span>
          </div>
          <form
            style={
              addInput
                ? { visibility: "visible", opacity: "1", height: "50px" }
                : {}
            }
            onSubmit={this.addEntity}
          >
            <div className="inputBox">
              <label htmlFor="label">
                {"Label: "}
                <input type="text" id="label" />
              </label>
            </div>
            <div className="inputBox">
              <label htmlFor="color">
                {"Color: "}
                <input
                  type="text"
                  id="color"
                  value={valueInput}
                  onChange={this.inputValueHandler}
                />
              </label>
            </div>
            <button title="Add entity" type="submit">
              <i className="fas fa-user-check" />
            </button>
          </form>
          {entities.map(item => (
            <Entity key={item.index} item={item} />
          ))}
        </div>
        <div className="targetImg">
          <p>Image</p>
          <Image currentImg={currentImg} />
        </div>
      </div>
    );
  }
}

export default Middle;
