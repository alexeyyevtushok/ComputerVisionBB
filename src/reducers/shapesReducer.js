import { ADD_SHAPE } from '../actions/types';

const initialState = {
  shapes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SHAPE: {
      return {
        ...state,
        shapes: [...state.shapes, action.payload],
      };
    }
    default:
      return state;
  }
}
