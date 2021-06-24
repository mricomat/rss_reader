import { ICache } from 'src/types/data';
import getLocalStorage from 'src/utils/storage/localStorage';
import getMemoryStorage from 'src/utils/storage/memoryStorage';

type UseCacheArgs = { persist: boolean; cacheLife: number };
const useCache = <T,>({ persist, cacheLife = 24 * 600000 }: UseCacheArgs): ICache<T> => {
  if (persist) return getLocalStorage<T>({ cacheLife });
  return getMemoryStorage<T>({ cacheLife });
};

export default useCache;
