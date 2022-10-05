import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GestionCitaScreen from "./screens/citas/GestionCitaScreen";

export default function App() {
  return (
    < GestionCitaScreen/>
  /* <View style={styles.container}>
      
      <StatusBar style="auto" />
    </View>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
