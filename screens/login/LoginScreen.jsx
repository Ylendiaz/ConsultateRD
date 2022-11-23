import React, { Component, useState } from "react";
import { Image, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import Cookies from "universal-cookie";
import AppNavigator from "../../navigator/Navigator"; //page stack

// API
import LoginTbls_GetLoginTblsContent from "../../API/LoginTbls_GetLoginTblsContent";






const LoginScreen = ({ navigation }) => {


    const [username, setName] = useState(''); //get the input (username) of user
    const [password, setPass] = useState(''); //get the input (password) of user

    console.log(username, password)


    //(passing a username and password to compare)
    // const getLoginInfo = (user, pass) => {
    //     return LoginTbls_GetLoginTblsContent.find(data => data.correoElectronico == user && data.usuarioContraseña == pass)
    // };

    const url = 'https://consultaterd.azurewebsites.net/api/LoginTbls/' + `${username}/${password}`;


    // when you click the login button
    const iniciarSesion = async () => {

        await fetch(url)
            .then(response => {
                // const data = response.json();
                console.log(response);
                return response;
            })
            .then(response => {
                if (response.length < 1) {
                    alert('contraseña o usuario incorrecto, intentelo denuevo');
                }
                else {
                    alert('Bienvenido');
                    console.log(response);
                    navigation.navigate("HomeTab", response);
                }
            })


    }

    return <>


        <View style={styles.container}>

            <Image style={styles.logo} source={require('../../assets/Consultate-RD-logo.png')} />

            <Text style={styles.textlogo}>Consultate RD</Text>

            <View style={styles.loginBox}>
                <View style={styles.inputsContainer}>
                    <TextInput name="username" placeholdertextcolor={'gray'} placeholder="Correo" style={styles.input} onChangeText={(val1) => setName(val1)}></TextInput>
                    <TextInput type="password" placeholdertextcolor={'gray'} placeholder="Contraseña" name="password" style={styles.input} onChangeText={(val2) => setPass(val2)}></TextInput>
                </View>

                <View style={styles.buttonsContainer}>

                    <View style={{ height: 50, width: "100%" }}>
                        <StyledButton txtColor="#ffffff" content="Log in" bgColor="#68CCC0" radius="100" onPress={() => iniciarSesion()}></StyledButton>
                    </View>

                    <View style={{ height: 50, width: "100%", marginTop: 15 }}>
                        <StyledButton txtColor="#ffffff" content="Registrarse" bgColor="#68CCC0" radius="100" onPress={() => navigation.navigate('Registrarse')}></StyledButton>
                        {/* <StyledButton txtColor="#ffffff" content = "Registrarse" bgColor="#68CCC0" onPress={() => navigation.navigate('Registrarse')}></StyledButton> */}
                    </View>

                </View>

            </View>
        </View>

    </>


}

export default LoginScreen;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: "#68CCC0",
            width: '100%',
            height: '100%',
            paddingTop: '12%',
        },

        logo: {
            width: 300,
            height: 200,
            marginTop: 30
        },

        textlogo: {
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 15
        },

        loginBox: {
            justifyContent: "center",
            alignItems: 'center',
            gap: 50,
            width: "80%",
            height: "50%",
            borderRadius: 25,
            backgroundColor: "white",
            padding: '5%',
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 2,
            shadowRadius: 3,
            marginTop: 20,
            marginBottom: 20

        },

        inputsContainer: {
            justifyContent: "center",
            width: "100%",
            height: "50%",
            alignItems: 'center'

        },
        buttonsContainer: {
            justifyContent: "center",
            width: "100%",
            height: "50%",
            alignItems: 'center',
            padding: "5%"
        },

        input: {
            textColor: "gray",
            width: "90%",
            height: 50,
            backgroundColor: "#e6e6fa",
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            padding: 15,
            shadowColor: '#171717',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 2,
            marginTop: 15,
            borderColor: '#fff'


        },
    });

