import axios from 'axios';
import store from '../store';
import { SET_IMAGES, CLEAR_SHAPES, SET_SHAPES } from './types';

const setImages = images => ({
  type: SET_IMAGES,
  payload: images,
});

const getImages = () =>
  axios
    .get('/api/images')
    .then(res => res.data)
    .catch(err => {
      console.log(`err in getImages ${err}`);
    });

export const getNewImageShapes = image => dispatch => {
  axios.get(`/api/labeled/${image}`).then(res => {
    if (res.data.shapes) {
      dispatch({
        type: SET_SHAPES,
        payload: res.data.shapes,
      });
    }
  });
};

export const saveCurrentImageShapes = image => dispatch => {
  const shapes = store.getState().shapes.labeledShapes;
  const data = {
    image: {
      name: image,
    },
    shapes,
  };
  axios.post('/api/labeled', data);
};

export const clearShape = () => ({
  type: CLEAR_SHAPES,
});

export const updateImages = dispatch =>
  getImages().then(images => {
    dispatch(setImages(images));
    return Promise.resolve();
  });

export const addImages = images => dispatch => {
  for (let i = 0; i < images.length; i++) {
    const data = new FormData();
    data.append('targetImage', images[i]);
    axios
      .post('api/images/', data, {})
      .then(() => {
        updateImages(dispatch);
      })
      .catch(err => {
        console.log(`errors in addImages ${err}`);
      });
  }
};

export const deleteImage = state => dispatch =>
  axios
    .delete(`/api/images/img/${state}`)
    .then(res => updateImages(dispatch).then(res => Promise.resolve()));
