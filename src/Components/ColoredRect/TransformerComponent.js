import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { saveCurrentImageShapes } from '../../actions/imagesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TransformerComponent extends React.Component {
  componentDidMount() {
    this.checkNode();
    this.transformer.rotateEnabled(false);
    this.transformer.on('transformend', () => {
      const { imgName } = this.props;
      this.props.saveCurrentImageShapes(imgName);
    });
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    // here we need to manually attach or detach Transformer node
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;

    const selectedNode = stage.findOne('.' + selectedShapeName);
    // do nothing if selected node is already attached
    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      // attach to another node
      this.transformer.attachTo(selectedNode);
    } else {
      // remove transformer
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
      />
    );
  }
}
export default TransformerComponent;
