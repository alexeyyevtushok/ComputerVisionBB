import { ADD_SHAPE } from '../actions/types';

const initialState = {
  labeledShapes: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SHAPE: {
      return {
        ...state,
        labeledShapes: [...state.labeledShapes, action.payload],
      };
    }
    default:
      return state;
  }
}
