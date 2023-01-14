import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
//import { SafeAreaView } from "react-native-safe-area-context";
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";


const CitasAgendadas = (props) => {

    const { citas, login1, fecha, onPress } = props;

    // ----------------Consumir API tabla Usuario Pacientes-----------------
    const [apidataPaciente, apisetDataPaciente] = useState([]);

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

    //Funcion get estado de la cita
    const getEstadoCita = (item) => {
        let fechaactual = moment().format("YYYY-MM-DD HH:mm"); // Fecha Actual
        const citafecha1 = item.citaFecha //Fecha de la Cita

        //Convertir cita fecha en el formato de la fecha actual
        let fechacita = citafecha1.toString().substring(6) + "-" + citafecha1.toString().substring(3, 5) + "-" + citafecha1.toString().substring(0, 2);
        //Concatenar la fecha con la hora inicial de la cita
        let fechafinal = fechacita + "T" + item.citasHoraInicio
        //Validar si la fecha actual es despues de la fecha de la cita
        let validfecha = moment(fechaactual).parseZone().isSameOrAfter(fechafinal);
        //Concatenar la fecha con la hora final de la cita
        let fechafinalizada = fechacita + "T" + item.citaHoraCierre
        //Validar si la fecha actual es despues de la fecha de hora final de la cita (FINALIZAR)
        let validfechafinalizada = moment(fechaactual).parseZone().isSameOrAfter(fechafinalizada);

        // Si está después de la hora inicial de la cita, el doctor puede finalizarla
        if (validfecha == true) {
            // Si está después de la hora final de la cita, se finalizara automaticamente
            if (validfechafinalizada == true) {
                fetch('https://consultaterd.azurewebsites.net/api/CitasAgendadas/' + `${item.citaId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        citaId: item.citaId,
                        citaFecha: item.citaFecha,
                        citasHoraInicio: item.citasHoraInicio,
                        citaHoraCierre: item.citaHoraCierre,
                        centroMedicoId: item.centroMedicoId,
                        pacienteId: item.pacienteId,
                        doctorId: item.doctorId,
                        estadoCitas: false,
                        fechaCreacionCita: item.fechaCreacionCita,
                        fechaModificacionCita: item.fechaModificacionCita
                    })
                })
                    .then(response => {
                        response.json().then(data => {
                            console.log(data);
                        });
                    }).catch((error) => {
                        console.error(error);
                    })
            }

            return true
        }
        else
            return false
    }


    return (

        <ScrollView style={{ backgroundColor: '#68CCC0', height: "100%" }} >
            {
                citas.map((item, index) => {
                    return (
                        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                            {item.descripcion == null
                                ? <TouchableOpacity key={item.citaId} style={styles.listView} onPress={() => onPress({ item, login1, livebuttoncita: getEstadoCita(item) })} >
                                    <View style={styles.listViewContent}>
                                        <View style={styles.listTextView}>
                                            <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                                                {login1 == true
                                                    ?
                                                    <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#0C7A28", }}>
                                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>Cita</Text>
                                                    </View>

                                                    : <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#2B95FF", }}>
                                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>Con Paciente</Text>
                                                    </View>
                                                }
                                                <Text style={{ marginHorizontal: 5, }}></Text>
                                                {getEstadoCita(item) == true
                                                    ? <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#900707", }}>
                                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>En vivo</Text>
                                                    </View>
                                                    : null}
                                            </View>
                                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: "space-around", marginBottom: 10, borderColor: 'rgba(0, 0, 0, 0.25)' }}>
                                                <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citasHoraInicio} - {item.citaHoraCierre}</Text>
                                                <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citaFecha}</Text>
                                            </View>
                                            {login1 == true
                                                ? <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }}>Doctor/a:
                                                    <Text>  </Text>
                                                    <Text style={{ color: "black", marginBottom: 10, fontWeight: 'normal' }}>{apidataDoctores.filter(x => x.doctorId == item.doctorId).map(y => { return y.nombreDoctor + " " + y.apellidoDoctor })}</Text>
                                                </Text>
                                                : <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }}>Paciente:
                                                    <Text>  </Text>
                                                    <Text style={{ color: "black", marginBottom: 10, fontWeight: 'normal' }}>{apidataPaciente.filter(x => x.pacienteId == item.pacienteId).map(y => { return y.nombrePaciente + " " + y.apellidoPaciente })}</Text>
                                                </Text>
                                            }
                                            <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }}>Lugar:
                                                <Text>  </Text>
                                                <Text style={{ color: "black", fontWeight: 'normal' }}>{apidataCentros.filter(x => x.key == item.centroMedicoId).map(y => { return y.value })}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                : login1 == true
                                    ? null
                                    : <TouchableOpacity key={item.citaId} style={styles.listView} onPress={() => onPress({ item, login1, livebuttoncita: getEstadoCita(item) })} >
                                        <View style={styles.listViewContent}>
                                            <View style={styles.listTextView}>
                                                <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                                                    <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#FF7433", }}>
                                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>Personal</Text>
                                                    </View>
                                                    <Text style={{ marginHorizontal: 5, }}></Text>
                                                    {getEstadoCita(item) == true
                                                        ? <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#900707", }}>
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>En vivo</Text>
                                                        </View>
                                                        : null}
                                                </View>
                                                <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: "space-around", marginBottom: 10, borderColor: 'rgba(0, 0, 0, 0.25)' }}>
                                                    <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citasHoraInicio} - {item.citaHoraCierre}</Text>
                                                    <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citaFecha}</Text>
                                                </View>
                                                <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }}>Descripción:
                                                    <Text>  </Text>
                                                    <Text style={{ color: "black", marginBottom: 10, fontWeight: 'normal' }} >{item.descripcion}</Text>
                                                </Text>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View>
                    )
                })
            }
        </ScrollView>

    );
};

export default CitasAgendadas;

const styles = StyleSheet.create({

    listView: {
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
        marginHorizontal: 30,
        marginVertical: 15,

    },

    listTextView: {
        justifyContent: "center",
        width: "100%",
    }
});
