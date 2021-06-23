import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { routeNames } from 'src/hooks/use-navigation';

export type NewsStackParamType = {
  [routeNames.NewsList]: undefined;
  [routeNames.NewsDetail]: undefined;
};

export type MainStackParamType = {
  [routeNames.Main]: NewsStackParamType;
};

type IDefaultScreenProps<
  // take from CompositeNavigationProp
  CurrentCompositeStack,
  // take from navigators block,
  CurrentStack extends Record<string, object | undefined>,
  // current screen
  route extends string
> = {
  navigation: CurrentCompositeStack;
  route: RouteProp<CurrentStack, route>;
};

type rootStackCompositeType = CompositeNavigationProp<
  StackNavigationProp<MainStackParamType>,
  StackNavigationProp<NewsStackParamType>
>;
export type RootStackScreenType<route extends string> = IDefaultScreenProps<
  rootStackCompositeType,
  MainStackParamType,
  route
>;
