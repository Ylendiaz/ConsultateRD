import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
//import { SafeAreaView } from "react-native-safe-area-context";
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CitasAgendadas = (props) => {


    const { citas, login1, fecha, onPress } = props;
    const [apidataPaciente, apisetDataPaciente] = useState([]);


    const [userData, setUserData] = React.useState([]);
    const getData = async (keyname) => {
        try {
            const value = await AsyncStorage.getItem(keyname)
            if (value !== null) {
                // value previously stored
                setUserData(JSON.parse(value));
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData('@userData');
    }, [])

    // ----------------Consumir API tabla Usuario Pacientes-----------------
    useEffect(() => {
        fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes');
    }, [])


    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            apisetDataPaciente(json);
            // console.log(json);

        } catch (error) {
            console.error(error);
        }
    };

    const [apidataCentros, apisetDataCentros] = useState([]);

    // ----------------Consumir API tabla Centro Medico-----------------
    useEffect(() => {
        fetchDataCentros('https://consultaterd.azurewebsites.net/api/CentroMedico');
    }, [])

    const fetchDataCentros = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const newarray = json.map((item) => {
                return { key: item.centroMedicoId, value: item.centroMedicoNombre }
            })
            apisetDataCentros(newarray);

        } catch (error) {
            console.error(error);
        }
    };

    // ----------------Consumir API tabla Usuario Doctores-----------------
    const [apidataDoctores, apisetDoctores] = useState([]);

    useEffect(() => {
        fetchDataDoctores('https://consultaterd.azurewebsites.net/api/UsuarioDoctores');
    }, [])

    const fetchDataDoctores = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            apisetDoctores(json);

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <ScrollView style={{ backgroundColor: '#68CCC0', height: "100%" }} >
            {
                citas.map((item, index) => {
                    return (


                        <TouchableOpacity key={item.citaId} style={styles.listView} onPress={() => onPress({ item, login1 })} >
                            <View style={styles.listViewContent}>

                                <View style={styles.listTextView}>
                                    <Text style={{ color: "black", marginBottom: 8 }} >{item.citaFecha}                                            {item.citasHoraInicio}</Text>

                                    {login1 == true
                                        ? <Text>{apidataDoctores.filter(x => x.doctorId == item.doctorId).map(y => { return y.nombreDoctor + " " + y.apellidoDoctor })}</Text>

                                        : <Text>{apidataPaciente.filter(x => x.pacienteId == item.pacienteId).map(y => { return y.nombrePaciente + " " + y.apellidoPaciente })}</Text>
                                    }


                                    {/* {userData.rol == login1
                                        ? <Text>{apidataDoctores.filter(x => x.doctorId == item.doctorId).map(y => { return y.nombreDoctor + " " + y.apellidoDoctor })}</Text>
                                        : <Text>{apidataPaciente.filter(x => x.pacienteId == item.pacienteId).map(y => { return y.nombrePaciente + " " + y.apellidoPaciente })}</Text>} */}


                                    <Text>{apidataCentros.filter(x => x.key == item.centroMedicoId).map(y => { return y.value })}</Text>


                                </View>
                            </View>
                        </TouchableOpacity>

                    )
                })
            }
        </ScrollView>

    );
};

export default CitasAgendadas;

const styles = StyleSheet.create({

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
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 15,
        
    },

    // listTextView: {
    //     marginLeft: 15
    // }
});
