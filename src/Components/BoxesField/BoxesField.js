import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './BoxesField.css';
import Box from '../Box/Box';
import { delShape } from '../../actions/shapesActions';
import { saveCurrentImageShapes } from '../../actions/imagesActions';

class BoxesField extends Component {
  clickHandler = (current, index) => {
    if (window.confirm('Do you want to delete this box?')) {
      this.props.delShape(current, index);
      if (this.props.match) {
        const { imgName } = this.props.match.params;
        this.props.saveCurrentImageShapes(imgName);
      }
    }
  };

  render() {
    const { shapes } = this.props;
    return (
      <div className="boxesField">
        <p>Bounding boxes</p>
        <div className="boxesList">
          {shapes.map(item => (
            <Box
              color={item.color}
              label={item.label}
              key={`${item.color}${item.x}${item.y}`}
              onClick={() =>
                this.clickHandler(this.props.currentImg, item.index)
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shapes: state.shapes.labeledShapes,
  currentImg: state.images.currentImg,
});

export default connect(
  mapStateToProps,
  {
    delShape,
    saveCurrentImageShapes,
  },
)(withRouter(BoxesField));
