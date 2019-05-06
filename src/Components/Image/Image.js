import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNewImageShapes } from '../../actions/imagesActions';
import './Image.css';
import DrawingField from '../DrawingField/DrawingField';

class Image extends React.Component {
  componentDidMount() {
    this.getImageShapes();
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

  render() {
    let imgUrl = 'public/nofoto-1200x800.gif';
    const imgName = this.getImageName();
    if (imgName) {
      imgUrl = `img/${imgName}`;
    }
    return (
      <div
        className="imgWrapper"
        onWheel={e => {
          document.getElementsByClassName(
            'imgWrapper',
          )[0].onmousewheel = document.onmousewheel = e => {
            e.preventDefault();
            e.returnValue = false;
          };

          const imgScale = document.getElementsByClassName('imgScale')[0];
          let delta = e.deltaY || e.detail || e.wheelDelta;
          if (delta < 0) scale += 0.05;
          else scale -= 0.05;
          imgScale.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }}
      >
        <div className="imgScale">
          <DrawingField />
          <img id="test" className="currentImg" src={imgUrl} alt="Logo" />
        </div>
      </div>
    );
  }
}

var scale = 1;

export default connect(
  null,
  { getNewImageShapes },
)(withRouter(Image));
