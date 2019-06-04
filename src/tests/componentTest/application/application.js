import React from 'react';
import { shallow } from 'enzyme';
import Application from '../../src/Components/Application/Application';

describe('Application component', () => {
  it('Is rendered withoute errors', () => {
    const component = shallow(<Application />);
    console.log(component.debug());
    expect(component.find(`[data-test='middle']`).length).toBe(1);
    expect(component.find(`[data-test='slider']`).length).toBe(1);
    expect(component.find(`[data-test='header']`).length).toBe(1);
  });
});
