import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Konva from 'konva';
import {
  addEntity,
  deleteEntity,
  modifyEntity,
  setCurrEntity,
  setEmptyCurrEntity,
} from '../../actions/entitiesActions';
import Entity from '../Entity/Entity';

class EntitiesField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInput: false,
      colorInput: this.generateRandomColor(),
      labelInput: '',
      modifyInput: '',
      error: false,
      modifyInputError: false,
      modifyInputIndex: -1,
    };
  }

  generateRandomColor = () => Konva.Util.getRandomColor();

  changeInput = () => {
    this.setState(prevState => ({
      addInput: !prevState.addInput,
      colorInput: this.generateRandomColor(),
      error: false,
    }));
  };

  inputHandler = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  isDublicate = (value, property) => {
    const entitiesArr = this.props.entities;
    for (let i = 0; i < entitiesArr.length; i++) {
      if (entitiesArr[i][property] === value) return true;
    }
    return false;
  };

  addEntity = e => {
    e.preventDefault();
    let colorValue = e.target.colorInput.value;
    let labelValue = e.target.labelInput.value;
    if (
      labelValue === '' ||
      !/^[a-zA-Z]{3,15}$/.test(labelValue) ||
      this.isDublicate(labelValue, 'label')
    ) {
      this.setState({ error: true, labelInput: '' });
    } else {
      if (this.isDublicate(colorValue, 'color')) {
        colorValue = this.generateRandomColor();
      }
      const entity = {
        color: colorValue,
        label: labelValue,
      };
      this.props.addEntity(entity);
      this.setState({
        colorInput: this.generateRandomColor(),
        labelInput: '',
        error: false,
      });
    }
  };

  deleteHandler = (event, index) => {
    const { currEntity } = this.props;

    if (index === currEntity.index) {
      this.props.setEmptyCurrEntity();
    }
    event.stopPropagation();
    this.props.deleteEntity(index);
    this.setState({ modifyInputIndex: -1 });
  };

  modifyHandler = (event, index) => {
    event.stopPropagation();
    if (this.state.modifyInputIndex === index)
      this.setState({
        modifyInputIndex: -1,
        modifyInput: '',
        modifyInputError: false,
      });
    else this.setState({ modifyInputIndex: index });
  };

  modifyAcceptHandler = (event, index) => {
    event.preventDefault();
    let value = event.target.modifyInput.value;
    if (
      value === '' ||
      !/^[a-zA-Z]{3,15}$/.test(value) ||
      this.isDublicate(value, 'label')
    ) {
      this.setState({ modifyInput: '', modifyInputError: true });
    } else {
      this.props.modifyEntity(index, value);
      this.setState({
        modifyInputIndex: -1,
        modifyInput: '',
        modifyInputError: false,
      });
    }
  };

  entityClick = index => {
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
      modifyInputError,
    } = this.state;
    const { entities, currEntity } = this.props;
    const styledClick = `
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
      <div className="leftbarNav">
        <p>Entities</p>
        <div
          title="Add entity"
          onClick={() => this.changeInput()}
          className={
            addInput ? 'addBtn fas fa-user-slash' : 'addBtn fas fa-user-plus'
          }
        >
          <span>{addInput ? 'Close' : 'Add entity'}</span>
        </div>
        <form
          style={
            addInput
              ? { visibility: 'visible', opacity: '1', height: '57px' }
              : {}
          }
          className="entFieldForm"
          onSubmit={this.addEntity}
        >
          <div
            className="errorField"
            style={
              error
                ? { visibility: 'visible', opacity: '1', height: '20px' }
                : {}
            }
          >
            {'Incorrect input'}
          </div>
          <div className="inputBox">
            <label htmlFor="label">
              {'Label: '}
              <input
                style={error ? { border: '1px solid maroon' } : {}}
                type="text"
                id="labelInput"
                value={labelInput}
                onChange={this.inputHandler}
              />
            </label>
          </div>
          <div className="inputBox">
            <label htmlFor="color">
              {'Color: '}
              <input
                type="text"
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
          <style jsx="">{styledClick}</style>
          <style jsx="">{editClick}</style>
        </div>
      </div>
    );
  }
}
const entityShape = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

EntitiesField.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape(entityShape)).isRequired,
  currEntity: PropTypes.shape(entityShape).isRequired,
  addEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  setCurrEntity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entities: state.entities.entities,
  currEntity: state.entities.currEntity,
});

export default connect(
  mapStateToProps,
  {
    addEntity,
    deleteEntity,
    modifyEntity,
    setCurrEntity,
    setEmptyCurrEntity,
  },
)(EntitiesField);
