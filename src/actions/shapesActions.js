import { ADD_SHAPE, DEL_SHAPE } from './types';
import store from '../store';

export const addShape = labeledShape => ({
  type: ADD_SHAPE,
  payload: labeledShape,
});

const del = (currentImg, index) => {
  const shapes = store.getState().shapes.labeledShapes;
  console.log(currentImg);
  console.log(shapes[index]);
};

export const delShape = (currentImg, index) => dispatch => {
  del(currentImg, index);
  dispatch({
    type: DEL_SHAPE,
  });
};
