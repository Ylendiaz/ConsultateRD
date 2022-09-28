import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './screens/Navigator';
import AppNavigatorLogin from "./screens/NavigatorLogin";

export default function App() {
  return (
   // <AppNavigator />
   <View style={styles.container}>
      <AppNavigatorLogin />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
