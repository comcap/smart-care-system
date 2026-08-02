import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AddRequest } from '../AddRequest';
import { createTestStore } from '../../../utils/testStore';
import { flushMicrotasks } from '../../../utils/testFlush';
import { createMockNavigation, createMockRoute } from '../../../utils/testNavigation';
import { selectAllRequests } from '../../../store/slices/smartCareSlice';

async function renderAddRequest() {
  const store = createTestStore();
  const navigation = createMockNavigation<'AddRequest'>({ navigate: jest.fn() });
  const route = createMockRoute('AddRequest', undefined);
  const utils = await render(
    <Provider store={store}>
      <AddRequest navigation={navigation} route={route} />
    </Provider>,
  );
  return { ...utils, navigation, store };
}

describe('AddRequest screen', () => {
  it('renders the title and description inputs and submit button', async () => {
    const { getByTestId } = await renderAddRequest();
    expect(getByTestId('add-request-input-title')).toBeTruthy();
    expect(getByTestId('add-request-input-description')).toBeTruthy();
    expect(getByTestId('add-request-btn-submit')).toBeTruthy();
  });

  it('should disable submit until both title and description are filled', async () => {
    const { getByTestId } = await renderAddRequest();
    const submit = getByTestId('add-request-btn-submit');
    expect(submit.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(getByTestId('add-request-input-title'), 'แอร์เสีย');
    await flushMicrotasks();
    fireEvent.changeText(getByTestId('add-request-input-description'), 'แอร์ห้องประชุมไม่เย็น');

    await waitFor(() => expect(submit.props.accessibilityState.disabled).toBe(false));
  });

  it('should add a request to the store and navigate to Main on submit', async () => {
    const { getByTestId, navigation, store } = await renderAddRequest();
    fireEvent.changeText(getByTestId('add-request-input-title'), 'แอร์เสีย');
    await flushMicrotasks();
    fireEvent.changeText(getByTestId('add-request-input-description'), 'แอร์ห้องประชุมไม่เย็น');

    const submit = getByTestId('add-request-btn-submit');
    await waitFor(() => expect(submit.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(submit);

    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('Main'));
    expect(selectAllRequests(store.getState())).toHaveLength(1);
    expect(selectAllRequests(store.getState())[0].title).toBe('แอร์เสีย');
  });
});
