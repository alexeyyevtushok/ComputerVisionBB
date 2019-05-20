import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNewImageShapes } from '../../actions/imagesActions';
import { plusScale, minusScale } from '../../actions/shapesActions';
import './Image.css';
import DrawingField from '../DrawingField/DrawingField';
import store from '../../store';

class Image extends React.Component {
  componentDidMount() {
    this.getImageShapes();
    //disable wheel
    document
      .getElementsByClassName('imgWrapper')[0]
      .addEventListener('wheel', e => e.preventDefault(), { passive: false });
  }

  componentDidUpdate() {
    this.getImageShapes();
  }

  getImageShapes = () => {
    const imgName = this.getImageName();
    if (imgName) {
      this.props.getNewImageShapes(imgName);
    }
  };

  getImageName = () => {
    if (this.props.match) {
      const { imgName } = this.props.match.params;
      return imgName;
    }
    return null;
  };

  scaleHandler = e => {
    const imgScale = document.getElementsByClassName('imgScale')[0];
    let delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta < 0) {
      this.props.plusScale();
    } else {
      this.props.minusScale();
    }
    imgScale.style.transform = ` scale(${store.getState().shapes.scale})`;
  };

  render() {
    let imgUrl = 'public/nofoto-1200x800.gif';
    const imgName = this.getImageName();
    if (imgName) {
      imgUrl = `img/${imgName}`;
    }
    return (
      <div className="imgWrapper" onWheel={this.scaleHandler}>
        <div className="imgScale">
          <img className="currentImg" src={imgUrl} alt="Add file" />
        </div>
        <DrawingField />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scale: state.shapes.scale,
});

export default connect(
  mapStateToProps,
  { getNewImageShapes, plusScale, minusScale },
)(withRouter(Image));
