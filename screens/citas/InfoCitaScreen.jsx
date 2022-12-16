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
    const [userData, setUserData] = React.useState([]);
      
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
        
            
            <ScrollView style={{ backgroundColor: "#68CCC0", height: "100%", width: '100%' }}> 
                <View style={ styles.container1}>
                
                <View style ={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: "space-around", marginBottom: 10}}>
                <Text style={{ color: "black", marginBottom: 10,  fontWeight: "bold"}} >{citasHoraInicio} - {citaHoraCierre}</Text>
                <Text style={{ color: "black", marginBottom: 10,  fontWeight: "bold"}} >{citaFecha}</Text>
                </View>

                <View style ={{ borderBottomWidth: 1, marginBottom: 15, borderColor:'rgba(0, 0, 0, 0.21)' }}>
                <Text style={{ marginBottom: 6, fontWeight: "bold"}}>Nombre del doctor:</Text>
                <Text style={{ marginBottom: 6}}>{apidataDoctores.filter(x => x.doctorId == doctorId).map(y => {return y.nombreDoctor + " " + y.apellidoDoctor})}</Text>
                </View>

                <View style ={{ borderBottomWidth: 1, marginBottom: 15, borderColor:'rgba(0, 0, 0, 0.21)' }}>
                <Text style={{marginBottom:6, fontWeight: "bold"}}>Nombre del paciente:</Text>
                <Text style={{ marginBottom: 6}}>{apidataPaciente.filter(x => x.pacienteId == pacienteId).map(y => {return y.nombrePaciente + " " + y.apellidoPaciente})}</Text>
                </View>

                <View style ={{ borderBottomWidth: 1, marginBottom: 15, borderColor:'rgba(0, 0, 0, 0.21)' }}>
                <Text style = {{marginBottom: 6, fontWeight: "bold"}}>Centro Medico:</Text>
                <Text style = {{marginBottom: 6}}>{apidataCentros.filter(x => x.key == centroMedicoId).map(y => {return y.value})}</Text>
                </View>

                <View style ={{ borderBottomWidth: 1, marginBottom: 15, borderColor:'rgba(0, 0, 0, 0.21)' }}>
                <Text style={{marginBottom:6, fontWeight: "bold"}}>Número de teléfono del paciente:</Text>
                <Text style={{ marginBottom: 6}}>{apidataPaciente.filter(x => x.pacienteId == pacienteId).map(y => {return y.telefonoPaciente})}</Text>
                </View>

                </View>

                <View style={styles.textCitas}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 20, }}>Información de la cita</Text>
                </View>
                
                    
                <View style={{ height: 44, width: 310, marginTop: 390, alignSelf: 'center' }}>
                <StyledButtonIcon content="Modificar Cita" bgColor="#0D0C0C" ></StyledButtonIcon>
                </View>
                <View style={{ height: 44, width: 310, marginTop: 20, alignSelf: 'center' }}>
                    <StyledButtonIcon content="Cancelar Cita" bgColor="#900707" ></StyledButtonIcon>
                </View>
  

            </ScrollView>
        
    </>

    }

export default InfoCitaScreen;

const styles = StyleSheet.create({
    listView: {
        marginHorizontal: 5,
        marginTop: 5,
        backgroundColor: "white",
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 2,
    },
    
    listViewContent: {
        
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 15
    },
    
    buttonsContainer: {
        //backgroundColor: "blue",
        justifyContent: "center",
        width: "100%",
        alignItems: 'center',
        padding: "5%"
    }, 
    container1: {
        
        backgroundColor: 'white',
        // marginTop: StatusBar.currentHeight || 35,
        padding: 30,
        borderRadius: 15,
        marginTop: 60,
        // marginLeft: 40 ,
        // marginRight: 40,
        paddingTop: 60,
        width: '80%', 
        alignSelf: 'center'
        
        
      }, 
      appButtonContainer: {
        // position: 'absolute',
        // elevation: 80,
        backgroundColor: "black",
        padding: 20,
        borderRadius: 15,
        // marginVertical: 20,
        marginBottom: 300,
        marginTop: -430,
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
      textCitas: {
        borderRadius: 10,
        marginTop: -420,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#232020",
        width: "65%",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        }}

});