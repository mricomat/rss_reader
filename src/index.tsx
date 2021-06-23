import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Index = (): JSX.Element => (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
    </SafeAreaProvider>
  );

export default Index;
