import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer';
import shapesReducer from './shapesReducer';
import imagesReducer from './imagesReducer';
const rootReducer = combineReducers({
  entities: entitiesReducer,
  shapes: shapesReducer,
  images: imagesReducer,
});

export default rootReducer;
