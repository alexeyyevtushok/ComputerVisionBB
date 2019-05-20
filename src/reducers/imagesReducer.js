import { SET_IMAGES } from '../actions/types';

const initialState = {
  images: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES: {
      if (!action.payload[0]) {
        return {
          ...state,
          images: action.payload,
        };
      }
      return {
        ...state,
        images: action.payload,
      };
    }
    default:
      return state;
  }
}
