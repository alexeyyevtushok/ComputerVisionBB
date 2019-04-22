import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer';
import shapesReducer from './shapesReducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  shapes: shapesReducer,
});

export default rootReducer;
