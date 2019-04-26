import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNewImageShapes } from '../../actions/imagesActions';
import './Image.css';

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
      <div>
        <img className="currentImg" src={imgUrl} alt="Logo" />
      </div>
    );
  }
}

export default connect(
  null,
  { getNewImageShapes },
)(withRouter(Image));
