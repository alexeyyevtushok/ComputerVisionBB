import React, { Component } from "react";
import axios from "axios";
import Image from "../Image/Image";
import "./Middle.css";
import Entity from "../Entity/Entity";

class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      addInput: false
    };
  }

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
  };

  changeInput = () => {
    this.setState({
      addInput: !this.state.addInput
    });
  };

  currentEntity = color => {
    this.setState({
      currentColor: color
    });
  };

  render() {
    const { currentImg } = this.props;
    const { entities, addInput, currentColor } = this.state;
    console.log(entities);
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
              <label htmlFor="color">
                {"Color: "}
                <input type="text" id="color" />
              </label>
            </div>
            <div className="inputBox">
              <label htmlFor="label">
                {"Label: "}
                <input type="text" id="label" />
              </label>
            </div>
            <button title="Add entity" type="submit">
              <i className="fas fa-user-check" />
            </button>
          </form>
          <div className="currColor">
            Current:
            <div style={{ background: currentColor }} />
          </div>
          {entities.map(item => (
            <Entity
              key={item.index}
              item={item}
              onClick={() => this.currentEntity(item.color)}
            />
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
