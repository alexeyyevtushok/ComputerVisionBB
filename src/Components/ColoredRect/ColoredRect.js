import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';
import store from '../../store';

class ColoredRect extends React.Component {
  componentDidMount() {
    this.rect.strokeScaleEnabled(false);
  }

  render() {
    const currentScale = store.getState().shapes.scale;
    const {
      x,
      y,
      width,
      height,
      color,
      dragHandle,
      dragStartHandle,
      indexOfShape,
      onClick,
    } = this.props;
    return (
      <Rect
        ref={node => {
          this.rect = node;
        }}
        x={x * currentScale}
        y={y * currentScale}
        width={width * currentScale}
        height={height * currentScale}
        stroke={color}
        strokeWidth={4}
        onDragEnd={e => dragHandle(e, this.rect)}
        name={`Figure${indexOfShape}`}
        // onClick={() => {
        //   console.log(this.rect.getZIndex());
        // }}
        draggable
      />
    );
  }
}

ColoredRect.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ColoredRect;
