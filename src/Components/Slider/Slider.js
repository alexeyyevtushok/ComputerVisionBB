import React, { Component } from 'react';
import './Slider.css';
import { connect } from 'react-redux';
import Slide from '../Slide/Slide';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { deleteImage, imageOnClick } from '../../actions/imagesActions';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      clickedSlide: null,
    };
  }

  handleClick = i => {
    this.props.imageOnClick(i);
  };

  handleRightClick = (e, i) => {
    e.preventDefault();
    this.setState({ clickedSlide: i });
  };

  deleteSlide = () => {
    this.props.deleteImage(this.state.clickedSlide.slice(26));
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

  rightArrow = () => {
    const outOfRange = -11 * (this.props.images.length - 14);
    if (this.state.left < outOfRange) this.setState({ left: 0 });
    this.setState(prevState => {
      return {
        left: prevState.left - 11,
      };
    });
  };

  render() {
    /*move slide*/
    const styleChange = {
      left: this.state.left + 'vh',
    };
    const { images } = this.props;
    return (
      <div className="fullSlider">
        <ContextMenu className="contextMenu" id="some_unique_identifier">
          <MenuItem onClick={this.deleteSlide}>
            <i className="fas fa-trash-alt" /> Delete
          </MenuItem>
          <MenuItem>
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
              {images.map(property => (
                <Slide
                  key={property._id}
                  property={property}
                  onClick={() => this.handleClick(property.picture)}
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

const mapStateToProps = state => ({
  images: state.images.images,
});

export default connect(
  mapStateToProps,
  {
    deleteImage,
    imageOnClick,
  },
)(Slider);
