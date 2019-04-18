import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Image from "../Image/Image";
import "./Middle.css";
import Entity from "../Entity/Entity";
import DrawingField from "../DrawingField/DrawingField";
import Konva from "konva";

class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      addInput: false,
      colorInput: this.generateRandomColor(),
      labelInput: "",
      error: false,
      currEntity: -1,
      drawingMode: false
    };
  }

  generateRandomColor = () => Konva.Util.getRandomColor();

  componentDidMount() {
    this.getReq();
  }

  componentDidUpdate() {
    this.getReq();
  }

  getReq = () => {
    axios.get("/api/entities/").then(res => {
      this.setState({
        entities: res.data
      });
    });
  };

  addEntity = e => {
    e.preventDefault();
    if (e.target.label.value === "") {
      this.setState({ error: true });
    } else {
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
        colorInput: this.generateRandomColor(),
        labelInput: "",
        error: false
      });
    }
  };

  deleteHandler = (event, index) => {
    event.stopPropagation();
    this.entityClick(index);
    axios.delete(`/api/entities/${index}`);
  };

  changeInput = () => {
    this.setState({
      addInput: !this.state.addInput,
      colorInput: this.generateRandomColor(),
      error: false
    });
  };

  inputColorValueHandler = event => {
    this.setState({
      colorInput: event.target.value
    });
  };

  inputLabelValueHandler = event => {
    this.setState({
      labelInput: event.target.value
    });
  };

  entityClick = index => {
    if (this.state.currEntity === index) {
      this.setState({ currEntity: -1, drawingMode: false });
    } else {
      this.setState({ currEntity: index, drawingMode: true });
    }
  };

  render() {
    const { currentImg } = this.props;
    const {
      entities,
      addInput,
      colorInput,
      labelInput,
      error,
      currEntity,
      drawingMode
    } = this.state;
    let drawingField = null;
    if (drawingMode) {
      drawingField = (
        <DrawingField
          drawingMode={drawingMode}
          currentColor={entities[currEntity].color}
        />
      );
    } else {
      drawingField = (
        <DrawingField drawingMode={drawingMode} currentColor={"none"} />
      );
    }

    const styledClick = `
    .item:nth-child(${currEntity + 1}) {
      background: whitesmoke;
      border: 2px solid #737373;
    }
  `;
    return (
      <div>
        <style jsx="">{styledClick}</style>
        <div className="midleMain">
          <div className="leftbarNav">
            <p>Entities</p>
            <div
              title="Add entity"
              onClick={() => this.changeInput()}
              className={
                addInput
                  ? "addBtn fas fa-user-slash"
                  : "addBtn fas fa-user-plus"
              }
            >
              <span>{addInput ? "Close" : "Add entity"}</span>
            </div>
            <form
              style={
                addInput
                  ? { visibility: "visible", opacity: "1", height: "57px" }
                  : {}
              }
              onSubmit={this.addEntity}
            >
              <div
                className="errorField"
                style={
                  error
                    ? { visibility: "visible", opacity: "1", height: "20px" }
                    : {}
                }
              >
                Incorrect input
              </div>
              <div className="inputBox">
                <label htmlFor="label">
                  {"Label: "}
                  <input
                    style={error ? { border: "1px solid maroon" } : {}}
                    type="text"
                    id="label"
                    value={labelInput}
                    onChange={this.inputLabelValueHandler}
                  />
                </label>
              </div>
              <div className="inputBox">
                <label htmlFor="color">
                  {"Color: "}
                  <input
                    type="text"
                    id="color"
                    value={colorInput}
                    onChange={this.inputColorValueHandler}
                  />
                </label>
              </div>
              <button title="Add entity" type="submit">
                <i className="fas fa-user-check" />
              </button>
            </form>
            <div className="items">
              {entities.map(item => (
                <Entity
                  key={item.index}
                  item={item}
                  onClick={() => this.entityClick(item.index)}
                  deleteHandler={this.deleteHandler}
                />
              ))}
            </div>
          </div>
          <div className="targetImg">
            <p>Image</p>
            {drawingField}
            <Image currentImg={currentImg} />
          </div>
        </div>
      </div>
    );
  }
}

Middle.propTypes = {
  currentImg: PropTypes.string.isRequired
};

export default Middle;
