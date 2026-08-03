import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from '../Button'

describe('Button', () => {
  it('renders the label and responds to press', async () => {
    const onPress = jest.fn()
    const { getByTestId, getByText } = await render(
      <Button testID="btn-test" label="Submit" onPress={onPress} />,
    )
    expect(getByText('Submit')).toBeTruthy()
    fireEvent.press(getByTestId('btn-test'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('is disabled and does not fire onPress when disabled is true', async () => {
    const onPress = jest.fn()
    const { getByTestId } = await render(
      <Button testID="btn-test" label="Submit" onPress={onPress} disabled />,
    )
    const button = getByTestId('btn-test')
    expect(button.props.accessibilityState.disabled).toBe(true)
    fireEvent.press(button)
    expect(onPress).not.toHaveBeenCalled()
  })

  it('shows a loading indicator instead of the label when loading', async () => {
    const { getByTestId, queryByText } = await render(
      <Button testID="btn-test" label="Submit" onPress={jest.fn()} loading />,
    )
    expect(getByTestId('btn-test--loading')).toBeTruthy()
    expect(queryByText('Submit')).toBeNull()
  })
})
