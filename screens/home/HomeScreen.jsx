import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import CitasAgendadas from '../../components/CitasAgendadas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestionCita_Get from '../../API/GestionCita_Get';

const HomeScreen = ({navigation}) => {

  //Data Login
  const [data, setdata] = useState({})
  useEffect(() => {
    getData('@userData');
  }, [])

  const getData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name)
      if (value !== null) {
        setdata(JSON.parse(value));
      }
    } catch (e) {
      console.log(e)
    }
  }

  // ----------------Consumir API tabla Usuario Pacientes-----------------
  const [apidataPaciente, apisetDataPaciente] = useState([]);
  useEffect(() => {
    fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes')
  }, [])

  const fetchData = async (url) => {
    try {
      const response = await fetch(url)
      const json = await response.json();
      const getid = json.filter(x => x.loginId == data.loginId).map(y => {return y.pacienteId})
      apisetDataPaciente(getid);

    } catch (error) {
      console.error(error)
    }
  };

  //-------------Consumir API tabla GestionCitas--------------------
  const [apidataCitas, apisetDataCitas] = useState([])
  // Mientras la api viene
  useEffect(() => {
    fetchDataCita(GestionCita_Get);
  }, [])

  const fetchDataCita = (table) => {
    try {
      const newarray = table.filter(item => item.pacienteId == apidataPaciente);
      apisetDataCitas(newarray);
    } catch (error) {
      console.error(error);
    }
  }

  return (

    <View style={{ backgroundColor: "#68CCC0", height: "100%" }} >
      <View style={styles.viewInicio}>
        <Text style={styles.textInicio}>Inicio</Text>
        <View style={styles.textCitas}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 20, }}>Citas Agendadas</Text>
        </View>
      </View>
      {apidataCitas.length > 0
        ? <CitasAgendadas citas={apidataCitas} onPress= {(item)=>navigation.navigate('InfoCita', {item})}></CitasAgendadas>
        : <View style={styles.viewListDisponibilidad}>
          <Text style={{ marginVertical: 10, alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: "#504D4C" }}>No hay citas agendadas</Text>
        </View>
      }
    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  viewInicio: {
    alignItems: 'center',
    backgroundColor: "#65D1B7",
    height: 210,
    marginBottom: 50,
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
    borderRadius: 10,
    marginTop: 58,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  viewListDisponibilidad: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },

});