import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Login } from '../Login';
import { createTestStore } from '../../../utils/testStore';
import { createMockNavigation, createMockRoute } from '../../../utils/testNavigation';

async function renderLogin() {
  const store = createTestStore();
  const navigation = createMockNavigation<'Login'>({ replace: jest.fn() });
  const route = createMockRoute('Login', undefined);
  const utils = await render(
    <Provider store={store}>
      <Login navigation={navigation} route={route} />
    </Provider>,
  );
  return { ...utils, navigation, store };
}

describe('Login screen', () => {
  it('renders without crashing and shows the id input and submit button', async () => {
    const { getByTestId } = await renderLogin();
    expect(getByTestId('login-input-id')).toBeTruthy();
    expect(getByTestId('login-btn-submit')).toBeTruthy();
  });

  it('should disable submit until a valid 13-digit ID or 10-digit phone is entered', async () => {
    const { getByTestId } = await renderLogin();
    const input = getByTestId('login-input-id');
    const submit = getByTestId('login-btn-submit');

    expect(submit.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(input, '0812345678');

    await waitFor(() => {
      expect(submit.props.accessibilityState.disabled).toBe(false);
    });
  });

  it('should navigate to Main on successful submit', async () => {
    const { getByTestId, navigation } = await renderLogin();
    const input = getByTestId('login-input-id');
    const submit = getByTestId('login-btn-submit');

    fireEvent.changeText(input, '0812345678');
    await waitFor(() => expect(submit.props.accessibilityState.disabled).toBe(false));

    fireEvent.press(submit);

    await waitFor(() => expect(navigation.replace).toHaveBeenCalledWith('Main'));
  });
});
