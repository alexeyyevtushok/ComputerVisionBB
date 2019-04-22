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
      error: false,
      editInput: -1,
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

  addEntity = e => {
    e.preventDefault();
    if (e.target.labelInput.value === '') {
      this.setState({ error: true });
    } else {
      const entity = {
        color: e.target.colorInput.value,
        label: e.target.labelInput.value,
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
    this.setState({ editInput: -1 });
  };

  modifyHandler = (event, index) => {
    event.stopPropagation();
    if (this.state.editInput === index) this.setState({ editInput: -1 });
    else this.setState({ editInput: index });
  };

  modifyAcceptHandler = (event, index) => {
    event.preventDefault();
    this.props.modifyEntity(index, event.target.modifyInput.value);
    this.setState({ editInput: -1 });
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
    console.log('entitiesfield');
    const { addInput, colorInput, labelInput, error, editInput } = this.state;
    const { entities, currEntity } = this.props;
    const styledClick = `
    .item:nth-child(${currEntity.index + 1}) {
      background: whitesmoke;
      border: 2px solid #737373;
    }
  `;
    const editClick = `
    .item:nth-child(${editInput + 1}) .modifyForm{
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
