import {
  ADD_SHAPE,
  CLEAR_SHAPES,
  SET_SHAPES,
  DEL_SHAPE,
  PLUS_SCALE,
  MINUS_SCALE,
  DRAG_SHAPE,
  TRANSFORM_SHAPE,
  CHOOSE_RESIZE,
} from '../actions/types';

const initialState = {
  labeledShapes: [],
  scale: 1,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SHAPE: {
      return {
        ...state,
        labeledShapes: [...state.labeledShapes, action.payload],
        resizeName: '',
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
        scale: 1,
      };
    }
    case SET_SHAPES: {
      return {
        ...state,
        labeledShapes: action.payload,
      };
    }
    case DRAG_SHAPE: {
      return {
        ...state,
        labeledShapes: action.payload,
      };
    }
    case TRANSFORM_SHAPE: {
      return {
        ...state,
        labeledShapes: action.payload,
      };
    }
    case PLUS_SCALE: {
      return {
        ...state,
        scale: action.payload,
      };
    }
    case MINUS_SCALE: {
      return {
        ...state,
        scale: action.payload,
      };
    }
    case CHOOSE_RESIZE: {
      return {
        ...state,
        resizeName: action.payload,
      };
    }
    default:
      return state;
  }
}
