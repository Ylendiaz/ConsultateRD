import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import CitasAgendadas from '../../components/CitasAgendadas';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationBuilder } from '@react-navigation/native';

const HomeScreen = ({ navigation, route }) => {

  let appPacienteID = 0;//here we're going to save the pacient id of the user that is logged in (to fetch appointments informacion)

  // ----------------Consumir API tabla Usuario Pacientes-----------------
  useEffect(() => {
    //call fetchData passing the GET request url
    fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes');//pacient users
  }, []);

  const fetchData = async (url) => {
    try {

      const response = await fetch(url); //get the request response
      const json = await response.json(); // transform it to json format
      const getid = json.filter(x => x.loginId == route.params.loginId).map(y => { return y.pacienteId }); // get the pacient id where the loginId's match

      appPacienteID = getid[0]; // save the pacient id found in a global variable

    } catch (error) {
      console.error(error); // otherwise there was an error in the request
    }
  };


  //-------------Consumir API tabla GestionCitas--------------------

  const [apidataCitas, apisetDataCitas] = useState([]); //useState to save the appointments of this specific

  useEffect(() => {
    //call fetchData passing the GET request url
    fetchAppointments('https://consultaterd.azurewebsites.net/api/CitasAgendadas'); // appointments
  }, []);

  const fetchAppointments = async (url) => {

    try {

      const response = await fetch(url); //get the request response
      const json = await response.json(); // transform it to json format
      const appointmentsArray = json.filter(item => item.pacienteId == appPacienteID); //add the appointments with this pacientID to the array
      apisetDataCitas(appointmentsArray); // save it in the useState variable

    } catch (error) {
      console.error(error);// otherwise there was an error in the request
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
        ? <CitasAgendadas citas={apidataCitas} login1={true} onPress={(item) => navigation.navigate('InfoCita', { item }) }></CitasAgendadas>
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