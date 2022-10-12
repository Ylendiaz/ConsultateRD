import React, { Component, useState } from "react";
import { Image, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
// import axios from "axios";
// import md5 from 'md5';
import AppNavigator from "../../navigator/Navigator"; //page stack

// API
import LoginTbls_GetLoginTblsContent from "../../API/LoginTbls_GetLoginTblsContent";
import { ListItem } from "@rneui/base";





const LoginScreen = ({ navigation }) => {

    

    const [username, setName] = useState(''); //get the input (username) of user
    const [password, setPass] = useState(''); //get the input (password) of user


    //this returns the object of all the user information if its found in DB (passing a username and password to compare)
    const getLoginInfo = (user, pass) => {
        return LoginTbls_GetLoginTblsContent.find(data => data.correoElectronico == user && data.usuarioContraseña == pass)
    };

    //here we save the data of the user that was verified
    const usuarioBuscado = getLoginInfo(username, password);
    // handleClick = () => {
    // when you click the login button
    const handleClick = () => {
        //instancia de cookies
        const cookies = new Cookies();

        //if the user was not found in db or it had the wrong password or username alert -> try again
        if (usuarioBuscado == undefined) {
            alert('Incorrent username or password, try again');

        } //if it found data with those credencials let them in
        else {

            console.log(usuarioBuscado);
           

            // cookies.set('correo', usuarioBuscado.correoElectronico, { path: '/' });
            // cookies.set('estadoLogin', usuarioBuscado.estadoLogin, { path: '/' });
            // cookies.set('loginId', usuarioBuscado.loginId, { path: '/' });
            // cookies.set('rol', usuarioBuscado.rol, { path: '/' });
            // cookies.set('usuarioContraseña', usuarioBuscado.usuarioContraseña, { path: '/' });

            // console.log(cookies.get('rol') +" - "+ typeof(cookies.get('rol')));
            alert('Bienvenido');

            navigation.setParams({
                user: usuarioBuscado,
              });
            
            // <AppNavigator></AppNavigator>
            navigation.navigate('HomeTab',usuarioBuscado);

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
                {/* onChange={handleChange} */}
                <View style={styles.buttonsContainer}>

                    <View style={{ height: 50, width: "100%" }}>
                        <StyledButton txtColor="#ffffff" content="Log in" bgColor="#68CCC0" radius="100" onPress={() => handleClick()}></StyledButton>
                    </View>

                    <View style={{ height: 50, width: "100%", marginTop: 15 }}>
                        <StyledButton txtColor="#ffffff" content="Registrarse" bgColor="#68CCC0" radius="100" onPress={() => navigation.navigate('Registrarse')}></StyledButton>
                        {/* <StyledButton txtColor="#ffffff" content = "Registrarse" bgColor="#68CCC0" onPress={() => navigation.navigate('Registrarse')}></StyledButton> */}
                    </View>

                </View>

            </View>
        </View>

    </>


    // const baseUrl="https://localhost:7000/api/LoginTbls";
    // const cookies = new Cookies();

    // const [form,setForm]= useState({
    //     username:'',
    //     password:'',
    // });

    // const handleChange=(event) => {
    //     const {name, value} = event.target;
    //     setForm((prevState) =>{
    //         return{
    //             ...prevState,
    //             [name]:value,
    //         };
    //     });

    // }

    // console.log(form);

    // const iniciarSesion=async()=>{
    //     await axios.get(baseUrl+`/${form.username}/${form.password}`)
    //     .then(response=>{
    //         return response.data;
    //     }).then(response=>{
    //         if(response.length >0){
    //             var respuesta = response[0];
    //             cookies.set('loginId',respuesta.loginId, {path:'/'});
    //             cookies.set('rol',respuesta.rol, {path:'/'});
    //             cookies.set('correoElectronico',respuesta.correoElectronico, {path:'/'});
    //             cookies.set('usuarioContraseña',respuesta.usuarioContraseña, {path:'/'});
    //             cookies.set('estadoLogin',respuesta.estadoLogin, {path:'/'});
    //             cookies.set('usuarioDoctor',respuesta.usuarioDoctor, {path:'/'});

    //             navigation.navigate('HomeTab');

    //         }
    //         else{
    //             alert('El usuario o la contraseña no son correctos');
    //         }
    //     })

    //     .catch(error=>{
    //         console.log(error);
    //     })
    // }


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

