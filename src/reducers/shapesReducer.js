import {
  ADD_SHAPE,
  CLEAR_SHAPES,
  SET_SHAPES,
  DEL_SHAPE,
} from '../actions/types';

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
    case DEL_SHAPE: {
      return {
        ...state,
        labeledShapes: action.payload,
      };
    }
    case CLEAR_SHAPES: {
      return {
        ...state,
        labeledShapes: [],
      };
    }
    case SET_SHAPES: {
      return {
        ...state,
        labeledShapes: action.payload,
      };
    }
    default:
      return state;
  }
}
