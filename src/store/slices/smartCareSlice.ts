import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SmartCare } from '@/types/smartCare'
import { generateId } from '@/utils/id'

export interface SmartCareSliceState {
  items: SmartCare[]
  status: 'idle' | 'loading' | 'succeeded'
}

type SmartCareState = SmartCareSliceState

const initialState: SmartCareState = {
  items: [],
  status: 'idle',
}

const smartCareSlice = createSlice({
  name: 'smartCare',
  initialState,
  reducers: {
    loadStart(state) {
      state.status = 'loading'
    },
    loadSucceeded(state, action: PayloadAction<SmartCare[]>) {
      state.items = action.payload
      state.status = 'succeeded'
    },
    requestAdded: {
      reducer(state, action: PayloadAction<SmartCare>) {
        state.items.unshift(action.payload)
      },
      prepare(input: { title: string; description: string }) {
        return {
          payload: {
            id: generateId(),
            title: input.title,
            description: input.description,
            createdAt: new Date().toISOString(),
          } satisfies SmartCare,
        }
      },
    },
  },
})

export const { loadStart, loadSucceeded, requestAdded } = smartCareSlice.actions
export default smartCareSlice.reducer

export const selectAllRequests = (state: {
  smartCare: SmartCareState
}): SmartCare[] => {
  return state.smartCare.items
}

export const selectRequestById = (
  state: { smartCare: SmartCareState },
  id: string,
): SmartCare | undefined => {
  return state.smartCare.items.find(item => item.id === id)
}

export const selectRequestsStatus = (state: {
  smartCare: SmartCareState
}): SmartCareState['status'] => {
  return state.smartCare.status
}
