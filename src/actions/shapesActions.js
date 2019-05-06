import { ADD_SHAPE, DEL_SHAPE } from './types';
import store from '../store';

export const addShape = labeledShape => ({
  type: ADD_SHAPE,
  payload: labeledShape,
});

const del = (currentImg, index) => {
  let newShapes = [];
  let shapes = store.getState().shapes.labeledShapes;
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].index === index) {
      continue;
    } else {
      let newShape = {
        index: newShapes.length,
        color: shapes[i].color,
        height: shapes[i].height,
        width: shapes[i].width,
        label: shapes[i].label,
        x: shapes[i].x,
        y: shapes[i].y,
      };
      newShapes.push(newShape);
    }
  }
  return newShapes;
};

export const delShape = (currentImg, index) => dispatch => {
  dispatch({
    type: DEL_SHAPE,
    payload: del(currentImg, index),
  });
};
