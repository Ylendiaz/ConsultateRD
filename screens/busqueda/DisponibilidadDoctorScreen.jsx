import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, ScrollView, TextInput } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import AppNavigator from '../../navigator/Navigator';
import HorariosDoctors from "../../API/HorariosDoctors";


const DisponibilidadDoctorScreen = ({ navigation, route }) => {

    //Id del doctor (Disponibilidad del doctor en cuestion)
    const { doctorId, intervaloCitas } = route.params;

    //-------------Consumir API tabla HorariosDoctors--------------------
    const [apidataHorarios, apisetDataHorarios] = useState([]);
    // Mientras la api viene
    useEffect(() => {
        fetchDataEspecialidad(HorariosDoctors);
    }, [])

    const fetchDataEspecialidad = (table) => {
        try {
            const newarray = table.filter(item => item.doctorId == doctorId);
            apisetDataHorarios(newarray);

        } catch (error) {
            console.error(error);
        }
    }

    //Calendario
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

    const ej = () => {
        var myloop = [];
        for (let i = 0; i < 10; i++) {
            
            myloop.push(
                <View key={i}>
                    <TextInput>{i}</TextInput>
                </View>
            );
        }
        console.log(myloop);
        return myloop;
    }

    return <>
        <View style={{ width: "100%", height: "100%" }}>
            <ScrollView style={{ height: "100%", backgroundColor: '#68CCC0' }}>
                <View style={styles.containerCalendar}>
                    <CalendarPickerModal
                        startFromMonday={true}
                        minDate={new Date()}
                        maxDate={new Date(2050, 6, 3)}
                        weekdays={['Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab', 'Dom']}
                        months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                        previousTitle="Anterior"
                        nextTitle="Siguiente"
                        // disabledDates={date => date.isBetween('2018-1-1','2050-6-3')}
                        disabledDates={date => {
                            return date.isBetween(selectedStartDate, selectedEndDate);
                        }}
                        todayBackgroundColor="#e6ffe6"
                        selectedDayStyle={{ backgroundColor: "#36C0FB" }}
                        selectedDayTextColor="#000000"
                        ScrollView={true}
                        onDateChange={onDateChange}
                    />
                </View>
                <View style={styles.viewTitle}>
                    <View style={styles.boxTitle}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 20, }}>Horarios Disponibles</Text>
                    </View>
                    <View style={styles.viewListDisponibilidad}>
                        <Text>Aqui se encuentrala ccosa</Text>
                        <Text>Aqui</Text>
                    </View>
                    {/* {ej()} */}
                </View>
            </ScrollView>
        </View>
    </>
}

export default DisponibilidadDoctorScreen;

const styles = StyleSheet.create({
    containerCalendar: {
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 25,
        backgroundColor: 'white'
    },
    textStyle: {
        marginTop: 10,
    },
    viewTitle: {
        width: "100%", height: "100%",
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#65D1B7',
    },
    boxTitle: {
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#232020",
        width: "65%",
    },
    viewListDisponibilidad: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
    }
})