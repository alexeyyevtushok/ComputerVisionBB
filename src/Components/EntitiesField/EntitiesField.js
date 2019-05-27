import React from "react";
import "./EntitiesField.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Konva from "konva";
import {
  addEntity,
  deleteEntity,
  modifyEntity,
  setCurrEntity,
  setEmptyCurrEntity
} from "../../actions/entitiesActions";
import { chooseResize } from "../../actions/shapesActions";
import Entity from "../Entity/Entity";

class EntitiesField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInput: false,
      colorInput: this.generateRandomColor(),
      labelInput: "",
      modifyInput: "",
      error: false,
      modifyInputError: false,
      modifyInputIndex: -1
    };
  }

  generateRandomColor = () => Konva.Util.getRandomColor();

  // Makes 'add entity' form visible/unvisible.
  changeInput = () => {
    this.setState(prevState => ({
      addInput: !prevState.addInput,
      colorInput: this.generateRandomColor(),
      error: false
    }));
  };

  // Input value.
  inputHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // Validator is some value already exist.
  isDublicate = (value, property) => {
    const entitiesArr = this.props.entities;
    for (let i = 0; i < entitiesArr.length; i++) {
      if (entitiesArr[i][property] === value) return true;
    }
    return false;
  };

  isCorrectTemplate = value => {
    return !/^[a-zA-Z]{3,15}$/.test(value);
  };

  addEntity = e => {
    e.preventDefault();
    let colorValue = e.target.colorInput.value.toLowerCase();
    const labelValue = e.target.labelInput.value.toLowerCase();
    if (
      this.isCorrectTemplate(labelValue) ||
      this.isDublicate(labelValue, "label")
    ) {
      this.setState({ error: true });
    } else {
      if (this.isDublicate(colorValue, "color")) {
        colorValue = this.generateRandomColor();
      }
      const entity = {
        color: colorValue,
        label: labelValue
      };
      this.props.addEntity(entity);
      this.setState({
        colorInput: this.generateRandomColor(),
        labelInput: "",
        error: false
      });
    }
  };

  deleteHandler = (event, index) => {
    event.stopPropagation();
    const { currEntity } = this.props;

    if (index === currEntity.index) {
      this.props.setEmptyCurrEntity();
    }
    event.stopPropagation();
    this.props.deleteEntity(index);
    this.setState({ modifyInputIndex: -1 });
  };

  // Make edit field visible/unvisible.
  modifyHandler = (event, index) => {
    event.stopPropagation();
    if (this.state.modifyInputIndex === index) {
      this.setState({
        modifyInputIndex: -1,
        modifyInput: this.props.entities[index].label,
        modifyInputError: false
      });
    } else {
      this.setState({
        modifyInputIndex: index,
        modifyInput: this.props.entities[index].label
      });
    }
  };

  // Save new label.
  modifyAcceptHandler = (event, index) => {
    event.preventDefault();
    const value = event.target.modifyInput.value.toLowerCase();
    if (this.isCorrectTemplate(value) || this.isDublicate(value, "label")) {
      this.setState({ modifyInputError: true });
    } else {
      this.props.modifyEntity(index, value);
      this.setState({
        modifyInputIndex: -1,
        modifyInputError: false
      });
    }
  };

  entityClick = index => {
    this.props.chooseResize("");
    const { currEntity, entities } = this.props;
    if (index === currEntity.index) {
      this.props.setEmptyCurrEntity();
    } else {
      this.props.setCurrEntity(entities[index]);
    }
  };

  render() {
    const {
      addInput,
      colorInput,
      labelInput,
      error,
      modifyInputIndex,
      modifyInput,
      modifyInputError
    } = this.state;
    const { entities, currEntity } = this.props;
    const currentClick = `
    .item:nth-child(${currEntity.index + 1}) {
      background: whitesmoke;
      border: 2px solid #737373;
    }
  `;
    const editClick = `
    .item:nth-child(${modifyInputIndex + 1}) .modifyForm{
      visibility: visible;
      opacity:1;
    }
  `;
    return (
      <div className="entitiesField">
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
          className="entFieldForm"
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
            {"Incorrect input"}
          </div>
          <div className="inputBox">
            <label htmlFor="label">
              {"Label: "}
              <input
                style={error ? { border: "1px solid maroon" } : {}}
                type="text"
                id="labelInput"
                value={labelInput}
                onChange={this.inputHandler}
              />
            </label>
          </div>
          <div className="inputBox">
            <label htmlFor="color">
              {"Color: "}
              <input
                type="color"
                id="colorInput"
                value={colorInput}
                onChange={this.inputHandler}
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
              modifyHandler={this.modifyHandler}
              modifyAcceptHandler={this.modifyAcceptHandler}
              modifyInput={modifyInput}
              changeModify={this.inputHandler}
              modifyInputError={modifyInputError}
            />
          ))}
          <style jsx="">{currentClick}</style>
          <style jsx="">{editClick}</style>
        </div>
      </div>
    );
  }
}
const entityShape = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

EntitiesField.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape(entityShape)).isRequired,
  currEntity: PropTypes.shape(entityShape).isRequired,
  addEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  setCurrEntity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  entities: state.entities.entities,
  currEntity: state.entities.currEntity
});

export default connect(
  mapStateToProps,
  {
    addEntity,
    deleteEntity,
    modifyEntity,
    setCurrEntity,
    setEmptyCurrEntity,
    chooseResize
  }
)(EntitiesField);
