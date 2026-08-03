import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { Main } from '../Main'
import { createTestStore } from '@/utils/testStore'
import { flushMicrotasks } from '@/utils/testFlush'
import { createMockNavigation, createMockRoute } from '@/utils/testNavigation'
import { SmartCare } from '@/types/smartCare'

const sample: SmartCare = {
  id: 'sc-1',
  title: 'แอร์เสีย',
  description: 'แอร์ห้องประชุมไม่เย็น',
  createdAt: '2026-01-01T00:00:00.000Z',
}

async function renderMain(items: SmartCare[] = []) {
  const store = createTestStore({ smartCare: { items, status: 'succeeded' } })
  const navigation = createMockNavigation<'Main'>({
    navigate: jest.fn(),
    reset: jest.fn(),
  })
  const route = createMockRoute('Main', undefined)
  const utils = await render(
    <Provider store={store}>
      <Main navigation={navigation} route={route} />
    </Provider>,
  )
  return { ...utils, navigation, store }
}

describe('Main screen', () => {
  it('shows the empty state when there are no requests', async () => {
    const { getByTestId, queryByTestId } = await renderMain([])
    expect(getByTestId('main__empty-state')).toBeTruthy()
    expect(queryByTestId('main__list')).toBeNull()
  })

  it('renders the list with one row per request when requests exist', async () => {
    const { getByTestId, queryByTestId } = await renderMain([sample])
    expect(getByTestId('main__list')).toBeTruthy()
    expect(getByTestId('main__card--item-sc-1')).toBeTruthy()
    expect(queryByTestId('main__empty-state')).toBeNull()
  })

  it('navigates to RequestDetail when a card is pressed', async () => {
    const { getByTestId, navigation } = await renderMain([sample])
    fireEvent.press(getByTestId('main__card--item-sc-1'))
    expect(navigation.navigate).toHaveBeenCalledWith('RequestDetail', {
      id: 'sc-1',
    })
  })

  it('navigates to AddRequest when the add button is pressed', async () => {
    const { getByTestId, navigation } = await renderMain([])
    fireEvent.press(getByTestId('main__btn--add'))
    expect(navigation.navigate).toHaveBeenCalledWith('AddRequest')
  })

  it('navigates to RequestDetail when searching an id that exists', async () => {
    const { getByTestId, navigation } = await renderMain([sample])
    fireEvent.changeText(getByTestId('main__input--search'), 'sc-1')
    await flushMicrotasks()
    fireEvent.press(getByTestId('main__btn--search'))
    expect(navigation.navigate).toHaveBeenCalledWith('RequestDetail', {
      id: 'sc-1',
    })
  })

  it('shows the search-error modal instead of filtering the list when the id is not found', async () => {
    const { getByTestId, queryByTestId } = await renderMain([sample])
    fireEvent.changeText(getByTestId('main__input--search'), 'does-not-exist')
    await flushMicrotasks()
    fireEvent.press(getByTestId('main__btn--search'))

    await waitFor(() => {
      expect(
        queryByTestId('main__modal--search-error', {
          includeHiddenElements: true,
        })?.props.visible,
      ).toBe(true)
    })
    expect(
      getByTestId('main__list', { includeHiddenElements: true }),
    ).toBeTruthy()
  })

  it('closes the search-error modal when confirm is pressed', async () => {
    const { getByTestId, queryByTestId } = await renderMain([sample])
    fireEvent.changeText(getByTestId('main__input--search'), 'does-not-exist')
    await flushMicrotasks()
    fireEvent.press(getByTestId('main__btn--search'))

    await waitFor(() => {
      expect(
        getByTestId('main__modal--search-error', { includeHiddenElements: true })
          .props.visible,
      ).toBe(true)
    })

    fireEvent.press(getByTestId('main__modal-btn--confirm'))

    await waitFor(() => {
      expect(
        queryByTestId('main__modal--search-error', {
          includeHiddenElements: true,
        }),
      ).toBeNull()
    })
  })

  it('opens the logout modal when the menu button is pressed', async () => {
    const { getByTestId } = await renderMain([])
    fireEvent.press(getByTestId('main__btn--menu'))

    await waitFor(() => {
      expect(
        getByTestId('main__modal--logout', { includeHiddenElements: true })
          .props.visible,
      ).toBe(true)
    })
  })

  it('closes the logout modal without logging out when cancel is pressed', async () => {
    const { getByTestId, queryByTestId, store } = await renderMain([])
    fireEvent.press(getByTestId('main__btn--menu'))

    await waitFor(() => {
      expect(
        getByTestId('main__modal--logout', { includeHiddenElements: true })
          .props.visible,
      ).toBe(true)
    })

    fireEvent.press(getByTestId('main__modal-btn--cancel-logout'))

    await waitFor(() => {
      expect(
        queryByTestId('main__modal--logout', {
          includeHiddenElements: true,
        }),
      ).toBeNull()
    })
    expect(store.getState().auth.isAuthenticated).toBe(false)
  })

  it('logs out and resets navigation to Login when logout is confirmed', async () => {
    const { getByTestId, navigation, store } = await renderMain([])
    fireEvent.press(getByTestId('main__btn--menu'))

    await waitFor(() => {
      expect(
        getByTestId('main__modal--logout', { includeHiddenElements: true })
          .props.visible,
      ).toBe(true)
    })

    fireEvent.press(getByTestId('main__modal-btn--confirm-logout'))

    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Login' }],
    })
    expect(store.getState().auth.isAuthenticated).toBe(false)
  })
})
