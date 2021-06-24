import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Input from 'src/components/input';

describe('test Input', () => {
  test('it renders correctly', () => {
    const input = render(<Input />);
    expect(input).toMatchSnapshot();
  });

  test('it renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<Input placeholder={'test'} />);
    const input = getByPlaceholderText('test');
    expect(input).not.toBe(null);
  });

  test('it shows correctly value text', () => {
    const { getByTestId } = render(<Input value={'testing'} />);
    const input = getByTestId('Input');
    expect(input).not.toBe(null);
    expect(input.props.value).toBe('testing');
  });

  test('it works onChangeText correctly', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(<Input onChangeText={onChangeText} />);
    fireEvent.changeText(getByTestId('Input'), 'test');
    expect(onChangeText).toHaveBeenCalledWith('test');
  });
});
