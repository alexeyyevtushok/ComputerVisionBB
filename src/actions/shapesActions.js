import { ADD_SHAPE } from './types';

export const addShape = labeledShape => ({
  type: ADD_SHAPE,
  payload: labeledShape,
});
