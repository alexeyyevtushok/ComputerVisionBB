import React, {Component} from 'react';
import './Slider.css'
import Slide from '../Slide/Slide';
import propertiesData from '../../data/properties.json';

class Slider extends Component{
  constructor(props){
    super(props)
    this.state = {
      properties: propertiesData,
      mainslide: "https://ak3.picdn.net/shutterstock/videos/33521563/thumb/10.jpg?i10c=img.resize(height:160)",
      left: 0,
    }
  }

  componentDidMount() {
    this.slider = document.getElementsByClassName('slider')[0]
}
  handleUrl = (i) => {
    this.props.onGetUrl(i);
  }

  rightClick = (value) =>  { 
    const outOfRange = -11 * (this.state.properties.length-14)
    console.log(outOfRange)
    if(this.state.left < outOfRange) this.setState({left:0});
      this.setState(prevState => {
        return {
            left: prevState.left - 11
        }
    });
  }
  leftClick = (value) =>  { 
    if(this.state.left<=-11){
      this.setState(prevState => {
        return {
            left: prevState.left + 11
        }
    })
    }
  }
  
  render(){
    const styleChange = {
      left:  this.state.left  + 'vh',
    };
    console.log(styleChange.left)
    const {properties} = this.state;
    return(
      <div className="fullSlider">
      <div className="arrows prev" onClick={() => this.leftClick(styleChange)}></div>
      <div className="slideList">
      <div className="slider" style={styleChange}>
      {/*list of slides*/}
          {properties.map(property => <Slide key={property._id} property={property} 
          onClick={() => this.handleUrl(property.picture)}
          />)}
        </div>
      </div>
      <div className="arrows next" onClick={() => this.rightClick(styleChange)}></div>     
      </div>
    );
  }
}

export default Slider;