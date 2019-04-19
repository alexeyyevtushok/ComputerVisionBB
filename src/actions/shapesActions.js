import { ADD_SHAPE } from './types';

export const addShape = (shape, label) => ({
  type: ADD_SHAPE,
  payload: {
    label,
    shape,
  },
});
