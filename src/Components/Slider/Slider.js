import React, {Component} from 'react';
import './Slider.css'
import Slide from '../Slide/Slide';
import data from '../../data/data';

class Slider extends Component{
  constructor(props){
    super(props)
    this.state = {
      properties: data.properties,
      mainslide: "https://ak3.picdn.net/shutterstock/videos/33521563/thumb/10.jpg?i10c=img.resize(height:160)",
    }
  }

  handleClick = (i) =>{
    this.setState({
      mainslide: i
    })
  }
  
  render(){
    const {properties, mainslide} = this.state;
    return(
      <div className="slider">
      {/*big slide*/}
        <div className="mainSlide">
          <img src={mainslide} alt=""/>
        </div>
      {/*list of slides*/}
        <div className="slideList">
          {properties.map(property => <Slide key={property._id} property={property} 
          onClick={() => this.handleClick(property.picture)}
          />)}
        </div>
      </div>
    );
  }
}

export default Slider;