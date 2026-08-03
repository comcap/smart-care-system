import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { RequestDetail } from '../RequestDetail'
import { createTestStore } from '@/utils/testStore'
import { createMockNavigation, createMockRoute } from '@/utils/testNavigation'
import { SmartCare } from '@/types/smartCare'

const sample: SmartCare = {
  id: 'sc-1',
  title: 'แอร์เสีย',
  description: 'แอร์ห้องประชุมไม่เย็น',
  createdAt: '2026-01-01T00:00:00.000Z',
}

async function renderDetail(id: string) {
  const store = createTestStore({
    smartCare: { items: [sample], status: 'succeeded' },
  })
  const navigation = createMockNavigation<'RequestDetail'>({})
  const route = createMockRoute('RequestDetail', { id })
  return render(
    <Provider store={store}>
      <RequestDetail navigation={navigation} route={route} />
    </Provider>,
  )
}

describe('RequestDetail screen', () => {
  it('renders the card with id, title, description, and createdAt when the request exists', async () => {
    const { getByTestId, getByText } = await renderDetail('sc-1')
    expect(getByTestId('request-detail__card')).toBeTruthy()
    expect(getByTestId('request-detail__id--value')).toHaveTextContent('#sc-1')
    expect(getByText('แอร์เสีย')).toBeTruthy()
    expect(getByText('แอร์ห้องประชุมไม่เย็น')).toBeTruthy()
  })

  it('shows an error state when the id does not match any request', async () => {
    const { getByTestId, queryByTestId } = await renderDetail('does-not-exist')
    expect(getByTestId('request-detail__error')).toBeTruthy()
    expect(queryByTestId('request-detail__card')).toBeNull()
  })
})
