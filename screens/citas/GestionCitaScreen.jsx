import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
 
const GestionCitaScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
 
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          <CalendarPickerModal
          startFromMonday={true}
          allowRangeSelection={true}
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
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: 'Calibri',
            color: '#000000',
          }}
          onDateChange={onDateChange}
        />
        <View style={styles.textStyle}>
          <Text style={styles.textStyle}>
            Selected Start Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>
          <Text style={styles.textStyle}>
            Selected End Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedEndDate ? selectedEndDate.toString() : ''}
          </Text>
        </View>
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
});