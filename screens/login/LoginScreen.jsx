import React, { Component, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import Cookies from "universal-cookie";
import AppNavigator from "../../navigator/Navigator"; //page stack

// API
import LoginTbls_GetLoginTblsContent from "../../API/LoginTbls_GetLoginTblsContent";






const LoginScreen = ({ navigation }) => {


    const [username, setName] = useState(''); //get the input (username) of user
    const [password, setPass] = useState(''); //get the input (password) of user


    const url = 'https://consultaterd.azurewebsites.net/api/LoginTbls/' + `${username}/${password}`;
    // const url = 'https://localhost:7000/api/LoginTbls/' + `${username}/${password}`;



    // when you click the login button
    const iniciarSesion = async () => {

        try{ //if the user was found

            const response = await fetch(url); //fetch the request response from the server
            const json = await response.json(); //create a json file of that response (the data)
            const userInfo= await json[0]; // save in a variable the the info of this specific user

            // console.log(userInfo);

            if(username == "" || password ==""){ //if username is not missing but the password is and the other way around
                alert('Ingrese correo y contraseña');
            }
            else if (response.status == 404) { //if the request to the server failed and there was no response (404)

                alert('Ocurrio un error al tratar de comunicarse con el servidor');
            }
            else if (userInfo != null) { //if there was a user found

                // console.log(userInfo);
                alert('Bienvenido');//welcome
                navigation.navigate("HomeTab", userInfo);// go to home screen and pass the user's info as parameter
                
            }
            else{ //username or password are incorrect (was not found on database)
                alert('contraseña o usuario incorrecto, intentelo denuevo');
            }


        }catch{//if username and password is missing
            alert('Ingrese correo y contraseña');
        }


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

