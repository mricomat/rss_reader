import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';

import { routeNames } from 'src/hooks/use-navigation';
import NewsDetailScreen from 'src/screens/newsDetailScreen';
import NewsListScreen from 'src/screens/newsListScreen';
import { NewsStackParamType } from 'src/types/navigation';
import AnimationUtils from 'src/utils/animations';

enableScreens();

const RootStack = createStackNavigator<NewsStackParamType>();

const Root = () => (
  <RootStack.Navigator screenOptions={AnimationUtils.stackOptions}>
    <RootStack.Screen name={routeNames.NewsList} component={NewsListScreen} />
    <RootStack.Screen name={routeNames.NewsDetail} component={NewsDetailScreen} />
  </RootStack.Navigator>
);

export default Root;
