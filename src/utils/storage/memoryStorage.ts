import { ICache } from 'src/types/data';

let inMemoryStorage: any = {};

const getMemoryStorage = <T>({ cacheLife }: { cacheLife: number }): ICache<T> => {
  const remove = async (...requestIds: string[]) => {
    requestIds.forEach(requestId => {
      delete inMemoryStorage[requestId];
      delete inMemoryStorage[`${requestId}:ts`];
    });
  };

  const isExpired = (requestId: string) => {
    const expiration = inMemoryStorage[`${requestId}:ts`];
    const expired = expiration > 0 && expiration < Date.now();
    if (expired) remove(requestId);
    return expired || !inMemoryStorage[requestId];
  };

  const get = async (requestId: string) => {
    if (isExpired(requestId)) return undefined;
    return inMemoryStorage[requestId] as T;
  };

  const set = async (requestId: string, res: T) => {
    inMemoryStorage[requestId] = res;
    inMemoryStorage[`${requestId}:ts`] = cacheLife > 0 ? Date.now() + cacheLife : 0;
  };

  const has = async (requestId: string) => !isExpired(requestId);

  const clear = async () => {
    inMemoryStorage = {};
  };

  return Object.defineProperties(inMemoryStorage, {
    get: { value: get, writable: false, configurable: true },
    set: { value: set, writable: false, configurable: true },
    has: { value: has, writable: false, configurable: true },
    delete: { value: remove, writable: false, configurable: true },
    clear: { value: clear, writable: false, configurable: true },
  });
};

export default getMemoryStorage;
