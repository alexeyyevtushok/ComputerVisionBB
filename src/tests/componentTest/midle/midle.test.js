import React from 'react';
import { shallow } from 'enzyme';
import Middle from '../../../Components/Middle/Middle';

describe('Middle component', () => {
  it('Is rendered without errors', () => {
    const component = shallow(<Middle />);
    expect(component.find('.midleMain').length).toBe(1);
  });

  it('Is rendered IMG', () => {
    const component = shallow(<Middle />);
    expect(component.find('.targetImg').length).toBe(1);
  });
});
