import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import smartCareReducer, { SmartCareSliceState } from '../store/slices/smartCareSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  smartCare: smartCareReducer,
});

export function createTestStore(preloadedState?: { smartCare?: Partial<SmartCareSliceState> }) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState
      ? {
          smartCare: {
            items: preloadedState.smartCare?.items ?? [],
            status: preloadedState.smartCare?.status ?? 'succeeded',
          },
        }
      : undefined,
  });
}
