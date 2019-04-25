import axios from 'axios';
import store from '../store';
import {
  SET_IMAGES, IMAGE_CLICK, CLEAR_SHAPES, SET_SHAPES,
} from './types';

const setImages = images => ({
  type: SET_IMAGES,
  payload: images,
});

const changeImage = image => ({
  type: IMAGE_CLICK,
  payload: image,
});

const getImages = () => axios
  .get('/api/images')
  .then(res => res.data)
  .catch((err) => {
    console.log(`err in getImages ${err}`);
  });

const getNewImageShapes = (image, dispatch) => {
  const imageName = image.slice(image.lastIndexOf('/') + 1);
  axios.get(`/api/labeled/${imageName}`).then((res) => {
    if (res.data.shapes) {
      dispatch({
        type: SET_SHAPES,
        payload: res.data.shapes,
      });
    } else {
      dispatch({
        type: CLEAR_SHAPES,
      });
    }
    dispatch(changeImage(image));
  });
};

const saveCurrentImageShapes = () => {
  const shapes = store.getState().shapes.labeledShapes;
  if (shapes.length > 0) {
    let prevImg = store.getState().images.currentImg;
    prevImg = prevImg.slice(prevImg.lastIndexOf('/') + 1);
    const data = {
      image: {
        name: prevImg,
      },
      shapes,
    };
    return axios.post('/api/labeled', data);
  }
  return Promise.resolve();
};

export const updateImages = dispatch => getImages().then((images) => {
  dispatch(setImages(images));
  if (images.length > 0) {
    getNewImageShapes(images[0].picture, dispatch);
  }
});

export const imageOnClick = image => (dispatch) => {
  saveCurrentImageShapes().then(getNewImageShapes(image, dispatch));
};

export const addImages = images => (dispatch) => {
  for (let i = 0; i < images.length; i++) {
    const data = new FormData();
    data.append('targetImage', images[i]);
    axios
      .post('api/images/', data, {})
      .then(() => {
        updateImages(dispatch);
      })
      .catch((err) => {
        console.log(`errors in addImages ${err}`);
      });
  }
};

export const deleteImage = state => (dispatch) => {
  axios.delete(`/api/images/${state}`).then((res) => {
    updateImages(dispatch);
  });
};
