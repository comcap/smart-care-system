import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import authReducer from './slices/authSlice'
import smartCareReducer from './slices/smartCareSlice'
import { rootPersistConfig, smartCarePersistConfig } from './persistConfig'

const rootReducer = combineReducers({
  auth: authReducer,
  smartCare: persistReducer(smartCarePersistConfig, smartCareReducer),
})

export type RootState = ReturnType<typeof rootReducer>

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
