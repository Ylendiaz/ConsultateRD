import React, { Component } from "react";
import {Image,TextInput, ImageBackground, StyleSheet, Button, Text, View } from 'react-native';
import StyledButton from '../components/StyledButton/Btn';



const Login=({navigation}) =>{
    return<>

        <View style={styles.container}>

            <Image style = {styles.logo} source={require('../assets/vacunateRD-logo.png')} />

            <View style={styles.loginBox}>

                <View style= {styles.inputsCotainer}>
                    <TextInput placeholderTextColor={'gray'} placeholder="Email" label = "Email" style={styles.input} ></TextInput>
                    <TextInput placeholderTextColor={'gray'} placeholder="Contraseña" label = "Password" style={styles.input} ></TextInput>
                </View>
                
                <View style= {styles.buttonsContainer}>

                    <View style={{height:"50%", width:"100%"}}>
                        <StyledButton txtColor="#ffffff" content = "Log in" bgColor="#68CCC0" onPress={() => navigation.navigate('Home')}></StyledButton>
                    </View>

                    <View style={{height:"50%", width:"100%"}}>
                        <StyledButton txtColor="#ffffff" content = "Register" bgColor="#68CCC0" onPress={() => navigation.navigate('Home')}></StyledButton>
                    </View>
                    
                </View>
                
             </View>

        </View>
        
    </>
}

export default Login;

const styles = StyleSheet.create(
{
    logo:{
        width:200,
        height:200,
        
    },

    container:{
        flex: 1,
        alignSelf: "center",
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:"#68CCC0",
        width:'100vw',
        height:'100vh',
        gap:50,
    },

    loginBox:{
        alignItems:'center',
        justifyContent:'center', 
   
        width: "90%", 
        height: "55%",
        borderRadius: "25px", 
        backgroundColor:"white",
        padding:'5%',
        gap:25,
    },

    inputsCotainer:{
        gap:20, 
        width:"100%",
        height:"50%",
        alignItems:'center',
        padding:"5%"

    },
    buttonsContainer:{
        gap:20, 
        width:"80%", 
        padding:"5%"
    },
   

    

    input: {
        textColor: "gray",
        fontFamily:"JetBrains Mono",
        width: "90%", 
        height: "100%",
        backgroundColor:"#e6e6fa",
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:30,
        padding:10,

    },
});

