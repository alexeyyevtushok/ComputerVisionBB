import React, { Component } from 'react';
import Image from '../Image/Image';
import './Middle.css';
import Entity from '../Entity/Entity';
import entitiesData from '../../data/entities.json';

class Middle extends Component{
  constructor(props){
    super(props)
    this.state = {
      entities: entitiesData,
      addInput:false,
      currentColor: null,
    }
  }

  changeInput = () => {
    this.setState({
      addInput : !this.state.addInput
    })
  }

  currentEntity = (color) => {
    this.setState({
      currentColor : color
    })
  }

  render(){
    const {currentImg} = this.props;
    const {entities,addInput,currentColor} = this.state;
    console.log(entities);
    return (
      <div className="midleMain">
        <div className="leftbarNav">
          <p>Entities</p>
          <div title="Add entity" 
            onClick={() => this.changeInput()}
            className={addInput ? "addBtn fas fa-user-slash" : "addBtn fas fa-user-plus"}
            ><span>{addInput ? 'Close' : 'Add entity'}</span>
          </div>
          <form style={addInput ? {visibility: "visible",opacity: "1",height:"50px"} : {}}>
            <div className="inputBox">
              <label>Color: </label>
              <input type="text"></input>
            </div>
            <div className="inputBox">
              <label>Label: </label>
              <input type="text"></input>
            </div>
            <button title="Add entity" type="submit"><i className="fas fa-user-check"></i></button>  
          </form>
          <div className="currColor">Current: <div style={{background: currentColor}}></div></div>
          {entities.map(item => <Entity key={item.index} item={item} onClick={() => this.currentEntity(item.color)}/>)}
        </div>
        <div className="targetImg">
          <p>Image</p>
          <Image currentImg={currentImg}/>
        </div>
      </div>
    );
  }
}

export default Middle;