import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
//import { SafeAreaView } from "react-native-safe-area-context";
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import GestionCita_Get from '../../API/GestionCita_Get';
import Paciente from '../../API/Paciente';
import AppNavigator from '../../navigator/Navigator';

const GestionCitaScreen = ({ }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);


  const [CitasData, SetCitasData] = useState([]);
  const [filterCitasData, setFilterCitasData] = useState([]);
  const [dataCita, setDataCita] = useState([]);
  const [search, setSearch] = useState("");


  const [apidata, apisetData] = useState([]);
  const [apifilteredData, apisetFilteredData] = useState([]);

  useEffect(() => {
    fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes');
  }, [])

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      apisetData(json);
      apisetFilteredData(json);
      console.log(json);

    } catch (error) {
      console.error(error);
    }
  };


  function citasAgendadas() {
    const js = GestionCita_Get;
    useEffect(() => {
      SetCitasData(js);
      setFilterCitasData(js);
    }, [])
    return citasAgendadas;
  }

  const ci = Paciente;
  useEffect(() => {
    setDataCita(ci);
  }, [])


  const citasList = citasAgendadas();


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
      setSelectedStartDate(date);
    }
  };

  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );


  // Funcion para filtrar las citas por fecha
  const SearchFilter = (text) => {
    if (text) {
      const newData = apidata.filter((item) => {
        const itemData = item.nombrePaciente ? item.nombrePaciente.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      apisetFilteredData(newData);
      setSearch(text);
    } else {
      apisetFilteredData(apidata);
      setSearch(text);
    }
  }


  return (

    <SafeAreaView style={styles.container}>
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
        {<View style={styles.textStyle}>
          <Text style={styles.textStyle}>
            Selected Start Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}

          </Text>
        </View>}
      </View>
      <View style={styles.container1}>
        <View style={styles.item2}>
          <AppButton title="Citas Programadas" />
        </View>

        <ScrollView style={{ backgroundColor: '#68CCC0', height: "100%" }}>
          {
            apifilteredData.map((item, index) => {
              return (

                <TouchableOpacity key={item.pacienteId} style={styles.listView} onPress={() => navigation.navigate('InfoCita', { item })}>
                  <View style={styles.listViewContent}>

                    <View style={styles.listTextView}>
                      <Text style={{ color: "black", marginBottom: 8 }}>{item.nombrePaciente} {item.apellidoPaciente}</Text>


                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};


export default GestionCitaScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingTop: 25,
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
    backgroundColor: "black",
    padding: 30,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  appButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  title: {
    fontSize: 15,
    textAlign: 'center'
  },
  listView: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 2,
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