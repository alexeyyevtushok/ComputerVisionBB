import React, { Component } from 'react';
import './Slider.css';
import { connect } from 'react-redux';
import Slide from '../Slide/Slide';
import axios from 'axios';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { deleteImage } from '../../actions/imagesActions';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      left: 0,
      clickedSlide: null,
    };
  }

  componentWillReceiveProps() {
    this.getReq();
  }

  componentDidMount() {
    this.getReq();
  }

  getReq = () => {
    axios.get('/api/images/').then(res => {
      this.setState({
        properties: res.data,
      });
    });
  };

  /*data to Parent component*/
  handleUrl = i => {
    this.props.onGetUrl(i);
  };

  handleRightClick = (e, i) => {
    e.preventDefault();
    this.setState({ clickedSlide: i });
  };

  rightArrow = () => {
    const outOfRange = -11 * (this.state.properties.length - 14);
    if (this.state.left < outOfRange) this.setState({ left: 0 });
    this.setState(prevState => {
      return {
        left: prevState.left - 11,
      };
    });
  };

  leftArrow = () => {
    if (this.state.left <= -11) {
      this.setState(prevState => {
        return {
          left: prevState.left + 11,
        };
      });
    }
  };

  deleteSlide = () => {
    this.props.deleteImage(this.state.clickedSlide.slice(26));
  };

  render() {
    /*move slide*/
    const styleChange = {
      left: this.state.left + 'vh',
    };
    const { properties } = this.state;
    return (
      <div className="fullSlider">
        <ContextMenu className="contextMenu" id="some_unique_identifier">
          <MenuItem onClick={this.deleteSlide}>
            <i className="fas fa-trash-alt" /> Delete
          </MenuItem>
          <MenuItem onClick={this.handleClick}>
            <i className="fas fa-undo" />
            Undo
          </MenuItem>
        </ContextMenu>
        <div
          className="arrows prev"
          onClick={() => this.leftArrow(styleChange)}
        />
        <div className="slideList">
          <ContextMenuTrigger id="some_unique_identifier">
            <div className="slider" style={styleChange}>
              {/*list of slides*/}
              {properties.map(property => (
                <Slide
                  key={property._id}
                  property={property}
                  onClick={() => this.handleUrl(property.picture)}
                  onContextMenu={e =>
                    this.handleRightClick(e, property.picture)
                  }
                />
              ))}
            </div>
          </ContextMenuTrigger>
        </div>
        <div
          className="arrows next"
          onClick={() => this.rightArrow(styleChange)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    deleteImage,
  },
)(Slider);
