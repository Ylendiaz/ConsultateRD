import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, Modal,Dimensions } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import StyledButtonIcon from "../../components/StyledButtonIcon";
import AppNavigator from '../../navigator/Navigator';
import InfoCita from "../../components/InfoCita";

import {MaterialCommunityIcons} from '@expo/vector-icons';

const InfoCitaScreen = ({navigation, route }) => {

    //sets if the modal popup is open or closed 

    //all of them are false by default (closed)
    const [modificarModalOpen, setmodificarModalOpen] = useState(false); //popup de confirmacion para modificar
    const [citaModificadaModalOpen, setCitaModificadaModalOpen] = useState(false);//cita modificada
    const [cancelarModalOpen, setCancelarModalOpen] = useState(false); // confirmacion para cancelar cita
    const [citaCanceladaModalOpen, setCitaCanceladaModalOpen] = useState(false); //cita cancelada
    function cancelarCita(){
        setCitaCanceladaModalOpen(true);
        setCancelarModalOpen(false);
    }
    //when the appointment have been caceled
    function citaCancelada(){
        setCitaCanceladaModalOpen(false);// hide de popup 
        navigation.navigate('Home');//and go to the home screen
    }

    function modificarCita(){
        setCitaModificadaModalOpen(true);
        setmodificarModalOpen(false);
    }
    //when the appointment have been modifed
    function citaModificada(){
        setCitaModificadaModalOpen(false);// hide de popup 
        navigation.navigate('Home');//and go to the home screen
    }
    
    //Informacion de la cita que fue seleccionado
    const { citaId, citaFecha, citasHoraInicio, citaHoraCierre, centroMedicoId, pacienteId, doctorId, estadoCitas, fechaCreacionCita, fechaModificacionCita } = route.params.item.item;
    
    // console.log(route.params.item.item);
 
    const [apidataPaciente, apisetDataPaciente] = useState([]);
    const [apifilteredData, apisetFilteredData] = useState([]); 
    const [userData, setUserData] = React.useState([]);
      
    // ------------- fetch geston cita

    const [apidata, apisetData] = useState([]);
  

    useEffect(() => {
        fetchDataCita('https://consultaterd.azurewebsites.net/api/CitasAgendadas');
    }, [])
   

    const fetchDataCita = async(url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            apisetData(json);
            apisetFilteredData(json);
            
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
                <Text style = {{marginBottom: 6, fontWeight: "bold"}}>Centro Medico:</Text>
                <Text style = {{marginBottom: 6}}>{apidataCentros.filter(x => x.key == centroMedicoId).map(y => {return y.value})}</Text>
                </View>

                <View style ={{ borderBottomWidth: 1, marginBottom: 15, borderColor:'rgba(0, 0, 0, 0.21)' }}>
                <Text style={{marginBottom:6, fontWeight: "bold"}}>Nombre del paciente:</Text>
                <Text style={{ marginBottom: 6}}>{apidataPaciente.filter(x => x.pacienteId == pacienteId).map(y => {return y.nombrePaciente + " " + y.apellidoPaciente})}</Text>
                </View>

                
                {userData.rol = true
                    ?<View style ={{ borderBottomWidth: 1, marginBottom: 15, borderColor:'rgba(0, 0, 0, 0.21)' }}>
                        <Text style={{marginBottom:6, fontWeight: "bold"}}>Número de teléfono del paciente:</Text>
                        <Text style={{ marginBottom: 6}}>{apidataPaciente.filter(x => x.pacienteId == pacienteId).map(y => {return y.telefonoPaciente})}</Text>
                    </View>
                    :<View style ={{ borderBottomWidth: 1, marginBottom: 15, borderColor:'rgba(0, 0, 0, 0.21)' }}>
                        <Text style={{marginBottom:6, fontWeight: "bold"}}>Número de teléfono del doctor:</Text>
                        <Text style={{ marginBottom: 6}}> {apidataDoctores.filter(x => x.doctorId == doctorId).map(y => {return y.telefonoDoctor})}</Text>
                    </View>}
    
    
    
                </View>
                <View style={styles.textCitas}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 15, marginVertical: 20, }}>Información de la cita</Text>
                </View>
                
                    
                <View style={{ height: 44, width: 310, marginTop: 390, alignSelf: 'center' }}>
                <StyledButtonIcon content="Modificar Cita" bgColor="#0D0C0C" onPress={()=>setmodificarModalOpen(true)}></StyledButtonIcon>
                </View>
                <View style={{ height: 44, width: 310, marginTop: 20, alignSelf: 'center' }}>
                    <StyledButtonIcon content="Cancelar Cita" bgColor="#900707" onPress={()=>setCancelarModalOpen(true)} ></StyledButtonIcon>
                </View>
  

            </ScrollView>
        

        {/* Popup confirmacion de modificar cita */}
        <Modal 
        visible={modificarModalOpen}
        animationType='fade'
        transparent={true}>

            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <MaterialCommunityIcons 
                    name='close'
                    style={styles.modalClose}
                    size={24}
                    visible = {true}
                    onPress={()=>setmodificarModalOpen(false)}
                    />

                    <View style= {{alignItems:'center'}}>
                        <Text style={{textAlign:'center', padding:20,fontSize:18, fontWeight:'bold'}}>¿Seguro que deseas modificar la cita?</Text>

                        <TouchableOpacity
                        style={[styles.modalButton, {backgroundColor:'#000000'}]}
                        onPress={()=>modificarCita()}
                        >
                            <Text style = {{color:'#fff', fontSize:15}}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
                
        </Modal>
        {/* Final del Popup */}

        
        {/* Popup de cita modificada */}
        
        <Modal 
        visible={citaModificadaModalOpen}
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

                    <View style= {{alignItems:'center'}}>
                        <Text style=
                        {{textAlign:'center', 
                        padding:20,
                        fontSize:18,
                        fontWeight:'bold'}}
                        >Se ha modificado la cita satisfactoriamente</Text>

                        <TouchableOpacity
                        style={[styles.modalButton, {backgroundColor:'#88CC68'}]}
                        onPress={()=>citaModificada()}
                        >
                            <Text style = {{color:'#fff', fontSize:15}}>Continuar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
                
        </Modal>

        {/* Final del Popup */}

        {/* Popup confirmacion de cancelar cita */}
        <Modal 
        visible={cancelarModalOpen}
        animationType='fade'
        transparent={true}>

            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <MaterialCommunityIcons 
                    name='close'
                    style={styles.modalClose}
                    size={24}
                    visible = {true}
                    onPress={()=>setCancelarModalOpen(false)}
                    />

                    <View style= {{alignItems:'center'}}>
                        <Text style={{textAlign:'center', padding:20,fontSize:18, fontWeight:'bold'}}>¿Seguro que deseas cancelar la cita?</Text>

                        <TouchableOpacity
                        style={[styles.modalButton, {backgroundColor:'#900707'}]}
                        onPress={()=>cancelarCita()}
                        >
                            <Text style = {{color:'#fff', fontSize:15}}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
                
        </Modal>
        {/* Final del Popup */}

        
        {/* Popup de cita cancelada */}
        <Modal 
        visible={citaCanceladaModalOpen}
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

                    <View style= {{alignItems:'center'}}>
                        <Text style=
                        {{textAlign:'center', 
                        padding:20,
                        fontSize:18,
                        fontWeight:'bold'}}
                        >La cita ha sido cancelada</Text>

                        <TouchableOpacity
                        style={[styles.modalButton, {backgroundColor:'#88CC68'}]}
                        onPress={()=>citaCancelada()}
                        >
                            <Text style = {{color:'#fff', fontSize:15}}>Continuar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
                
        </Modal>
        {/* Final del Popup */}
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
        }},


      //modal styles
      modalBackground:{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:'rgba(0,0,0,0.30)',
          
      },
      modalView: {
          width:Dimensions.get('window').width/1.5,
          height:Dimensions.get('window').width/1.5,
          // width:'80%',
          // height:'40%',
      
          backgroundColor: "white",
      
          borderRadius: 20,
          paddingHorizontal:20,
          paddingVertical:35,
      
          shadowColor: "#121212",
          shadowOffset: {
              width: 0,
              height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
      },
      modalButton: {
          marginTop:10,
          borderRadius: 20,
          padding: 10,
          paddingHorizontal:50,
          color:'#fff',
      },

});