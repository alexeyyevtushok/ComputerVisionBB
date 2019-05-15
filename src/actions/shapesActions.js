import {
  ADD_SHAPE,
  DEL_SHAPE,
  PLUS_SCALE,
  MINUS_SCALE,
  DRAG_SHAPE,
} from './types';
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

const drag = item => {
  let shapes = store.getState().shapes.labeledShapes;
  shapes[item.currentTarget.index].x = item.currentTarget.attrs.x;
  shapes[item.currentTarget.index].y = item.currentTarget.attrs.y;
  return shapes;
};

export const delShape = (currentImg, index) => dispatch => {
  dispatch({
    type: DEL_SHAPE,
    payload: del(currentImg, index),
  });
};

export const dragShape = item => dispatch => {
  dispatch({
    type: DRAG_SHAPE,
    payload: drag(item),
  });
};

export const plusScale = () => ({
  type: PLUS_SCALE,
  payload: store.getState().shapes.scale + 0.05,
});

export const minusScale = () => ({
  type: MINUS_SCALE,
  payload: store.getState().shapes.scale - 0.05,
});
