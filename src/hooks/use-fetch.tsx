import axios, { AxiosResponse, Method } from 'axios';
import { useReducer } from 'react';

import useCache from './use-cache';

import { log } from 'src/utils/logger';

axios.defaults.headers.common.Accept = 'application/json';

enum ActionType {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  FETCH_ERROR = 'FETCH_ERROR',
}

type IState<T> = {
  status: ActionType;
  data: T;
  error: any;
};

export const useFetch = <T,>(persist: boolean, cacheLife: number) => {
  const cache = useCache<T>({ persist, cacheLife });

  const initialState: IState<any> = {
    status: ActionType.FETCHED,
    error: false,
    data: [],
  };

  const updateFetchState = (state: IState<T>, newState: Partial<IState<T>>) => ({ ...state, ...newState });
  const [state, setState] = useReducer(updateFetchState, initialState);

  const doFetch = async (method: Method = 'get', url: string, dataRequest: any) => {
    if (url !== '') {
      setState({ status: ActionType.FETCHING, data: initialState.data });
      const requestId = Object.entries({ url, method, body: JSON.stringify(dataRequest) || '' })
        .map(([key, value]) => `${key}:${value}`)
        .join('||');

      if (await cache.has(requestId)) {
        const data = await cache.get(requestId);
        log(`${method} ${url} Cached`, data);
        setState({ status: ActionType.FETCHED, data });
      } else {
        checkResponse(
          axios({ method, url, ...dataRequest }).catch(e => e),
          method,
          url,
          requestId
        );
      }
    }
  };

  const checkResponse = async (
    response: Promise<{ response: AxiosResponse }>,
    method: Method,
    url: string,
    requestId: string
  ) =>
    response
      .then(res => res.response || res)
      .then(async res => {
        log(`${method} ${url}`, res.data);
        if (res.status !== 200) {
          setState({ status: ActionType.FETCH_ERROR, error: true });
        }
        setState({ status: ActionType.FETCHED, data: res.data });
        await cache.set(requestId, res.data);
      })
      .catch(error => {
        log(`${method} ${url} Error`, error);
        setState({ status: ActionType.FETCH_ERROR, error });
      });

  return {
    isLoading: state.status === ActionType.FETCHING,
    error: state.error,
    data: state.data,
    doFetch,
    state,
  };
};
