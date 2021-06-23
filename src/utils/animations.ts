import { Route } from '@react-navigation/native';
import { StackCardStyleInterpolator, StackNavigationOptions } from '@react-navigation/stack';

export type stackOptionType =
  | StackNavigationOptions
  | ((props: { route: Route<string, object | undefined>; navigation: any }) => StackNavigationOptions);

const cardStyleInterpolator: StackCardStyleInterpolator = ({ current }) => ({
  containerStyle: { opacity: current.progress },
});

const stackOptions: stackOptionType = {
  headerShown: false,
  animationTypeForReplace: 'pop',
  animationEnabled: true,
  cardStyleInterpolator,
};

const AnimationUtils = {
  stackOptions,
};

export default AnimationUtils;
