import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, Dimensions } from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
import AppNavigator from '../../navigator/Navigator';
import HorariosDoctors from "../../API/HorariosDoctors";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const DisponibilidadDoctorScreenModified = ({ navigation, route }) => {

    //Id del doctor (Disponibilidad del doctor en cuestion)
    const { citaId, centroMedicoId, pacienteId, doctorId, estadoCitas, fechaCreacionCita, fechaModificacionCita } = route.params;

    //sets if the modal popup is open or closed 

    //all of them are false by default (closed)
    const [succesModalOpen, setSuccesModalOpen] = useState(false); //popup de creacion de cita
    const [failModalOpen, setFailModalOpen] = useState(false); //popup de fallo al crear la cita


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

    //-------------Consumir API tabla GestionCitas--------------------
    const [apidataCitas, apisetDataCitas] = useState([]);
    // Mientras la api viene
    useEffect(() => {
        fetchDataCita('https://consultaterd.azurewebsites.net/api/CitasAgendadas');
    }, [])

    const fetchDataCita = async (url) => {
        try {
            const response = await fetch(url)
            const json = await response.json();
            const newarray = json.filter(item => item.doctorId == doctorId);
            apisetDataCitas(newarray);
        } catch (error) {
            console.error(error);
        }
    }

    // ----------------Consumir API tabla Usuario Doctores-----------------
    const [intervaloDoctor, setintervaloDoctor] = useState([]);

    useEffect(() => {
        fetchDataDoctores('https://consultaterd.azurewebsites.net/api/UsuarioDoctores/' + `${doctorId}`);
    }, [])

    const fetchDataDoctores = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setintervaloDoctor(json.intervaloCitas);

        } catch (error) {
            console.error(error);
        }
    };


    //PUT de Citas Agendadas a API
    const putCita = () => {

        var citafecha = selectDisponibilidad.fecha.format("DD-MM-YYYY");

        fetch('https://consultaterd.azurewebsites.net/api/CitasAgendadas/' + `${citaId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                citaId: citaId,
                citaFecha: citafecha,
                citasHoraInicio: selectDisponibilidad.inicio,
                citaHoraCierre: selectDisponibilidad.cierre,
                centroMedicoId: centroMedicoId,
                pacienteId: pacienteId,
                doctorId: doctorId,
                estadoCitas: true,
                fechaCreacionCita: fechaCreacionCita,
                fechaModificacionCita: new Date()
            })
        })
            .then(response => {
                if (response.ok)
                    setSuccesModalOpen(true)
                else
                    setFailModalOpen(true)
                response.json().then(data => {
                    console.log(data);
                });
            }).catch((error) => {
                console.error(error);
            })
    }

    //Calendario
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const dia = [
        { key: 1, dia: "Mon" },
        { key: 2, dia: "Tue" },
        { key: 3, dia: "Wed" },
        { key: 4, dia: "Thu" },
        { key: 5, dia: "Fri" },
        { key: 6, dia: "Sat" },
        { key: 7, dia: "Sun" }]

    const [horas, sethoras] = useState([])

    //Al seleccionar cambia la disponibilidad
    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
        } else {
            setSelectedEndDate(null);
            setSelectedStartDate(date);
        }
        setdisableButton(true);
        const selectedDay = date.toString().substring(0, 3); //Dia
        const arrayDia = dia.find(x => x.dia == selectedDay).key; //Dia ID
        const horarioDia = apidataHorarios.filter(x => x.diaId == arrayDia); //Horario de ese dia

        const array = [];
        sethoras(array);
        if (horarioDia.length > 0) {

            const horain = horarioDia.map(x => { return x.horaInicio }).toString() //Hora inicial del dia
            const horafin = horarioDia.map(x => { return x.horaCierre }).toString() //Hora final del dia

            var ah = "2020-01-04T" + horain + ":00.000Z";
            var bh = "2020-01-04T" + horafin + ":00.000Z";
            var a = new moment(ah);
            var b = new moment(bh);
            var diff = moment.duration(b.diff(a));
            var ds = diff.asMinutes() / 30

            var lee = horain;
            for (let i = 0; i < ds; i++) {
                const sumhorario = moment.duration(lee).add(intervaloDoctor, 'minute');
                const pastehorasin = sumhorario.hours().toString() + (sumhorario.minutes().toString() == 0 ? "00" : sumhorario.minutes().toString())//Format
                const formathora = moment(pastehorasin, "hmm").format("HH:mm"); //Format
                array.push({ inicio: lee, cierre: formathora, fecha: date });
                lee = formathora
            }
            sethoras(array);
        }
    }

    //Accion cuando se selecciona una hora
    const [selectDisponibilidad, setselectDisponibilidad] = useState([])
    const [disableButton, setdisableButton] = useState(true)
    const selectHour = (data) => {
        setselectDisponibilidad(data);
        disableButtonFunction();
    }

    //Funcion desactivar boton Confirmar
    const disableButtonFunction = () => {
        setdisableButton(false);
    }

    //Funcion get estado de la cita
    const getEstadoCita = (data) => {
        const datafecha = data.fecha.format("DD-MM-YYYY")
        const cita = apidataCitas.filter(x => x.citaFecha == datafecha & x.citasHoraInicio == data.inicio);

        //Validar si está después de la hora inicial de la cita, por lo tanto esta NO DISPONIBLE
        let fechaactual = moment().format("YYYY-MM-DD HH:mm"); // Fecha Actual
        let fechacita = datafecha.toString().substring(6) + "-" + datafecha.toString().substring(3, 5) + "-" + datafecha.toString().substring(0, 2);
        let fechafinal = fechacita + "T" + data.inicio
        let validfecha = moment(fechaactual).parseZone().isSameOrAfter(fechafinal);

        if (validfecha == true) {
            return true
        }

        if (cita.length > 0) {
            var estado = cita.map(y => { return y.estadoCitas });

            if (estado == "true")
                return true
            else
                return false
        } else
            return false
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
                        disabledDates={date => {
                            return date.isBetween(selectedStartDate, selectedEndDate);
                        }}
                        todayBackgroundColor="#e6ffe6"
                        selectedDayStyle={{ backgroundColor: "#68CCC0" }}
                        selectedDayTextColor="#000000"
                        ScrollView={true}
                        onDateChange={onDateChange}
                    />
                </View>
                <View style={styles.viewTitle}>
                    <View style={styles.boxTitle}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 20, }}>Horarios Disponibles</Text>
                    </View>
                    {selectedStartDate == null
                        ? <View style={styles.viewListDisponibilidad}>
                            <Text style={{ marginVertical: 10, alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: "#504D4C" }}>Seleccione un día</Text>
                        </View>
                        : <View style={styles.viewListDisponibilidad}>
                            {horas.length == 0
                                ? <Text style={{ marginVertical: 10, alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: "#504D4C" }}>En este día no se encuentra disponible</Text>
                                : horas.map(data => (
                                    <TouchableOpacity key={data.inicio} style={styles.viewTouch} disabled={getEstadoCita(data) == true ? true : false} onPress={() => selectHour(data)}>
                                        <View style={data == selectDisponibilidad ? styles.radioOff : styles.radioOn}></View>
                                        <Text style={{ fontSize: 14, marginRight: 20 }}>{data.inicio} - {data.cierre}</Text>
                                        {getEstadoCita(data) == true
                                            ? <Text style={styles.textNoDisponible}>No Disponible</Text>
                                            : <Text style={styles.textDisponible}>Disponible</Text>
                                        }
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    }
                    <TouchableOpacity
                        style={disableButton == true ? styles.buttonOn : styles.buttonOff}
                        disabled={disableButton}
                        onPress={() => putCita()}>
                        <Text style={styles.textStyleButton}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

        {/* Popup crear cita satisfactoriamente */}
        <Modal
            visible={succesModalOpen}
            animationType='fade'
            transparent={true}>

            <View style={styles.modalBackground}>
                <View style={styles.modalView}>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', padding: 20, fontSize: 18, fontWeight: 'bold' }}>Se ha modificado la cita correctamente</Text>

                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#0D0C0C' }]}
                            onPress={() => {
                                setSuccesModalOpen(false);// hide de popup 
                                navigation.navigate('GestionCita');//go back to the gestion cita screen
                            }}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 15 }}>Continuar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>

        </Modal>

        {/* Final del Popup */}


        {/* Popup el horario no esta disponible */}


        <Modal
            visible={failModalOpen}
            animationType='fade'
            transparent={true}>

            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    {/* <MaterialCommunityIcons 
                    name='close'
                    style={styles.modalClose}
                    size={24}
                    visible = {true}
                    onPress={()=>setFailModalOpen(false)}
                    /> */}

                    <View style={{ alignItems: 'center' }}>
                        <Text style=
                            {{
                                textAlign: 'center',
                                padding: 20,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}
                        >El horario seleccionado no esta disponible</Text>

                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#E85959' }]}
                            onPress={() => setFailModalOpen(false)}
                        >
                            <Text style={{ color: '#fff', fontSize: 15 }}>Continuar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>

        </Modal>

        {/* Final del Popup */}

    </>
}

export default DisponibilidadDoctorScreenModified;

const styles = StyleSheet.create({

    //modal styles
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
        padding: 10,
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    //others styles

    containerCalendar: {
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 25,
        backgroundColor: 'white'
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
        width: "80%",
        marginBottom: 35,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
    viewTouch: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#EDEDED',
    },
    radioOn: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 30,
        shadowColor: "#7E8C8A",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 7,
    },
    radioOff: {
        height: 20,
        width: 20,
        borderWidth: 1,
        backgroundColor: '#6F756E',
        borderColor: "#000000",
        borderRadius: 30,
        shadowColor: "#7E8C8A",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 7,
    },
    buttonOn: {
        borderRadius: 10,
        marginBottom: 50,
        backgroundColor: "rgba(96, 129, 91, 0.47)",
        borderWidth: 1,
        borderColor: "#3E523B",
        borderRadius: 99,
    },
    buttonOff: {
        borderRadius: 10,
        marginBottom: 50,
        backgroundColor: "#60815B",
        borderWidth: 1,
        borderColor: "#3E523B",
        borderRadius: 99,
    },
    textStyleButton: {
        marginHorizontal: 55,
        marginVertical: 10,
        color: "#FFFFFF",
        fontSize: 14
    },
    textDisponible: {
        width: 100,
        color: "#60815B",
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 15,
        marginRight: 20
    },
    textNoDisponible: {
        width: 100,
        color: "#CC2222",
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 15,
        marginRight: 20
    },

    //modal styles
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.30)',

    },
    modalView: {
        width: Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').width / 1.8,
        // width:'80%',
        // height:'40%',

        backgroundColor: "white",

        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 35,

        shadowColor: "#121212",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalButton: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 50,
        color: '#fff',
    },


})
