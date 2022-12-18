import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Button, Text, View, Image, ScrollView } from 'react-native';
import AppNavigator from '../../navigator/Navigator';
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import StyledButtonIcon from "../../components/StyledButtonIcon";

// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PerfilScreen = (navigation) => {

    const [userData, setUserData] = React.useState([]);
    const getData = async (keyname) => {
        try {
            const value = await AsyncStorage.getItem(keyname)
            if (value !== null) {
                // value previously stored
                setUserData(JSON.parse(value));
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData('@userData');
    }, [])


    // ----------------Consumir API tabla Usuario Pacientes-----------------
    const [apidataPaciente, apisetDataPaciente] = useState({});
    useEffect(() => {
        fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes')
    }, [])

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const newarray = json.find(x => x.loginId == userData.loginId)
            apisetDataPaciente(newarray);

        } catch (error) {
            console.error(error)
        }
    };



    return <>
        <ScrollView style={{ backgroundColor: "#509F8C", height: "100%" }} >
            <View style={styles.viewTopPerfil}>
                <Text style={styles.textPerfil}>Perfil</Text>
                <Image style={styles.viewFoto} source={require("../../assets/avatar.png")}></Image>
                {/* {item.imagenDoctor == null ? <Image style={styles.viewFoto} source={require("../../assets/avatar.png")}></Image>
                        : <Image style={styles.viewFoto} source={{ uri: foto }}></Image>} */}
            </View>
            <View style={{ alignItems: 'center', marginTop: 110, }}>
                <View style={styles.textInfo}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, marginTop: 10, }}>Nombre Apellido</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 10, marginBottom: 15 }}>{userData.correoElectronico}</Text>
                </View>
            </View>
            {userData.rol == true ?
                <View style={styles.buttonsContainer}>
                    <View style={{ height: 44, width: 310, marginTop: 15 }}>
                        <StyledButtonIcon content="Ver Perfil" bgColor="#0D0C0C" ></StyledButtonIcon>
                    </View>
                    <View style={{ height: 44, width: 310, marginTop: 15 }}>
                        <StyledButtonIcon content="Información de la cuenta" bgColor="#0D0C0C" ></StyledButtonIcon>
                    </View>
                    <View style={{ height: 44, width: 310, marginTop: 15 }}>
                        <StyledButtonIcon content="Versión Web" bgColor="#0D0C0C" ></StyledButtonIcon>
                    </View>
                    <View style={{ height: 44, width: 310, marginTop: 15 }}>
                        <StyledButtonIcon content="Cerrar Sesión" bgColor="#900707" ></StyledButtonIcon>
                    </View>
                </View>
                : <View style={styles.buttonsContainer}>

                    <View style={{ height: 44, width: 310, marginTop: 15 }}>
                        <StyledButtonIcon content="Ver Perfil" bgColor="#0D0C0C" ></StyledButtonIcon>
                    </View>
                    <View style={{ height: 44, width: 310, marginTop: 15 }}>
                        <StyledButtonIcon content="Cerrar Sesión" bgColor="#900707" ></StyledButtonIcon>
                    </View>

                </View>}


        </ScrollView>
    </>

}

export default PerfilScreen;

const styles = StyleSheet.create({

    viewTopPerfil: {
        alignItems: 'center',
        backgroundColor: "#65D1B7",
        height: 250,
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
        marginTop: 50,
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

});