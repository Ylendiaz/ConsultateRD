import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Image, ScrollView } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import AppNavigator from '../../navigator/Navigator';


// const [apidata, apisetData] = useState([]);
//     const [apifilteredData, apisetFilteredData] = useState([]);

//     useEffect(() => {
//         fetchData('https://consultaterd.azurewebsites.net/api/GestionCita_Get');
//     }, [])

//     const fetchData = async (url) => {
//         try {
//             const response = await fetch(url);
//             const json = await response.json();
//             apisetData(json);
//             apisetFilteredData(json);
//              console.log(json);

//         } catch (error) {
//             console.error(error);
//         }
//     };



const InfoCitaScreen = ({ navigation, route }) => {

    const { citaId, citaFecha, citasHoraInicio, citaHoraCierre, centroMedicoId, pacienteId, doctorId, estadoCitas, fechaCreacionCita, fechaModificacionCita } = route.params.item;


    return <>
        <View style={{ backgroundColor: "blue", width: "100%", height: "100%" }}>
            {
            <ScrollView style={{ backgroundColor: "#509F8C", height: "100%" }}> 
                <View style={{ alignItems: "center" }}>
                    <Text style={{ marginTop: 20, fontSize: 25 }}></Text>
                    
            
                    <Text style={{ marginTop: 20, fontSize: 18 }}>{telefonoDoctor}</Text>
                    <View style={{ height: 50, width: "70%", marginVertical: 50 }}>
                        <StyledButton txtColor="#ffffff" content="Agendar Cita" bgColor="#88CC68" radius="100" onPress={() => navigation.navigate('DisponibilidadDoctor')}></StyledButton>
                    </View>
                </View>
            </ScrollView>
        }</View>
    </>

    }

export default InfoCitaScreen;