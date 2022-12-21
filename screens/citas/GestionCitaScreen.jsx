import React, { Component, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
//import { SafeAreaView } from "react-native-safe-area-context";
import { withSafeAreaInsets } from 'react-native-safe-area-context';

// import Paciente from '../../API/Paciente';
import AppNavigator from '../../navigator/Navigator';
import CitasAgendadas from '../../components/CitasAgendadas';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GestionCitaScreen = ({ navigation, route }) => {

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [apidata, apisetData] = useState([]);
  const [apifilteredData, apisetFilteredData] = useState([]);

  let appDoctorID = 0;//here we're going to save the pacient id of the user that is logged in (to fetch appointments informacion)

  const refresh = useCallback(() => {
    // Perform any refresh logic here
    fetchAppointments('https://consultaterd.azurewebsites.net/api/CitasAgendadas'); // appointments
  }, []);

  useEffect(() => {
    //call fetchData passing the GET request url
    fetchDataDoctor('https://consultaterd.azurewebsites.net/api/UsuarioDoctores');//doctor users
  }, []);

  const fetchDataDoctor = async (url) => {
    try {

      const response = await fetch(url); //get the request response
      const json = await response.json(); // transform it to json format
      const getid = json.filter(x => x.loginId == route.params.loginId).map(y => { return y.doctorId }); // get the pacient id where the loginId's match
      // setapppacienteid(getid[0])
      appDoctorID = getid[0]; // save the pacient id found in a global variable

    } catch (error) {
      console.error(error); // otherwise there was an error in the request
    }
  };


  useEffect(() => {
    //call fetchData passing the GET request url
    fetchAppointments('https://consultaterd.azurewebsites.net/api/CitasAgendadas'); // appointments

    const interval = setInterval(refresh, 5000); // refresh the screen every 5 second

    return () => clearInterval(interval);
  }, [refresh]);

  const fetchAppointments = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const newarray = json.filter(item => item.doctorId == appDoctorID);
      apisetData(newarray);
      apisetFilteredData(newarray);
    } catch (error) {
      console.error(error);
    }
  };


  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      const fecha = date.format("DD-MM-YYYY")
      setSelectedStartDate(fecha);
      const newarray = apidata.filter(x => x.citaFecha == fecha);
      apisetFilteredData(newarray);
      console.log(newarray);
    }


    // const fechaCita = date.format("DD-MM-YYYY")
    console.log(selectedStartDate)
  };



  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  // QUITAR FILTROS
  const QuitarFiltros = () => {
    apisetFilteredData(apidata);

  }


  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <CalendarPickerModal
            startFromMonday={true}
            minDate={new Date(2018, 1, 1)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={
              [
                'Lun',
                'Mar',
                'Mier',
                'Jue',
                'Vier',
                'Sab',
                'Dom'
              ]}
          months={[
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
          ]}
          previousTitle="Anterior"
          nextTitle="Siguiente"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          onDateChange={onDateChange}
        />
        <TouchableOpacity style={{}} onPress={() => QuitarFiltros()}>
          <MaterialCommunityIcons name="filter-off" size={20} color={'#D01B1B'} style={{ marginHorizontal: 25, alignSelf: 'flex-end'}}></MaterialCommunityIcons>
        </TouchableOpacity>
        
      </View>
      
      <View style={styles.container1}>
      
      <View style={styles.item2}> 
      <AppButton title="Citas Programadas"/>
      </View>
      
      {apifilteredData.length>0 
      ? <CitasAgendadas citas ={apifilteredData}  login1 = {false} onPress= {(item, login1)=>navigation.navigate('InfoCita', {item, login1})}></CitasAgendadas>
      :<View style= {{paddingBottom: 180}}><Text style = {styles.title}>No hay citas programadas para la fecha seleccionada</Text></View>}
      
    </View>
     </ScrollView> 
  </SafeAreaView>
    
  );
};


export default GestionCitaScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingTop: 35,
    //backgroundColor: '#ffffff',

  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  container1: {
    flex: 0,
    backgroundColor: '#68CCC0',
    marginTop: StatusBar.currentHeight || 35,
    padding: 25,
    paddingTop: 25,
    paddingBottom: 110,
    height: "100%", 
    width: "100%",
    
  },
  // item: {
  //   backgroundColor: '#FFFFFF',
  //   padding: 20,
  //   borderRadius: 15,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   shadowColor: '#171717',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 2,
  //   shadowRadius: 3,
  // },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#232020",
    padding: 20,
    borderRadius: 15,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  appButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  title: {
    fontSize: 20,
    textAlign: 'center', 
    fontWeight: "bold", 
    paddingTop: 25
    
  },
  listView: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 2
  },

  listViewContent: {
    //flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "center",
    marginHorizontal: 15,
    marginVertical: 15
  },

  // listTextView: {
  //     marginLeft: 15
  // }


});