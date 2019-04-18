import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Entity from "../Entity/Entity";
import Konva from "konva";

class EntitiesField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      addInput: false,
      colorInput: this.generateRandomColor(),
      labelInput: "",
      error: false,
      currEntity: -1
      //   drawingMode: false,
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
    if (index === this.state.currEntity) {
      this.setState({ currEntity: -1, drawingMode: false });
    }
    event.stopPropagation();
    axios.delete(`/api/entities/${index}`);
  };

  entityClick = index => {
    if (this.state.currEntity === index) {
      this.props.setCurrentEntity(null);
      this.setState({ currEntity: -1 });
    } else {
      this.props.setCurrentEntity(this.state.entities[index]);
      this.setState({ currEntity: index });
    }
  };

  render() {
    const {
      entities,
      addInput,
      colorInput,
      labelInput,
      error,
      currEntity
    } = this.state;

    const styledClick = `
    .item:nth-child(${currEntity + 1}) {
      background: whitesmoke;
      border: 2px solid #737373;
    }
  `;
    return (
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
          <style jsx="">{styledClick}</style>
        </div>
      </div>
    );
  }
}

export default EntitiesField;
