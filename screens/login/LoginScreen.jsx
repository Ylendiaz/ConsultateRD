import React, { Component } from "react";
import {Image,TextInput, ImageBackground, StyleSheet, Button, Text, View } from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';


const LoginScreen=({navigation}) =>{
    return<>

        <View style={styles.container}>

            <Image style = {styles.logo} source={require('../../assets/Consultate-RD-logo.png')} />

            <View style={styles.loginBox}>

                <View style= {styles.inputsContainer}>
                    <TextInput placeholderTextColor={'gray'} placeholder="Email" label = "Email" style={styles.input} ></TextInput>
                    <TextInput placeholderTextColor={'gray'} placeholder="Contraseña" label = "Password" secureTextEntry={true} style={styles.input} ></TextInput>
                </View>
                
                <View style= {styles.buttonsContainer}>

                    <View style={{height:50, width:"100%"}}>
                        <StyledButton txtColor="#ffffff" content = "Log in" bgColor="#68CCC0" onPress={() => navigation.navigate('HomeTab')}></StyledButton>
                    </View>

                    <View style={{height:50, width:"100%",marginTop:15}}>
                        <StyledButton txtColor="#ffffff" content = "Registrarse" bgColor="#68CCC0" onPress={() => navigation.navigate('Registrarse')}></StyledButton>
                    </View>
                    
                </View>
                
             </View>
       </View>
        
    </>
}

export default LoginScreen;

const styles = StyleSheet.create(
{
    logo:{
        width:300,
        height:200,
        marginTop:30
    },

    container:{
        flex: 1,
        alignItems:'center',
        backgroundColor:"#68CCC0",
        width:'100%',
        height:'100%',

    },

    loginBox:{
        justifyContent:"center",
        alignItems:'center',
        gap:50,
        width: "80%", 
        height: 400,
        borderRadius: "25px", 
        backgroundColor:"white",
        padding:'5%',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 2,
        shadowRadius: 3,
        marginTop:20,
        marginBottom:20
        
    },

    inputsContainer:{
        justifyContent: "center",
        width:"100%",
        height:"50%",
        alignItems:'center'

    },
    buttonsContainer:{
        justifyContent: "center",
        width:"100%",
        height:"50%",
        alignItems:'center',
        padding:"5%"
    },
   
    input: {
        textColor: "gray",
        width: "90%", 
        height: 50,
        backgroundColor:"#e6e6fa",
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:5,
        padding:15,
        shadowColor: '#171717',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 2,
        marginTop:15

    },
});

