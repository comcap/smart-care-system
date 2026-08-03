import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Input } from '../Input'

describe('Input', () => {
  it('renders the label and calls onChangeText when typed into', async () => {
    const onChangeText = jest.fn()
    const { getByTestId, getByText } = await render(
      <Input
        testID="input-test"
        label="Title"
        onChangeText={onChangeText}
        value=""
      />,
    )
    expect(getByText('Title')).toBeTruthy()
    fireEvent.changeText(getByTestId('input-test'), 'hello')
    expect(onChangeText).toHaveBeenCalledWith('hello')
  })

  it('shows the error message when an error is passed', async () => {
    const { getByTestId } = await render(
      <Input
        testID="input-test"
        label="Title"
        value=""
        error="กรุณากรอก Title"
      />,
    )
    expect(getByTestId('input-test--error')).toBeTruthy()
  })

  it('does not render an error node when there is no error', async () => {
    const { queryByTestId } = await render(
      <Input testID="input-test" label="Title" value="" />,
    )
    expect(queryByTestId('input-test--error')).toBeNull()
  })
})
