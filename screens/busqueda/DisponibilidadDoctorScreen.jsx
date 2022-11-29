import React, { Component, useState } from "react";
import { StyleSheet, Button, Text, View } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import AppNavigator from '../../navigator/Navigator';


const DisponibilidadDoctorScreen = ({ navigation, route }) => {

    //Informacion del horario del doctor que fue seleccionado
    // const { horarioId, diaId, doctorId, centroMedicoId, horaInicio, horaCierre} = route.params.item;
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

    return <>
        <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.containerCalendar}>
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
            </View>
            <View style={styles.viewTitle}>
                <View style={styles.boxTitle}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 20, }}>Horarios Disponibles</Text>
                </View>
            </View>
        </View>
    </>


}

export default DisponibilidadDoctorScreen;

const styles = StyleSheet.create({
    containerCalendar: {
        paddingTop: 25,
        marginBottom: 25
    },
    textStyle: {
        marginTop: 10,
    },
    viewTitle: {
        alignItems: 'center',
        backgroundColor: "#68CCC0",
        borderBottomWidth: 1,
        borderColor: '#65D1B7',
    },
    boxTitle: {
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#232020",
        width: "65%",
    }
})