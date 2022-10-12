import React, {useEffect, useState} from 'react';
import {SafeAreaView, Scrollview,StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar} from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import GestionCita_Get from '../../API/GestionCita_Get';
import Paciente from '../../API/Paciente';
 
const GestionCitaScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  
  
  const [CitasData, SetCitasData] = useState([]);
  const [filterCitasData, setFilterCitasData] = useState([]);
  const [dataCita, setDataCita] = useState([]);


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

// function citasAgendadas() {
//   const js = Paciente;
//   useEffect(() => {
//       SetCitasData(js);
//       setFilterCitasData(js);
//   }, [])
//   return citasAgendadas;
// }
  
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

  const AppButton1 = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer1}>
      <Text style={styles.appButtonText1}>{title}</Text>
    </TouchableOpacity>
  );

  const AppButton2 = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer2}>
      <Text style={styles.appButtonText1}>{title}</Text>
    </TouchableOpacity>
  );
  
  


  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
      <View style={styles.item2}> 
      <AppButton title="Citas Programadas"/>
      </View>
        <FlatList
            data={filterCitasData}
            //renderItem={renderItem}
            renderItem= {({item}) => <Text style = {styles.item}>{dataCita.find(x => x.pacienteId == item.pacienteId).nombrePaciente}   {dataCita.find(x => x.pacienteId == item.pacienteId).apellidoPaciente}       {item.citasHoraInicio} - {item.citaHoraCierre}</Text>}
            keyExtractor={item => item.id} 
        />
         
      <AppButton1 title="Modificar cita"/>
      <AppButton2 title="Cancelar cita"/>
    
      </View>
    </SafeAreaView>
  );
};

export default GestionCitaScreen;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
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
    flex: 1,
    backgroundColor: '#68CCC0',
    marginTop: StatusBar.currentHeight || 75,
    padding: 25, 
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 2,
    shadowRadius: 3,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "black",
    padding: 30,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  appButtonContainer1: {
    elevation: 2,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 70,
    marginVertical: 10,
    marginHorizontal: 35,
    fontSize: 15
  },
  appButtonContainer2: {
    elevation: 4,
    backgroundColor: "darkred",
    padding: 15,
    borderRadius: 70,
    marginVertical: 50,
    marginHorizontal: 35,
    fontSize: 15
  },
  appButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonText1: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  
  title: {
    fontSize: 15,
    textAlign: 'center'
  },
  
});