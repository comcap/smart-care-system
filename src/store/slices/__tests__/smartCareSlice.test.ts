import reducer, {
  loadStart,
  loadSucceeded,
  requestAdded,
  selectAllRequests,
  selectRequestById,
  selectRequestsStatus,
} from '../smartCareSlice';
import { SmartCare } from '../../../types/smartCare';

const sample: SmartCare = {
  id: 'sc-1',
  title: 'แอร์เสีย',
  description: 'แอร์ห้องประชุมไม่เย็น',
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('smartCareSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({ items: [], status: 'idle' });
  });

  it('should set status to loading on loadStart', () => {
    const state = reducer(undefined, loadStart());
    expect(state.status).toBe('loading');
  });

  it('should set items and status to succeeded on loadSucceeded', () => {
    const state = reducer(undefined, loadSucceeded([sample]));
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual([sample]);
  });

  it('should prepend a newly generated request on requestAdded', () => {
    const withOne = reducer(undefined, loadSucceeded([sample]));
    const state = reducer(
      withOne,
      requestAdded({ title: 'ไฟดับ', description: 'ไฟดับทั้งชั้น' }),
    );
    expect(state.items).toHaveLength(2);
    expect(state.items[0].title).toBe('ไฟดับ');
    expect(state.items[0].id).toEqual(expect.any(String));
    expect(state.items[0].createdAt).toEqual(expect.any(String));
    expect(state.items[1]).toEqual(sample);
  });

  it('should select all requests', () => {
    const state = { smartCare: { items: [sample], status: 'succeeded' as const } };
    expect(selectAllRequests(state)).toEqual([sample]);
  });

  it('should select a request by id when it exists', () => {
    const state = { smartCare: { items: [sample], status: 'succeeded' as const } };
    expect(selectRequestById(state, 'sc-1')).toEqual(sample);
  });

  it('should return undefined when selecting a request id that does not exist', () => {
    const state = { smartCare: { items: [sample], status: 'succeeded' as const } };
    expect(selectRequestById(state, 'does-not-exist')).toBeUndefined();
  });

  it('should select the current status', () => {
    const state = { smartCare: { items: [], status: 'loading' as const } };
    expect(selectRequestsStatus(state)).toBe('loading');
  });
});
