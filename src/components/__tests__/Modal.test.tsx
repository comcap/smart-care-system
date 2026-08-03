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

  it('does not render a cancel button when onCancel is not provided', async () => {
    const { queryByTestId } = await render(
      <Modal
        testID="modal-test"
        visible
        title="ไม่พบข้อมูล"
        message="ไม่พบ Smart Care ID"
        onConfirm={jest.fn()}
      />,
    )
    expect(queryByTestId('modal-test--cancel')).toBeNull()
  })

  it('calls onCancel when the cancel button is pressed', async () => {
    const onCancel = jest.fn()
    const { getByTestId } = await render(
      <Modal
        testID="modal-test"
        visible
        title="ยืนยัน"
        message="ต้องการดำเนินการต่อหรือไม่"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />,
    )
    fireEvent.press(getByTestId('modal-test--cancel'))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
