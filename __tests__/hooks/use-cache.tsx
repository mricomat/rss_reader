/* eslint-disable jest/valid-expect-in-promise */
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';

import useCache from 'src/hooks/use-cache';

const testObject = { test: 'data' };

// we can't add expect(result).not.toMatchSnapshot() because the date change every time

describe('when hook/use-cache', () => {
  it('given persist = false, setting test value it retrives correctly', async () => {
    const { result } = renderHook(() => useCache({ persist: false, cacheLife: 24 * 600000 }));
    const { set, get } = result.current;
    await set('test', testObject);
    expect(await get('test')).toMatchObject(testObject);
  });

  it('given persist = false, setting test value and deleting it correctly', async () => {
    const { result } = renderHook(() => useCache({ persist: false, cacheLife: 24 * 600000 }));
    const { set, get } = result.current;
    await set('test', testObject);
    await result.current.delete('test');
    expect(await get('test')).not.toBe(testObject);
    expect(await get('test')).toBe(undefined);
  });

  it('given persist = false, setting test value, clear all correctly', async () => {
    const { result } = renderHook(() => useCache({ persist: false, cacheLife: 24 * 600000 }));
    const { set, clear, get } = result.current;
    await set('test', testObject);
    await clear();
    expect(await get('test')).not.toBe(testObject);
    expect(await get('test')).toBe(undefined);
  });

  it('given persist = true, setting test value it retrives correctly', async () => {
    const { result } = renderHook(() => useCache({ persist: true, cacheLife: 100 }));
    const { set, get } = result.current;
    result.current.clear();
    await set('test', testObject);
    await waitFor(async () => expect(await get('test')).toMatchObject(testObject));
  });

  //   it('given persist = true, setting test value and using has correctly', async () => {
  //     const { result } = renderHook(() => useCache({ persist: true, cacheLife: 24 * 600000 }));
  //     const { set, has } = result.current;
  //     await set('test', testObject);
  //     expect(await has('test')).toBe(true);
  //   });

  it('given persist = true, with out setting test value and using has correctly', async () => {
    const { result } = renderHook(() => useCache({ persist: true, cacheLife: 24 * 600000 }));
    const { has } = result.current;
    expect(await has('test')).toBe(true);
  });
});
