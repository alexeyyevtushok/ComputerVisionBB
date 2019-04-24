import { SET_IMAGES, IMAGE_CLICK } from '../actions/types';

const initialState = {
  images: [],
  currentImg: 'http://pcexpert86.ru/image/cache/catalog/thumbs/nofoto-1200x800.gif',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES: {
      if (!action.payload[0]) {
        return {
          ...state,
          images: action.payload,
          currentImg: 'http://pcexpert86.ru/image/cache/catalog/thumbs/nofoto-1200x800.gif',
        };
      }
      return {
        ...state,
        images: action.payload,
        currentImg: action.payload[0].picture,
      };
    }
    case IMAGE_CLICK: {
      return {
        ...state,
        currentImg: action.payload,
      };
    }
    default:
      return state;
  }
}
