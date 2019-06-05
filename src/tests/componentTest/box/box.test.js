import React from 'react';
import { shallow } from 'enzyme';
import Box from '../../../Components/Box/Box';

const setUp = (props = {}) => {
  const component = shallow(<Box {...props} />);
  return component;
};

describe('Box component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Is rendered withoute errors', () => {
    expect(component.find(`[data-test='boxesItem']`).length).toBe(1);
  });

  it('Render of delete icon', () => {
    expect(component.find(`[data-test='boxesDelete']`).length).toBe(1);
  });
});
