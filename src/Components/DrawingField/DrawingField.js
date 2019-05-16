import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import { addShape, dragShape,transformShape } from '../../actions/shapesActions';
import { saveCurrentImageShapes } from '../../actions/imagesActions';
import ColoredRect from '../ColoredRect/ColoredRect';
import './DrawingField.css';
import TransformerComponent from '../ColoredRect/TransformerComponent'

class DrawingField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shape: null,
      isDrawing: false,
      width: 0,
      height: 0,
      selectedShapeName: ''
    };
  }

  componentWillReceiveProps() {
    
    this.setState({
      shape: null,
      isDrawing: false,
      width: this.calculateWidth(),
      height: this.calculateHeight(),
    });
  }

  calculateHeight = () =>
    document.getElementsByClassName('currentImg')[0].clientHeight *
    this.props.scale;

  calculateWidth = () =>
    document.getElementsByClassName('currentImg')[0].clientWidth *
    this.props.scale;

  handleClick = e => {
    // console.log(e.evt.layerX);
    // e.evt.layerX = {value:1000,writable: true}
    const { isDrawing, shape } = this.state;
    const { currEntity } = this.props;

    if (currEntity.index === -1) return;

    if (isDrawing) {
      this.saveLabeledShape(shape);
      this.setState({
        isDrawing: !isDrawing,
        shape: null,
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
      isDrawing: true,
      shape: newShape,
    });
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
    if (this.props.match) {
      const { imgName } = this.props.match.params;
      this.props.saveCurrentImageShapes(imgName);
    }
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

  handleInnerClick = e => {
    if (!this.state.isDrawing) {
      e.cancelBubble = true;
      console.log('inner');
    }
  };

  dragHandler = e => {
    console.log(e)
    this.props.dragShape(e);
    if (this.props.match) {
      const { imgName } = this.props.match.params;
      this.props.saveCurrentImageShapes(imgName);
    }
  };

  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ''
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    const rect = this.props.shapes.find(r => r.name === name);
    if (rect) {
      console.log(e)
      this.setState({
        selectedShapeName: name
      });
      this.props.transformShape(e);
      // if (this.props.match) {
      //   const { imgName } = this.props.match.params;
      //   this.props.saveCurrentImageShapes(imgName);
      // }
    } else {
      this.setState({
        selectedShapeName: ''
      });
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
          onClick={this.handleInnerClick}
        />
      );
    }
    return (
      <div className="mainDrawing">
        <Stage
          className="drawingField"
          width={width}
          height={height}
          onClick={(e)=>this.handleClick(e)}
          onContentMouseMove={this.handleMouseMove}
          onMouseDown={this.handleStageMouseDown}
        >
          <Layer
            ref={ref => {
              this.layer = ref;
            }}
          >
          
            {shapes.map(obj => {
              console.log(obj.index)
              return(              <ColoredRect
                key={`${obj.color}${obj.x}${obj.y}`}
                x={obj.x}
                y={obj.y}
                width={obj.width}
                height={obj.height}
                color={obj.color}
                onClick={this.handleInnerClick}
                dragHandle={this.dragHandler}
                indexMy ={obj.index}
              />)

            })}
            {currentShape}
            <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}
          />
          </Layer>
        </Stage>
      </div>
    );
  }
}

DrawingField.propTypes = {
  shapes: PropTypes.array.isRequired,
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
});

export default connect(
  mapStateToProps,
  { addShape, saveCurrentImageShapes, dragShape,transformShape },
)(withRouter(DrawingField));
