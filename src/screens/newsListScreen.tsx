import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const NewListScreen = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

export default NewListScreen;
