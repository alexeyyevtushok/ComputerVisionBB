import axios from 'axios';
import store from '../store';
import { SET_IMAGES, SET_SHAPES } from './types';

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

const getNewImageShapes = image => dispatch => {
  axios.get(`/api/labeled/${image}`).then(res => {
    if (res.data.shapes) {
      dispatch({
        type: SET_SHAPES,
        payload: res.data.shapes,
      });
    }
  });
};

const saveCurrentImageShapes = image => dispatch => {
  const shapes = store.getState().shapes.labeledShapes;
  const data = {
    image: {
      name: image,
    },
    shapes,
  };
  axios.post('/api/labeled', data);
};

const updateImages = dispatch =>
  getImages().then(images => {
    dispatch(setImages(images));
    return Promise.resolve();
  });

const addImages = images => dispatch => {
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

const addGDriveImages = data => dispatch => {
  axios.post('api/images/gdrive', data).then(() => {
    updateImages(dispatch);
  });
};

const deleteImage = state => dispatch =>
  axios
    .delete(`/api/images/img/${state}`)
    .then(res => updateImages(dispatch).then(res => Promise.resolve()));

const resetAll = () => dispatch => {
  axios.delete('api/images/reset');
};

export {
  getNewImageShapes,
  saveCurrentImageShapes,
  updateImages,
  addImages,
  addGDriveImages,
  deleteImage,
  resetAll,
};
