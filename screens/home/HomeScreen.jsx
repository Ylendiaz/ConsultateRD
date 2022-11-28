import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


const HomeScreen = () => {



  return (
    <SafeAreaView style={{ backgroundColor: "#68CCC0", height: "100%" }} >
      <View style={styles.viewInicio}>
        <Text style={styles.textInicio}>Inicio</Text>
        <View style={styles.textCitas}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 15, }}>Citas Agendadas</Text>
        </View>
      </View>
    </SafeAreaView>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  viewInicio: {
    alignItems: 'center',
    backgroundColor: "#65D1B7",
    height: 200,
    borderBottomWidth: 1,
    borderColor: '#7E8C8A',
    shadowColor: "#7E8C8A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.84,
    elevation: 9,
  },
  textInicio: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 70
  },
  textCitas: {
    borderRadius:10,
    marginTop: 55,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: "#232020",
    width: "65%",
  }

});