import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Image, ScrollView } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import AppNavigator from '../../navigator/Navigator';

// API
import CentroMedico from "../../API/CentroMedico";
import Especialidades from "../../API/Especialidades";


const InfoDoctorScreen = ({ navigation, route }) => {

    const { doctorId, imagenDoctor, loginId, nombreDoctor, apellidoDoctor, telefonoDoctor,
        sexoDoctor, fechaNacimientoDoctor, infoCreditoId, intervaloCitas, centroMedicoDoctor, especialidadesDoctor
        , horariosDoctor } = route.params.item;


    const [dataCentro, setDataCentro] = useState([]);
    const cm = CentroMedico;
    useEffect(() => {
        setDataCentro(cm);
    }, [])
    // 
    const [dataEspecialidad, setDataEspecialidad] = useState([]);
    const es = Especialidades;
    useEffect(() => {
        setDataEspecialidad(es);
    }, [])


    return <>
        <View style={{ backgroundColor: "blue", width: "100%", height: "100%" }}>
            <View style={{ backgroundColor: "#68CCC0", alignItems: 'center' }}>
                {/* {imagenDoctor !== null ? : source={require("../../assets/avatar.png")}} */}
                <Image style={{ resizeMode: 'cover', height: 150, width: 300, borderWidth: 1, marginVertical: 25, borderRadius: 25 }}
                    source={require("../../assets/avatar.png")}></Image>
            </View>
            <ScrollView style={{ backgroundColor: "#509F8C", height: "100%" }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{marginTop:20 , fontSize:25}}>{nombreDoctor} {apellidoDoctor}</Text>
                    {/* <Text style={{marginTop:20 , fontSize:18}}>{dataEspecialidad.find(x => x.especialidadId == especialidadesDoctor[0].especialidadId).nombreEspecialidad}</Text> */}
                    {/* <Text style={{marginTop:20 , fontSize:18}}>{dataCentro.find(x => x.centroMedicoId == centroMedicoDoctor[0].centroMedicoId).centroMedicoNombre}</Text> */}
                    <Text style={{marginTop:20 , fontSize:18}}>{telefonoDoctor}</Text>
                    <View style={{height:50, width:"70%",marginVertical:50}}>
                        <StyledButton txtColor="#ffffff" content = "Agendar Cita" bgColor="#88CC68" radius = "100" onPress={() => navigation.navigate('DisponibilidadDoctor')}></StyledButton>
                    </View>
                </View>
            </ScrollView>
        </View>

    </>


}

export default InfoDoctorScreen;