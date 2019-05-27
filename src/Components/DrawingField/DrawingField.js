import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ColoredRect from '../ColoredRect/ColoredRect';
import './DrawingField.css';

import { Layer, Stage, Transformer } from 'react-konva';
import {
  addShape,
  dragShape,
  transformShape,
  chooseResize,
} from '../../actions/shapesActions';
import { saveCurrentImageShapes } from '../../actions/imagesActions';

class DrawingField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shape: null,
      isDrawing: false,
      width: 0,
      height: 0,
      zIndex: null,
      isDraggable: false,
    };
  }

  componentDidMount() {
    this.checkNode();
    this.transformer.rotateEnabled(false);
    this.transformer.keepRatio(false);
  }

  componentDidUpdate() {
    this.checkNode();
  }
  componentWillReceiveProps() {
    this.setState({
      shape: null,
      isDrawing: false,
      width: this.calculateWidth(),
      height: this.calculateHeight(),
    });
  }

  checkNode = () => {
    // here we need to manually attach or detach Transformer node
    const stage = this.transformer.getStage();
    const { resizeName } = this.props;
    const selectedNode = stage.findOne(`.${resizeName}`);

    // if clicked - > return
    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      this.setState({ zIndex: selectedNode.getZIndex(), isDraggable: true });

      selectedNode.moveToTop();
      this.transformer.moveToTop();

      // attach to another node
      this.transformer.attachTo(selectedNode);

      selectedNode.on('transformend', () => {
        selectedNode.setZIndex(this.state.zIndex);
        this.props.transformShape(selectedNode);
        this.saveShapes();
      });

      selectedNode.on('dragend', () => {
        selectedNode.setZIndex(this.state.zIndex);
        this.props.dragShape(selectedNode);
        this.saveShapes();
      });

      document.getElementsByClassName('boxesField')[0].onclick = () => {
        selectedNode.setZIndex(this.state.zIndex);
      };
    } else {
      // remove transformer
      this.transformer.detach();
      this.setState({ isDraggable: false });
    }
    this.transformer.getLayer().batchDraw();
  };

  calculateHeight = () =>
    document.getElementsByClassName('currentImg')[0].clientHeight *
    this.props.scale;

  calculateWidth = () =>
    document.getElementsByClassName('currentImg')[0].clientWidth *
    this.props.scale;

  dragHandler = rect => {};

  handleClick = e => {
    const { isDrawing, shape } = this.state;
    const { currEntity } = this.props;

    if (currEntity.index === -1) {
      return;
    }

    if (isDrawing) {
      this.saveLabeledShape(shape);
      this.setState({
        isDrawing: !isDrawing,
        shape: null,
        isDraggable: false,
      });
      return;
    }

    const newShape = {
      x: e.evt.layerX / this.props.scale,
      y: e.evt.layerY / this.props.scale,
      width: 0,
      height: 0,
      color: currEntity.color,
    };

    this.setState({
      isDraggable: false,
      isDrawing: true,
      shape: newShape,
    });
  };

  handleMouseMove = e => {
    const { isDrawing, shape } = this.state;
    const { currEntity } = this.props;

    if (currEntity.index === -1) return;

    const mouseX = e.evt.layerX / this.props.scale;
    const mouseY = e.evt.layerY / this.props.scale;

    if (isDrawing) {
      const newWidth = mouseX - shape.x;
      const newHeight = mouseY - shape.y;

      const newShape = {
        x: shape.x, // keep starting position the same
        y: shape.y,
        width: newWidth, // new width and height
        height: newHeight,
        color: shape.color,
      };

      this.setState({
        shape: newShape,
      });
    }
  };

  saveLabeledShape = () => {
    const { shape } = this.state;
    const { currEntity, shapes } = this.props;
    const labeledShape = {
      index: shapes.length,
      label: currEntity.label,
      color: currEntity.color,
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      name: `Figure${shapes.length}`,
    };
    this.props.addShape(labeledShape);
    this.saveShapes();
  };

  saveShapes = () => {
    if (this.props.match) {
      const { imgName } = this.props.match.params;
      this.props.saveCurrentImageShapes(imgName);
    }
  };

  render() {
    const { shape, width, height } = this.state;
    const { shapes } = this.props;
    let currentShape = null;
    if (shape !== null) {
      currentShape = (
        <ColoredRect
          key={`${shape.color}${shape.x}${shape.y}`}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          color={shape.color}
        />
      );
    }
    return (
      <div className="mainDrawing">
        <Stage
          className="drawingField"
          width={width}
          height={height}
          onClick={e => this.handleClick(e)}
          onContentMouseMove={this.handleMouseMove}
        >
          <Layer
            ref={ref => {
              this.layer = ref;
            }}
          >
            {shapes.map(obj => (
              <ColoredRect
                key={`${obj.color}${obj.x}${obj.y}`}
                x={obj.x}
                y={obj.y}
                width={obj.width}
                height={obj.height}
                color={obj.color}
                dragStartHandle={this.dragStartHandle}
                dragHandle={this.dragHandler}
                indexOfShape={obj.index}
                isDraggable={this.state.isDraggable}
                widthStage={
                  document.getElementsByClassName('currentImg')[0].clientWidth
                }
                heightStage={
                  document.getElementsByClassName('currentImg')[0].clientHeight
                }
              />
            ))}
            {currentShape}
            <Transformer
              ref={node => {
                this.transformer = node;
              }}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

DrawingField.propTypes = {
  shapes: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currEntity: PropTypes.shape({
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currEntity: state.entities.currEntity,
  scale: state.shapes.scale,
  shapes: state.shapes.labeledShapes,
  resizeName: state.shapes.resizeName,
});

export default connect(
  mapStateToProps,
  {
    addShape,
    saveCurrentImageShapes,
    dragShape,
    transformShape,
    chooseResize,
  },
)(withRouter(DrawingField));
