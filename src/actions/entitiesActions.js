import axios from 'axios';
import { SET_ENTITIES, ADD_ENTITY, SET_CURRENT_ENTITY } from './types';

const setCurrEntity = entity => ({
  type: SET_CURRENT_ENTITY,
  payload: entity,
});

const setEmptyCurrEntity = () => ({
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
      console.error(`err in getEntities ${err}`);
    });

const setEntities = entities => ({
  type: SET_ENTITIES,
  payload: entities,
});

const updateEntities = dispatch =>
  getEntities().then(entities => dispatch(setEntities(entities)));

const addEntity = entity => dispatch => {
  axios
    .post('/api/entities', entity)
    .then(res => {
      dispatch({
        type: ADD_ENTITY,
        payload: res.data,
      });
    })
    .catch(err => {
      console.error(`errors in addEntity ${err}`);
    });
};

const deleteEntity = entityIndex => dispatch => {
  axios
    .delete(`/api/entities/${entityIndex}`)
    .then(updateEntities(dispatch))
    .catch(err => {
      console.error(`errors in deleteEntity ${err}`);
    });
};

const modifyEntity = (index, data) => dispatch => {
  axios
    .put('/api/entities', { index: index, data: data })
    .then(updateEntities(dispatch))
    .catch(err => {
      console.error(`errors in modifyEntity ${err}`);
    });
};

export {
  modifyEntity,
  deleteEntity,
  addEntity,
  updateEntities,
  setEmptyCurrEntity,
  setCurrEntity,
};
