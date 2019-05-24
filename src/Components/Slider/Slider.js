import React, { Component } from "react";
import "./Slider.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Slide from "../Slide/Slide";
import { deleteImage } from "../../actions/imagesActions";
import { clearShape, chooseResize } from "../../actions/shapesActions";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      imgIndex: null,
    };
  }

  componentDidMount() {
    document.onkeyup = e => {
      const { imgIndex } = this.state;
      const { images } = this.props;
      if (images.length > 0) {
        //set current image index to state
        if (imgIndex === null && this.props.match) {
          const { imgName } = this.props.match.params;
          const image = images.find(image => {
            if (image.picture.slice(4) === imgName) {
              return image;
            }
          });
          this.setState({ imgIndex: image.index }, () => {
            this.reactToKey(e, this.state.imgIndex, images);
          });
        } else {
          this.reactToKey(e, imgIndex, images);
        }
      }
    };
  }

  reactToKey = (e, imgIndex, images) => {
    // left arrow
    if (e.which === 37) {
      if (imgIndex === 0) {
        this.changeImage(images[images.length - 1]);
      } else {
        this.changeImage(images[imgIndex - 1]);
      }
    }
    // right arrow
    if (e.which === 39) {
      if (images.length > imgIndex + 1) {
        this.changeImage(images[imgIndex + 1]);
      } else {
        this.changeImage(images[0]);
      }
    }
  };

  componentDidUpdate() {
    if (!this.props.match) {
      const { images } = this.props;
      if (images.length > 0) {
        const newImg = images[0].picture.slice(4);
        this.props.history.push(`/${newImg}`);
      }
    }
  }

  changeImage = img => {
    this.props.chooseResize("");
    this.props.clearShape();
    const newImg = img.picture.slice(4);
    this.props.history.push(`/${newImg}`);
    this.setState({
      imgIndex: img.index,
    });
  };

  deleteSlide = img => {
    if (window.confirm("Do you want to delete this picture?")) {
      const { params } = this.props.match;
      this.props.deleteImage(img.slice(4)).then(res => {
        console.log(res);
        if (params) {
          if (img.slice(4) === params.imgName) {
            this.props.history.push("/");
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
        <div
          className="arrows prev"
          onClick={() => this.leftArrow(styleChange)}
        />
        <div className="slideList">
          <div className="slider" style={styleChange}>
            {/* list of slides */}
            {images.map(property => (
              <Slide
                key={property._id}
                property={property}
                onClick={() => this.changeImage(property)}
                onDelete={() => this.deleteSlide(property.picture)}
              />
            ))}
          </div>
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
    clearShape,
    chooseResize,
  }
)(withRouter(Slider));
