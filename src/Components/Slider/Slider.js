import React, { Component } from 'react';
import './Slider.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import Slide from '../Slide/Slide';
import { deleteImage, clearShape } from '../../actions/imagesActions';

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

  handleClick = (img) => {
    this.props.clearShape();
    const newImg = img.slice(4);
    this.props.history.push(`/${newImg}`);
  };

  deleteSlide = (img) => {
    if (window.confirm('Do you want to delete this picture?')) {
      const { params } = this.props.match;
      this.props.deleteImage(img.slice(4)).then((res) => {
        console.log(res);
        if (params) {
          if (img.slice(4) === params.imgName) {
            this.props.history.push('/');
          }
        }
      });
    }
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
        <div className="arrows prev" onClick={() => this.leftArrow(styleChange)} />
        <div className="slideList">
          <div className="slider" style={styleChange}>
            {/* list of slides */}
            {images.map(property => (
              <Slide
                key={property._id}
                property={property}
                onClick={() => this.handleClick(property.picture)}
                onDelete={() => this.deleteSlide(property.picture)}
              />
            ))}
          </div>
        </div>
        <div className="arrows next" onClick={() => this.rightArrow(styleChange)} />
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
    clearShape,
  },
)(withRouter(Slider));
