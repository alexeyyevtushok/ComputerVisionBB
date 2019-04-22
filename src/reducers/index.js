import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer';
import shapesReducer from './shapesReducer';
<<<<<<< HEAD

const rootReducer = combineReducers({
  entities: entitiesReducer,
  shapes: shapesReducer,
=======
import imagesReducer from './imagesReducer';
const rootReducer = combineReducers({
  entities: entitiesReducer,
  shapes: shapesReducer,
  images: imagesReducer,
>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b
});

export default rootReducer;
