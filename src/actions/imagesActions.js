import axios from 'axios';
import store from '../store';
import { SET_IMAGES, IMAGE_CLICK, CLEAR_SHAPES, SET_SHAPES } from './types';

const setImages = images => ({
  type: SET_IMAGES,
  payload: images,
});

const changeImage = image => ({
  type: IMAGE_CLICK,
  payload: image,
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
  if (shapes.length > 0) {
    const data = {
      image: {
        name: image,
      },
      shapes,
    };
    dispatch({
      type: CLEAR_SHAPES,
    });
    axios.post('/api/labeled', data);
  }
};

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
