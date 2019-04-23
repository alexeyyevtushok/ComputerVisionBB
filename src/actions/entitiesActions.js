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

const getEntities = () =>
  axios
    .get('/api/entities')
    .then(res => res.data)
    .catch(err => {
      console.log(`err in getEntities ${err}`);
    });

const setEntities = entities => ({
  type: SET_ENTITIES,
  payload: entities,
});

export const updateEntities = dispatch =>
  getEntities().then(entities => {
    dispatch(setEntities(entities));
  });

export const addEntity = entity => dispatch => {
  axios
    .post('/api/entities', entity)
    .then(res => {
      dispatch({
        type: ADD_ENTITY,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(`errors in addEntity ${err}`);
    });
};

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
      console.log(`errors in deleteEntity ${err}`);
    });
};
