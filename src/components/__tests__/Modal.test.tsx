import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Modal } from '../Modal'

describe('Modal', () => {
  it('renders the title and message when visible', async () => {
    const { getByText } = await render(
      <Modal
        testID="modal-test"
        visible
        title="ไม่พบข้อมูล"
        message="ไม่พบ Smart Care ID"
        onConfirm={jest.fn()}
      />,
    )
    expect(getByText('ไม่พบข้อมูล')).toBeTruthy()
    expect(getByText('ไม่พบ Smart Care ID')).toBeTruthy()
  })

  it('calls onConfirm when the confirm button is pressed', async () => {
    const onConfirm = jest.fn()
    const { getByTestId } = await render(
      <Modal
        testID="modal-test"
        visible
        title="ไม่พบข้อมูล"
        message="ไม่พบ Smart Care ID"
        confirmTestID="modal-test--confirm"
        onConfirm={onConfirm}
      />,
    )
    fireEvent.press(getByTestId('modal-test--confirm'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })
})
