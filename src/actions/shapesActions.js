import {
  ADD_SHAPE,
  DEL_SHAPE,
  PLUS_SCALE,
  MINUS_SCALE,
  DRAG_SHAPE,
  TRANSFORM_SHAPE,
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
        name: `Figure${newShapes.length}`,
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

const transform = item => {
  let shapes = store.getState().shapes.labeledShapes;
  shapes[item.target.index].x = item.target.attrs.x;
  shapes[item.target.index].y = item.target.attrs.y;
  shapes[item.target.index].width =
    shapes[item.target.index].width * item.target.attrs.scaleX;
  shapes[item.target.index].height =
    shapes[item.target.index].height * item.target.attrs.scaleY;
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

export const transformShape = item => dispatch => {
  dispatch({
    type: TRANSFORM_SHAPE,
    payload: transform(item),
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
