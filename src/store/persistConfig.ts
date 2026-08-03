import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistConfig } from 'redux-persist'
import { RootState } from './store'
import { SmartCareSliceState } from './slices/smartCareSlice'

export const rootPersistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

export const smartCarePersistConfig: PersistConfig<SmartCareSliceState> = {
  key: 'smartCare',
  storage: AsyncStorage,
  blacklist: ['status'],
}
