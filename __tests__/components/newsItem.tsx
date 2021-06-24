import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import MovieItem from 'src/components/newsItem';

const onPress = jest.fn();

describe('test Input', () => {
  test('it renders correctly', () => {
    const input = render(<MovieItem />);
    expect(input).toMatchSnapshot();
  });

  test('it renders correctly with title and description', () => {
    const input = render(<MovieItem title={'test'} description={'descriptionTest'} />);
    expect(input).toMatchSnapshot();
  });

  test('onPress is called correctly', () => {
    const { getByTestId } = render(<MovieItem title={'test'} description={'descriptionTest'} onPress={onPress} />);
    fireEvent.press(getByTestId('newsItem'));
    expect(onPress).toHaveBeenCalled();
  });
});
