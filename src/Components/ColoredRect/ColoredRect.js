import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';
import store from '../../store';

class ColoredRect extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const currentScale = store.getState().shapes.scale;
    this.rect.strokeScaleEnabled(false);
    this.rect.on('dragmove', () => {
      console.log(this.rect.x());
      var x = Math.max(
        0,
        Math.min(this.props.widthStage - this.props.width, this.rect.x()),
      );
      var y = Math.max(
        0,
        Math.min(this.props.heightStage - this.props.height, this.rect.y()),
      );
      this.rect.x(x);
      this.rect.y(y);
    });
  }

  render() {
    const currentScale = store.getState().shapes.scale;
    const { x, y, width, height, color, dragHandle, indexOfShape } = this.props;
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
        onDragEnd={() => dragHandle(this.rect)}
        name={`Figure${indexOfShape}`}
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
