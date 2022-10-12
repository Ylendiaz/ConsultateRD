import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigatorLogin from "./navigator/NavigatorLogin";
import AppNavigator from ".//navigator/Navigator";
import DoctoresScreen from "./screens/busqueda/DoctoresScreen";

export default function App() {
  return (
      <AppNavigator></AppNavigator>
    // <View style={styles.container}>
    //   <AppNavigatorLogin />
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
