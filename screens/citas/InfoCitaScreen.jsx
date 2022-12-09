import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import StyledButtonIcon from "../../components/StyledButtonIcon";
import AppNavigator from '../../navigator/Navigator';
import CitasAgendadas from "../../components/CitasAgendadas";

const InfoCitaScreen = ({ navigation }) => {

    // const { citaId, citaFecha, citasHoraInicio, citaHoraCierre, centroMedicoId, pacienteId, doctorId, estadoCitas, fechaCreacionCita, fechaModificacionCita } = route.params.item;

// --------------------------

const [apidataPaciente, apisetDataPaciente] = useState([]);
    const login = [{ loginId: 7, rol: true }];
    
    
    
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
            <ScrollView style={{ backgroundColor: "#509F8C", height: "100%" }}> 
                <View style={{ alignItems: "center" }}>
                <AppButton title="Informacion de la cita" style ={styles.appButtonContainer}/>
                <View style={styles.buttonsContainer}>
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