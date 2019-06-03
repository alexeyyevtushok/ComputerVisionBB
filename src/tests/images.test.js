/* eslint-disable no-undef */
import reducer, { initialState } from '../reducers/imagesReducer';
import * as types from '../actions/types';

test('set images', () => {
  const action = {
    type: types.SET_IMAGES,
    payload: ['some url', 'some second url'],
  };

  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    images: action.payload,
  });
});
