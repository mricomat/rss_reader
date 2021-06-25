import AsyncStorage from '@react-native-async-storage/async-storage';

import { ICache } from 'src/types/data';

export enum StorageKeys {
  httpCache = 'useHTTPcache',
}

const getHttpCache = async () => {
  try {
    const value = await AsyncStorage.getItem(StorageKeys.httpCache);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return {};
      }
    }
    return {};
  } catch (e) {
    return {};
  }
};

const getLocalStorage = <T>({ cacheLife }: { cacheLife: number }): ICache<T> => {
  const remove = async (...requestIds: string[]) => {
    const cache = await getHttpCache();
    requestIds.forEach(id => delete cache[id]);
    await set(StorageKeys.httpCache, cache);
  };

  const clear = async () => {
    await AsyncStorage.removeItem(StorageKeys.httpCache);
  };

  const isExpired = async (requestId: string) => {
    const cache = await getHttpCache();
    if (cache) {
      const { expiration, response } = cache[requestId] || {};
      const expired = expiration > 0 && expiration < Date.now();
      if (expired) remove(requestId);
      return expired || !response;
    }
    return true;
  };

  const has = async (requestId: string) => !(await isExpired(requestId));

  const get = async (requestId: string): Promise<any> => {
    if (await isExpired(requestId)) return undefined;
    const cache = await getHttpCache();

    return cache[requestId].response;
  };

  const set = async (requestId: string, value: any) => {
    const cache = await getHttpCache();
    cache[requestId] = {
      response: value,
      expiration: Date.now() + cacheLife,
    };

    try {
      await AsyncStorage.setItem(StorageKeys.httpCache, JSON.stringify(cache));
      return true;
    } catch (e) {
      return false;
    }
  };

  return Object.defineProperties(getHttpCache(), {
    get: { value: get, writable: false },
    set: { value: set, writable: false },
    has: { value: has, writable: false },
    clear: { value: clear, writable: false },
    delete: { value: remove, writable: false },
  });
};

export default getLocalStorage;
