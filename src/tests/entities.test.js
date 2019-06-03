/* eslint-disable no-undef */
import reducer, { initialState } from '../reducers/entitiesReducer';
import * as types from '../actions/types';

describe('entities reducer', () => {
  it('set entities', () => {
    const action = {
      type: types.SET_ENTITIES,
      payload: [],
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      entities: action.payload,
    });
  });

  it('add entities', () => {
    const action = {
      type: types.ADD_ENTITY,
      payload: { color: 'red', index: 1, label: 'test' },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      entities: [...initialState.entities, action.payload],
    });
  });
});
