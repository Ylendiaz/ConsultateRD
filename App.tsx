import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from 'react-native';
import AppNavigatorLogin from "./navigator/NavigatorLogin";
import AppNavigator from ".//navigator/Navigator";
import DoctoresScreen from "./screens/busqueda/DoctoresScreen";
import GestionCitaScreen from "./screens/citas/GestionCitaScreen";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
    //  <AppNavigator></AppNavigator>
    <View style={styles.container}>
      <AppNavigatorLogin />
      <StatusBar style="auto" />
    </View>
    // <GestionCitaScreen></GestionCitaScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
