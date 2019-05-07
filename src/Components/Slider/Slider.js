import React, { Component } from 'react';
import './Slider.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import Slide from '../Slide/Slide';
import {
  deleteImage,
  saveCurrentImageShapes,
} from '../../actions/imagesActions';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      clickedSlide: null,
    };
  }

  componentDidUpdate() {
    if (!this.props.match) {
      const { images } = this.props;
      if (images.length > 0) {
        const newImg = images[0].picture.slice(4);
        this.props.history.push(`/${newImg}`);
      }
    }
  }

  handleClick = img => {
    if (this.props.match) {
      const { imgName } = this.props.match.params;
      this.props.saveCurrentImageShapes(imgName);
    }
    const newImg = img.slice(4);
    this.props.history.push(`/${newImg}`);
  };

  handleRightClick = (e, i) => {
    e.preventDefault();
    this.setState({ clickedSlide: i });
  };

  deleteSlide = () => {
    const { clickedSlide } = this.state;
    const { params } = this.props.match;
    this.props.deleteImage(clickedSlide.slice(4)).then(res => {
      console.log(res);
      if (params) {
        if (clickedSlide.slice(4) === params.imgName) {
          this.props.history.push('/');
        }
      }
    });
  };

  leftArrow = () => {
    if (this.state.left <= -11) {
      this.setState(prevState => ({
        left: prevState.left + 11,
      }));
    }
  };

  rightArrow = () => {
    const outOfRange = -11 * (this.props.images.length - 14);
    if (this.state.left < outOfRange) this.setState({ left: 0 });
    this.setState(prevState => ({
      left: prevState.left - 11,
    }));
  };

  render() {
    // Move slider.
    const styleChange = {
      left: `${this.state.left}vh`,
    };
    const { images } = this.props;
    return (
      <div className="fullSlider">
        <ContextMenu className="contextMenu" id="some_unique_identifier">
          <MenuItem onClick={this.deleteSlide}>
            <i className="fas fa-trash-alt" /> Delete
          </MenuItem>
        </ContextMenu>
        <div
          className="arrows prev"
          onClick={() => this.leftArrow(styleChange)}
        />
        <div className="slideList">
          <ContextMenuTrigger id="some_unique_identifier">
            <div className="slider" style={styleChange}>
              {/* list of slides */}
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
    saveCurrentImageShapes,
  },
)(withRouter(Slider));
