import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import StyledButtonIcon from "../../components/StyledButtonIcon";
import AppNavigator from '../../navigator/Navigator';
import InfoCita from "../../components/InfoCita";
import GestionCita_Get from '../../API/GestionCita_Get';

const InfoCitaScreen = ({ route }) => {
    
    //Informacion de la cita que fue seleccionado
    const { citaId, citaFecha, citasHoraInicio, citaHoraCierre, centroMedicoId, pacienteId, doctorId, estadoCitas, fechaCreacionCita, fechaModificacionCita } = route.params.item.item;
    
    console.log(route.params.item.item);
 
    const [apidataPaciente, apisetDataPaciente] = useState([]);
    const [apifilteredData, apisetFilteredData] = useState([]); 
      
    // ------------- fetch geston cita

    const [apidata, apisetData] = useState([]);
  

    useEffect(() => {
    //     fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes');
    // }, [])
    fetchDataCita(GestionCita_Get);
    }, [])

    const fetchDataCita = (url) => {
        try {
            const newarray = url.filter(x => x.estadoCitas == true);
            apisetData(newarray);
            apisetFilteredData(newarray);
            
    } catch (error) {
      console.error(error);
    }
  };




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
  

// ---------------------------

    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
      );

    return <>
        <View style={{ backgroundColor: "blue", width: "100%", height: "100%" }}>
            {
            <ScrollView style={{ backgroundColor: "#68CCC0", height: "100%" }}> 
                <View style={{ alignItems: "center" }}>
                <AppButton title="Informacion de la cita" style ={styles.appButtonContainer}/>
                <View style={styles.buttonsContainer}>
                
                <View style={{ backgroundColor: "white"}}>
                
                <Text>{apidataDoctores.filter(x => x.doctorId == doctorId).map(y => {return y.nombreDoctor + " " + y.apellidoDoctor})}</Text>
                <Text>{apidataCentros.filter(x => x.key == centroMedicoId).map(y => {return y.value})}</Text>
                <Text>{apidataPaciente.filter(x => x.pacienteId == pacienteId).map(y => {return y.nombrePaciente + " " + y.apellidoPaciente})}</Text>

                </View>
                <View style={{ height: 44, width: 310, marginTop: 15 }}>
                <StyledButtonIcon content="Modificar Cita" bgColor="#0D0C0C" ></StyledButtonIcon>
                </View>
                <View style={{ height: 44, width: 310, marginTop: 15 }}>
                    <StyledButtonIcon content="Cancelar Cita" bgColor="#900707" ></StyledButtonIcon>
                </View>
                
            </View>

                </View>
            </ScrollView>
        }</View>
    </>

    }

export default InfoCitaScreen;

const styles = StyleSheet.create({

    
    buttonsContainer: {
        //backgroundColor: "blue",
        justifyContent: "center",
        width: "100%",
        alignItems: 'center',
        padding: "5%"
    }, 
    container1: {
        flex: 0,
        backgroundColor: '#68CCC0',
        marginTop: StatusBar.currentHeight || 35,
        padding: 25,
        paddingTop: 25,
      }, 
      appButtonContainer: {
        elevation: 8,
        backgroundColor: "black",
        padding: 30,
        borderRadius: 15,
        marginVertical: 70,
        marginHorizontal: 16,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 2,
        shadowRadius: 3,
      },
      appButtonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },

});