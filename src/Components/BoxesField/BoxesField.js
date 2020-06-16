import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './BoxesField.css';
import Box from '../Box/Box';
import store from '../../store';

import { delShape, chooseResize } from '../../actions/shapesActions';
import { saveCurrentImageShapes } from '../../actions/imagesActions';
import { setEmptyCurrEntity } from '../../actions/entitiesActions';

class BoxesField extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    document.onkeyup = e => {
      if (e.ctrlKey && e.which === 90) {
        const shapes = store.getState().shapes.labeledShapes;
        this.props.delShape(this.props.currentImg, shapes.length - 1);
      }
    };
  }

  clickHandler = name => {
    this.props.chooseResize(name);
    this.props.setEmptyCurrEntity();
  };

  clickToDelHandler = (event, current, index) => {
    this.props.delShape(current, index);
    this.props.chooseResize('');
    if (this.props.match) {
      const { imgName } = this.props.match.params;
      this.props.saveCurrentImageShapes(imgName);
    }
  };

  submit = (e, item) => {
    e.stopPropagation();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            this.clickToDelHandler(e, this.props.currentImg, item.index),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const { shapes } = this.props;
    return (
      <div className="boxesField" data-test="boxesField">
        <p>Bounding boxes</p>
        <div className="boxesList">
          {shapes.map(item => (
            <Box
              color={item.color}
              label={item.label}
              key={`${item.color}${item.x}${item.y}`}
              onClick={() => this.clickHandler(item.name)}
              onClickToDel={e => this.submit(e, item)}
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
    chooseResize,
    setEmptyCurrEntity,
  },
)(withRouter(BoxesField));
