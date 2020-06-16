import React from 'react';
import { shallow } from 'enzyme';
import ColoredRect from '../../../Components/ColoredRect/ColoredRect';

describe('ColoredRect component', () => {
  it('Is rendered withoute errors', () => {
    const component = shallow(<ColoredRect />);
    expect(component.find('Rect').length).toBe(1);
  });
});
