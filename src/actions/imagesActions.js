import axios from 'axios';
import { SET_IMAGES } from './types';

const getImages = () =>
  axios
    .get('/api/entities')
    .then(res => res.data)
    .catch(err => {
      console.log(`err in getEntities ${err}`);
    });

const setImages = images => ({
  type: SET_IMAGES,
  payload: images,
});

export const updateImages = dispatch =>
  getImages().then(images => {
    dispatch(setImages(images));
  });

export const addImages = images => dispatch => {
  for (let i = 0; i < images.length; i++) {
    console.log(i);
    const data = new FormData();
    data.append('targetImage', images[i]);
    axios
      .post('api/images/', data, {})
      .then(updateImages(dispatch))
      .catch(err => {
        console.log(`errors in addImages ${err}`);
      });
  }
};

export const deleteImage = state => dispatch => {
  axios.delete(`/api/images/${state}`);
};
