import {
  ADD_SHAPE,
  DEL_SHAPE,
  PLUS_SCALE,
  MINUS_SCALE,
  DRAG_SHAPE,
  TRANSFORM_SHAPE,
  CLEAR_SHAPES,
  CHOOSE_RESIZE,
} from './types';
import store from '../store';

export const addShape = labeledShape => ({
  type: ADD_SHAPE,
  payload: labeledShape,
});

const del = (currentImg, index) => {
  const newShapes = [];
  const shapes = store.getState().shapes.labeledShapes;
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].index === index) {
      continue;
    } else {
      const newShape = {
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
  const shapes = store.getState().shapes.labeledShapes;
  const { scale } = store.getState().shapes;
  shapes[item.currentTarget.index].x = item.currentTarget.attrs.x / scale;
  shapes[item.currentTarget.index].y = item.currentTarget.attrs.y / scale;
  return shapes;
};


const transform = item => {
  const shapes = store.getState().shapes.labeledShapes;
  const { scale } = store.getState().shapes;
  shapes[item.target.index].x = item.target.attrs.x / scale;
  shapes[item.target.index].y = item.target.attrs.y / scale;
  shapes[item.target.index].width = (item.target.attrs.width * item.target.attrs.scaleX) / scale;
  shapes[item.target.index].height = (item.target.attrs.height * item.target.attrs.scaleY) / scale;
  return shapes;
};

export const delShape = (currentImg, index) => (dispatch) => {
  dispatch({
    type: DEL_SHAPE,
    payload: del(currentImg, index),
  });
};

export const dragShape = item => (dispatch) => {
  dispatch({
    type: DRAG_SHAPE,
    payload: drag(item),
  });
};

export const transformShape = item => (dispatch) => {
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

export const clearShape = () => ({
  type: CLEAR_SHAPES,
});

export const chooseResize = item => ({
  type: CHOOSE_RESIZE,
  payload: item,
});

