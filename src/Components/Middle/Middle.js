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
    }
  }
  render(){
    const {currentImg} = this.props;
    const {entities} = this.state;
    console.log(entities);
    return (
      <div className="midleMain">
        <div className="leftbarNav">
          <p>Entities</p>
          {entities.map(item => <Entity key={item.index} item={item}/>)}
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