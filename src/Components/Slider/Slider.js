import React, {Component} from 'react';
import './Slider.css'
import Slide from '../Slide/Slide';
import propertiesData from '../../data/properties.json';

class Slider extends Component{
  constructor(props){
    super(props)
    this.state = {
      properties: propertiesData,
      left: 0,
    }
  }
  /*data to Parent component*/
  handleUrl = (i) => {
    this.props.onGetUrl(i);
  }

  rightArrow = (value) =>  { 
    const outOfRange = -11 * (this.state.properties.length-14)
    if(this.state.left < outOfRange) this.setState({left:0});
      this.setState(prevState => {
        return {
            left: prevState.left - 11
        }
    });
  }
  leftArrow = (value) =>  { 
    if(this.state.left<=-11){
      this.setState(prevState => {
        return {
            left: prevState.left + 11
        }
    });
    }
  }
  
  render(){
    /*move slide*/
    const styleChange = {
      left:  this.state.left  + 'vh',
    };
    const {properties} = this.state;
    return(
      <div className="fullSlider">
      <div className="arrows prev" onClick={() => this.leftArrow(styleChange)}></div>
      <div className="slideList">
      <div className="slider" style={styleChange}>
      {/*list of slides*/}
          {properties.map(property => <Slide key={property._id} property={property} 
          onClick={() => this.handleUrl(property.picture)}
          />)}
        </div>
      </div>
      <div className="arrows next" onClick={() => this.rightArrow(styleChange)}></div>   
      </div>
    );
  }
}

export default Slider;