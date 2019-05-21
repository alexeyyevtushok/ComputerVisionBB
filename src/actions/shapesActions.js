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

const addShape = labeledShape => ({
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
  console.log(item.index);
  const shapes = store.getState().shapes.labeledShapes;
  const { scale } = store.getState().shapes;
  shapes[item.index].x = item.attrs.x / scale;
  shapes[item.index].y = item.attrs.y / scale;
  return shapes;
};

const transform = item => {
  const shapes = store.getState().shapes.labeledShapes;
  const { scale } = store.getState().shapes;
  shapes[item.index].x = item.attrs.x / scale;
  shapes[item.index].y = item.attrs.y / scale;
  shapes[item.index].width = (item.attrs.width * item.attrs.scaleX) / scale;
  shapes[item.index].height = (item.attrs.height * item.attrs.scaleY) / scale;
  return shapes;
};

const delShape = (currentImg, index) => dispatch => {
  dispatch({
    type: DEL_SHAPE,
    payload: del(currentImg, index),
  });
};

const dragShape = item => dispatch => {
  dispatch({
    type: DRAG_SHAPE,
    payload: drag(item),
  });
};

const transformShape = item => dispatch => {
  dispatch({
    type: TRANSFORM_SHAPE,
    payload: transform(item),
  });
};

const plusScale = () => ({
  type: PLUS_SCALE,
  payload: store.getState().shapes.scale + 0.05,
});

const minusScale = () => ({
  type: MINUS_SCALE,
  payload: store.getState().shapes.scale - 0.05,
});

const clearShape = () => ({
  type: CLEAR_SHAPES,
});

const chooseResize = item => ({
  type: CHOOSE_RESIZE,
  payload: item,
});

export {
  addShape,
  delShape,
  dragShape,
  transformShape,
  plusScale,
  minusScale,
  clearShape,
  chooseResize,
};
