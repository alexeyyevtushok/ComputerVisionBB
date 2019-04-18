import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "../Image/Image";
import "./Middle.css";
import DrawingField from "../DrawingField/DrawingField";
import EntitiesField from "../EntitiesField/EntitiesField";

class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currEntity: null,
      drawingMode: false,
    };
  }

  setCurrentEntity = entity => {
    if (entity === null) {
      this.setState({ currEntity: null, drawingMode: false });
    } else {
      this.setState({ currEntity: entity, drawingMode: true });
    }
  };

  render() {
    const { currentImg } = this.props;
    const { currEntity, drawingMode } = this.state;
    let drawingField = null;
    if (drawingMode) {
      drawingField = (
        <DrawingField
          drawingMode={drawingMode}
          currentColor={currEntity.color}
        />
      );
    } else {
      drawingField = (
        <DrawingField drawingMode={drawingMode} currentColor={"none"} />
      );
    }
    return (
      <div className="midleMain">
        <EntitiesField setCurrentEntity={this.setCurrentEntity} />
        <div className="targetImg">
          <p>Image</p>
          {drawingField}
          <Image currentImg={currentImg} />
        </div>
      </div>
    );
  }
}

Middle.propTypes = {
  currentImg: PropTypes.string.isRequired,
};

export default Middle;
