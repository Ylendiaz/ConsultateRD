import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar} from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

 
const GestionCitaScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  
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
  
  const DATA = [
    {
      id: '1',
      title: '10:00 am - 10:30 am  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '2',
      title: '10:30 am - 11:00 am  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '3',
      title: '11:00 am - 11:30 am  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '4',
      title: '11:30 am - 12:00 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '5',
      title: '12:00 pm - 12:30 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '6',
      title: '12:30 pm - 01:00 pm \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '7',
      title: '01:00 pm - 01:30 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '8',
      title: '01:30 pm - 02:00 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '9',
      title: '02:00 pm - 02:30 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '10',
      title: '02:30 pm - 03:00 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '11',
      title: '03:00 pm - 03:30 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '12',
      title: '03:30 pm - 04:00 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '13',
      title: '04:00 pm - 04:30 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },
    {
      id: '14',
      title: '04:30 pm - 05:00 pm  \n ______________________________________\n -------------------- \n -------------------- \n --------------------',
    },


  ];

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
        <View style={styles.textStyle}>
          <Text style={styles.textStyle}>
            Selected Start Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>
        </View>
      </View>
      <View style={styles.container1}>
      <View style={styles.item2}> 
      <AppButton title="Citas Programadas" />
      </View>
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id} 
        />
      
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
    marginTop: StatusBar.currentHeight || 95,
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
});