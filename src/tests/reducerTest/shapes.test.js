/* eslint-disable no-undef */
import reducer, { initialState } from '../../reducers/shapesReducer';
import * as types from '../../actions/types';

describe('change scale of shape', () => {
  it('plus scale', () => {
    const action = {
      type: types.PLUS_SCALE,
      payload: initialState.scale + 0.05,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      scale: action.payload,
    });
  });

  it('minus scale', () => {
    const action = {
      type: types.MINUS_SCALE,
      payload: initialState.scale - 0.05,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      scale: action.payload,
    });
  });
});
