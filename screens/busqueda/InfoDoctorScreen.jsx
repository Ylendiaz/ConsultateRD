import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import AppNavigator from '../../navigator/Navigator';
import HorariosDoctors from "../../API/HorariosDoctors";


const InfoDoctorScreen = ({ navigation, route }) => {

    //Informacion del doctor que fue seleccionado
    const { doctorId, imagenDoctor, loginId, nombreDoctor, apellidoDoctor, telefonoDoctor,
        sexoDoctor, fechaNacimientoDoctor, infoCreditoId, intervaloCitas, centroMedicoDoctor, especialidadesDoctor
        , horariosDoctor } = route.params.item;

    //-------------Consumir API tabla HorariosDoctors--------------------
    const [apidataHorarios, apisetDataHorarios] = useState([]);

    // useEffect(() => {
    //     fetchDataEspecialidad('https://consultaterd.azurewebsites.net/api/HorariosDoctors');
    // }, [])

    // const fetchDataEspecialidad = async (url) => {
    //     try {
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         //console.log(json);
    //         const newarray = json.filter(item => item.doctorId == doctorId);
    //         apisetDataHorarios(newarray);

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

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

    const dia = [
        { key: 1, dia: "Lunes" },
        { key: 2, dia: "Martes" },
        { key: 3, dia: "Miércoles" },
        { key: 4, dia: "Jueves" },
        { key: 5, dia: "Viernes" },
        { key: 6, dia: "Sábado" },
        { key: 7, dia: "Domingo" }]


    return <>
        <ScrollView style={{ backgroundColor: "#509F8C", width: "100%", height: "100%" }}>
            <View style={{ backgroundColor: "#68CCC0", alignItems: 'center' }}>
                {imagenDoctor == null ? <Image style={styles.foto} source={require("../../assets/avatar.png")}></Image>
                    : <Image style={styles.foto} source={{ uri: foto }}></Image>}
            </View>
            <View style={{ backgroundColor: "#509F8C", height: "100%" }}>
                <View style={{ alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ marginTop: 20, fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>
                        {nombreDoctor} {apellidoDoctor}
                    </Text>
                    <View style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: "black", width: 150 }}></View>
                    {especialidadesDoctor.map(data => (
                        <Text key={data.doctorId} style={{ marginTop: 5, fontSize: 16, marginBottom: 10, }}>
                            {data.especialidad.nombreEspecialidad}
                        </Text>
                    ))}
                    {centroMedicoDoctor.map(data => (
                        <Text key={data.doctorId} style={{ fontSize: 16, marginBottom: 10, }}>
                            {data.centroMedico.centroMedicoNombre}
                        </Text>
                    ))}
                    <Text style={{ marginTop: 5, fontSize: 16, marginBottom: 15, }}>Teléfono: {telefonoDoctor}</Text>
                    <View style={{ backgroundColor: "#68CCC0", alignItems: 'center', width: "80%", marginVertical: 10, borderRadius: 50, borderWidth: 1, borderColor: "black", }}>
                        <Text style={{ marginTop: 5, fontSize: 14, marginBottom: 5, }}>Disponibilidad</Text>
                        <View style={{ backgroundColor: "#68CCC0", alignItems: 'center', width: "100%", flexDirection: 'row', borderRadius: 80, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 15, }}>
                            {dia.map((item) => {
                                return <>
                                    <View key={item.key} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={[
                                            apidataHorarios.filter(element => element.diaId == item.key).map(obj => { return obj.diaId }) == item.key
                                                ? styles.circleDayOn
                                                : styles.circleDayOff]}>
                                            <Text style={{ marginVertical: 5, marginHorizontal: 5, fontSize: 13, fontStyle: 'italic' }}>{item.dia}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            })}
                        </View>
                    </View>

                    <View style={{ height: 50, width: "70%", marginVertical: 20 }}>
                        <StyledButton txtColor="#ffffff" content="Agendar Cita" bgColor="#88CC68" radius="100" onPress={() => navigation.navigate('DisponibilidadDoctor', { doctorId, intervaloCitas })}></StyledButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    </>

}

export default InfoDoctorScreen;

const styles = StyleSheet.create(
    {
        circleDayOn: {
            backgroundColor: "#42855B",
            padding: 5,
            marginVertical: 5,
            borderRadius: 15,
            marginHorizontal: 5
        },
        circleDayOff: {
            backgroundColor: "#E64848",
            padding: 5,
            marginVertical: 5,
            borderRadius: 15,
            marginHorizontal: 5
        },
        foto: {
            resizeMode: 'cover',
            height: 180,
            width: 300,
            borderWidth: 1,
            marginVertical: 25,
            borderRadius: 25,
            borderBottomWidth: 1,
            borderColor: "black",
        }
    }
)