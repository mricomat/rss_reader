import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigator, routeNames } from 'src/hooks/use-navigation';
import Router from 'src/navigation/root';

const GlobalStack = createStackNavigator();

const Index = (): JSX.Element => {
  const navRef = useRef<NavigationContainerRef>(null);

  useEffect(() => {
    Navigator.initNavigator(navRef.current);
  }, [navRef]);

  const Component = (props: any) => <Router navRef={navRef} {...props} />;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer ref={navRef}>
        <GlobalStack.Navigator>
          <GlobalStack.Screen name={routeNames.Main} component={Component} options={{ headerShown: false }} />
        </GlobalStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Index;
