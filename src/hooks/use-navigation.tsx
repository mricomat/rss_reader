import { CommonActions, NavigationContainerRef, useNavigation } from '@react-navigation/native';

import { log } from 'src/utils/logger';

export enum routeNames {
  NewsList = 'NewsList',
  NewsDetail = 'NewsDetail',

  Main = 'Main',
}

let current: string | number | undefined = '';

const setCurrent = (c = '') => {
  current = c;
};

export const Navigator = {
  navigation: {} as NavigationContainerRef,

  initNavigator: (navigatorRef: any) => {
    Navigator.navigation = navigatorRef;
  },

  navigate: (routeName: string, params?: object) => {
    log('navigate', routeName, { params });
    if (current === routeName) {
      return;
    }
    setCurrent(routeName);
    Navigator?.navigation?.dispatch(CommonActions.navigate(routeName, params));
  },

  goBack: () => {
    log('goBack');
    setCurrent();
    Navigator?.navigation?.dispatch(CommonActions.goBack());
  },
};

const useCustomNavigation = () => {
  const navigation = useNavigation();
  const { dispatch } = navigation;

  const goBack = () => {
    log('goBack');
    setCurrent();
    dispatch(CommonActions.goBack());
  };

  const navigate = (routeName: string, params?: object) => {
    log('navigate', routeName, { params });

    if (current === routeName) return;

    setCurrent(routeName);
    dispatch(CommonActions.navigate(routeName, params));
  };

  return {
    navigation,
    goBack,
    navigate,
    dispatch,
    routeNames,
  };
};

export default useCustomNavigation;
