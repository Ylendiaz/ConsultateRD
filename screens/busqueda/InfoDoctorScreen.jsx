import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import AppNavigator from '../../navigator/Navigator';


const InfoDoctorScreen = ({ navigation, route }) => {

    const { doctorId, imagenDoctor, loginId, nombreDoctor, apellidoDoctor, telefonoDoctor,
        sexoDoctor, fechaNacimientoDoctor, infoCreditoId, intervaloCitas, centroMedicoDoctor, especialidadesDoctor
        , horariosDoctor } = route.params.item;

    // Mientras la api viene
    const diasapi = [
        { horario_id: 1, dia_id: 1 },
        { horario_id: 3, dia_id: 3 },
        { horario_id: 4, dia_id: 4 },
        { horario_id: 6, dia_id: 6 },
        { horario_id: 7, dia_id: 7 }]

    const dia = [
        { key: 1, dia: "Lunes" },
        { key: 2, dia: "Martes" },
        { key: 3, dia: "Miércoles" },
        { key: 4, dia: "Jueves" },
        { key: 5, dia: "Viernes" },
        { key: 6, dia: "Sábado" },
        { key: 7, dia: "Domingo" }]


    return <>
        <View style={{ backgroundColor: "blue", width: "100%", height: "100%" }}>
            <View style={{ backgroundColor: "#68CCC0", alignItems: 'center' }}>
                {imagenDoctor == null ? <Image style={{ resizeMode: 'cover', height: 150, width: 300, borderWidth: 1, marginVertical: 25, borderRadius: 25 }} source={require("../../assets/avatar.png")}></Image>
                    : <Image style={{ resizeMode: 'cover', height: 150, width: 300, borderWidth: 1, marginVertical: 25, borderRadius: 25 }} source={{ uri: foto }}></Image>}
            </View>
            <ScrollView style={{ backgroundColor: "#509F8C", height: "100%" }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ marginTop: 20, fontSize: 25 }}>{nombreDoctor} {apellidoDoctor}</Text>
                    {especialidadesDoctor.map(data => (
                        <Text key={doctorId} style={{ marginBottom: 5 }}>
                            {data.especialidad.nombreEspecialidad}
                        </Text>
                    ))}
                    {centroMedicoDoctor.map(data => (
                        <Text key={doctorId} style={{ marginBottom: 5 }}>
                            {data.centroMedico.centroMedicoNombre}
                        </Text>
                    ))}
                    <Text style={{ marginTop: 5, fontSize: 18 }}>Teléfono: {telefonoDoctor}</Text>
                    <View style={{ backgroundColor: "#68CCC0", alignItems: 'center', width: "80%", marginVertical: 10, borderRadius: 15 }}>
                        <Text>Disponibilidad</Text>
                        <View style={{ backgroundColor: "#68CCC0", alignItems: 'center', width: "100%", flexDirection: 'row', borderRadius: 15, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {dia.map((item) => {
                                return <>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={[
                                            diasapi.filter(element => element.dia_id == item.key).map(obj => { return obj.dia_id }) == item.key
                                                ? styles.circleDayOn
                                                : styles.circleDayOff]}>
                                            <Text>{item.dia}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            })}
                        </View>
                    </View>

                    <View style={{ height: 50, width: "70%", marginVertical: 50 }}>
                        <StyledButton txtColor="#ffffff" content="Agendar Cita" bgColor="#88CC68" radius="100" onPress={() => navigation.navigate('DisponibilidadDoctor')}></StyledButton>
                    </View>
                </View>
            </ScrollView>
        </View>
    </>

}

export default InfoDoctorScreen;

const styles = StyleSheet.create(
    {
        circleDayOn: {
            backgroundColor: "green",
            padding: 5,
            marginVertical: 10,
            borderRadius: 15,
            marginHorizontal: 10
        },
        circleDayOff: {
            backgroundColor: "red",
            padding: 5,
            marginVertical: 10,
            borderRadius: 15,
            marginHorizontal: 10
        },
    }
)