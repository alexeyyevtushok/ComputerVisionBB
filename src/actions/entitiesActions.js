import axios from "axios";
import { SET_ENTITIES, ADD_ENTITY } from "./types";

// export const initializeTasks = () => dispatch => {
//   return updateTasks(dispatch);
// };

export const addEntity = entity => dispatch => {
  axios
    .post("/api/entities", entity)
    .then(res => {
      dispatch({
        type: ADD_ENTITY,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log("errors in addEntity " + err);
    });
};

// export const updateEntitiesStore = dispatch => {
//   return getEntities().then(entities => {
//     dispatch(setEntities(entities));
//   });
// };

// const getEntities = () => {
//   return axios
//     .get("/api/entities")
//     .then(res => {
//       return res.data;
//     })
//     .catch(err => {
//       console.log("err in getEntities " + err);
//     });
// };

// const setEntities = entities => {
//   return {
//     type: SET_ENTITIES,
//     payload: entities,
//   };
// };
