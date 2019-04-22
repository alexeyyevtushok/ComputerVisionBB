import axios from 'axios';
import { SET_ENTITIES, ADD_ENTITY, SET_CURRENT_ENTITY } from './types';

export const setCurrEntity = entity => ({
  type: SET_CURRENT_ENTITY,
  payload: entity,
});

export const setEmptyCurrEntity = () => ({
  type: SET_CURRENT_ENTITY,
  payload: {
    index: -1,
    color: '',
    label: '',
  },
});

<<<<<<< HEAD
const getEntities = () => axios
  .get('/api/entities')
  .then(res => res.data)
  .catch((err) => {
    console.log(`err in getEntities ${err}`);
  });
=======
const getEntities = () =>
  axios
    .get('/api/entities')
    .then(res => res.data)
    .catch(err => {
      console.log(`err in getEntities ${err}`);
    });
>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b

const setEntities = entities => ({
  type: SET_ENTITIES,
  payload: entities,
});

<<<<<<< HEAD
export const updateEntities = dispatch => getEntities().then((entities) => {
  dispatch(setEntities(entities));
});

export const addEntity = entity => (dispatch) => {
  axios
    .post('/api/entities', entity)
    .then((res) => {
=======
export const updateEntities = dispatch =>
  getEntities().then(entities => {
    dispatch(setEntities(entities));
  });

export const addEntity = entity => dispatch => {
  axios
    .post('/api/entities', entity)
    .then(res => {
>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b
      dispatch({
        type: ADD_ENTITY,
        payload: res.data,
      });
    })
<<<<<<< HEAD
    .catch((err) => {
=======
    .catch(err => {
>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b
      console.log(`errors in addEntity ${err}`);
    });
};

<<<<<<< HEAD
export const deleteEntity = entityIndex => (dispatch) => {
  axios
    .delete(`/api/entities/${entityIndex}`)
    .then(updateEntities(dispatch))
    .catch((err) => {
=======
export const deleteEntity = entityIndex => dispatch => {
  axios
    .delete(`/api/entities/${entityIndex}`)
    .then(updateEntities(dispatch))
    .catch(err => {
      console.log(`errors in deleteEntity ${err}`);
    });
};

export const modifyEntity = (entityIndex, entityData) => dispatch => {
  axios
    .put('/api/entities', { index: entityIndex, data: entityData })
    .then(updateEntities(dispatch))
    .catch(err => {
>>>>>>> 5cfc52a43f09e2e67b74691e73ce04ee7afa4d3b
      console.log(`errors in deleteEntity ${err}`);
    });
};
