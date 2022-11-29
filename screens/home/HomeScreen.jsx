import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


const HomeScreen = () => {


  return (
    <View style={{ backgroundColor: "#68CCC0", height: "100%" }} >
      <View style={styles.viewInicio}>
        <Text style={styles.textInicio}>Inicio</Text>
        <View style={styles.textCitas}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 20, }}>Citas Agendadas</Text>
        </View>
      </View>
    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  viewInicio: {
    alignItems: 'center',
    backgroundColor: "#65D1B7",
    height: 210,
    borderBottomWidth: 1,
    borderColor: '#65D1B7',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.84,
    elevation: 9,
  },
  textInicio: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 80
  },
  textCitas: {
    borderRadius:10,
    marginTop: 58,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: "#232020",
    width: "65%",
    shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.84,
        elevation: 5,
  }

});