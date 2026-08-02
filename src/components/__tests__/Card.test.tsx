import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children', async () => {
    const { getByText } = await render(
      <Card testID="card-test">
        <Text>content</Text>
      </Card>,
    );
    expect(getByText('content')).toBeTruthy();
  });

  it('calls onPress when pressed and onPress is provided', async () => {
    const onPress = jest.fn();
    const { getByTestId } = await render(
      <Card testID="card-test" onPress={onPress}>
        <Text>content</Text>
      </Card>,
    );
    fireEvent.press(getByTestId('card-test'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is not pressable when onPress is not provided', async () => {
    const { getByTestId } = await render(
      <Card testID="card-test">
        <Text>content</Text>
      </Card>,
    );
    expect(getByTestId('card-test').props.accessibilityRole).toBeUndefined();
  });
});
