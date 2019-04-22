import { SET_ENTITIES, ADD_ENTITY, SET_CURRENT_ENTITY } from '../actions/types';

const initialState = {
  entities: [],
  currEntity: {
    index: -1,
    color: '',
    label: '',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ENTITY: {
      return {
        ...state,
        entities: state.entities,
        currEntity: action.payload,
      };
    }
    case SET_ENTITIES: {
      return {
        ...state,
        entities: action.payload,
      };
    }
    case ADD_ENTITY: {
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };
    }
    default:
      return state;
  }
}
