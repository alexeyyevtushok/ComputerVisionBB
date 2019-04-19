import { SET_ENTITIES, ADD_ENTITY } from "../actions/types";

const initialState = {
  entities: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ENTITIES:
      return {
        ...state,
        entities: action.payload,
      };
    case ADD_ENTITY:
      const newEntities = state.entities.push(action.payload);
      return {
        ...state,
        entities: newEntities,
      };
    default:
      return state;
  }
}
