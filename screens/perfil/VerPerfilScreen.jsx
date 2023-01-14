import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Button, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from "moment";

const VerPerfilScreen = ({ navigation, route }) => {

    let { loginId, correoElectronico, rol, } = route.params.userData;

    // ----------------Consumir API tabla Usuario Pacientes-----------------
    const [apidataPaciente, apisetDataPaciente] = useState({});
    const [birthFormat, setbirthFormat] = useState("");

    useEffect(() => {
        //call fetchData passing the GET request url
        fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes');//pacient users
    }, []);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const pacientInfo = json.find(x => x.loginId == loginId)
            let convert = moment(pacientInfo.fechaNacimientoPaciente).format("DD-MM-YYYY")
            apisetDataPaciente(pacientInfo);
            setbirthFormat(convert)

        } catch (error) {
            console.error(error)
        }
    };



    return <>
        <ScrollView style={{ backgroundColor: "#509F8C", height: "100%" }} >
            <View style={styles.viewTopPerfil}>
                <Image style={styles.viewFoto} source={require("../../assets/avatar.png")}></Image>
                <TouchableOpacity>
                    <Text style={{ marginTop: 10 }}>Editar foto de perfil</Text>
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView style={{ width: '100%' }}>
                <View style={styles.inputsContainer}>
                    <Text style={{ width: "80%", flexDirection: 'row', fontSize: 16, fontWeight: 'bold' }}>Nombre: </Text>
                    <TextInput placeholderTextColor={'black'} placeholder={apidataPaciente.nombrePaciente} label="Nombres" style={styles.input} ></TextInput>
                    <Text style={{ width: "80%", flexDirection: 'row', fontSize: 16, fontWeight: 'bold' }}>Apellidos: </Text>
                    <TextInput placeholderTextColor={'black'} placeholder={apidataPaciente.apellidoPaciente} label="Apellidos" style={styles.input} ></TextInput>
                    <Text style={{ width: "80%", flexDirection: 'row', fontSize: 16, fontWeight: 'bold' }}>Email: </Text>
                    <TextInput placeholderTextColor={'black'} placeholder={correoElectronico} label="Email" keyboardType="email-address" style={styles.input} ></TextInput>
                    <Text style={{ width: "80%", flexDirection: 'row', fontSize: 16, fontWeight: 'bold' }}>Teléfono: </Text>
                    <TextInput placeholderTextColor={'black'} placeholder={apidataPaciente.telefonoPaciente} label="Teléfono" keyboardType="numeric" style={styles.input} ></TextInput>
                    <Text style={{ width: "80%", flexDirection: 'row', fontSize: 16, fontWeight: 'bold' }}>Fecha de nacimiento: </Text>
                    <TextInput placeholderTextColor={'black'} placeholder={birthFormat} label="FechaNacimiento" style={styles.input} ></TextInput>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    </>

}

export default VerPerfilScreen;

const styles = StyleSheet.create({

    viewTopPerfil: {
        alignItems: 'center',
        backgroundColor: "#65D1B7",
        height: 300,
        borderBottomWidth: 1,
        borderColor: '#7E8C8A',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.84,
        elevation: 9,
    },
    textPerfil: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 70
    },
    textCitas: {
        borderRadius: 10,
        marginTop: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#232020",
        width: "65%",
    },
    viewFoto: {
        resizeMode: 'cover',
        marginTop: 55,
        height: 175,
        width: 175,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'black',
    },
    textInfo: {
        width: "80%",
        alignItems: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(10, 9, 9, 0.17)',
    },
    buttonsContainer: {
        //backgroundColor: "blue",
        justifyContent: "center",
        width: "100%",
        alignItems: 'center',
        padding: "5%"
    },
    inputsContainer: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    input: {
        textColor: "black",
        width: "80%",
        height: 50,
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: "#364956",
        marginBottom: 10
    },
});