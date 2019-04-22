import { DELETE_IMAGE, SET_IMAGES } from '../actions/types';

const initialState = {
  images: [],
  currentImg:
    'http://pcexpert86.ru/image/cache/catalog/thumbs/nofoto-1200x800.gif',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES: {
      return {
        ...state,
        images: action.payload,
        currentImg: action.payload[0],
      };
    }
    default:
      return state;
  }
}
