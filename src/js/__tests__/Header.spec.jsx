import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';

test('Header renders correctly', () => {
  const component = renderer.create(<Header />)
  const tree = component.toJSON();
  expect(tree).toMatchSnapShot();
});
