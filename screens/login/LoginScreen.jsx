import React, {useState } from "react";
import {Image, StyleSheet, Text, View, ScrollView, Dimensions, TextInput} from 'react-native';
import StyledButton from '../../components/StyledButton/Btn';
import AppNavigator from "../../navigator/Navigator"; //page stack

//AsyncStorage to save user data across all screens since login
import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@userData', value)
    } catch (e) {
      // saving error
    }
  }

  const storeTest = async (value) => {
    try {
      await AsyncStorage.setItem('@Test', value)
    } catch (e) {
      // saving error
    }
  }

  
const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData')
      if(value !== null) {
        // value previously stored
        console.log(value);
      }
    } catch(e) {
      // error reading value
    }
  }

// const removeValue = async () => {
//     try {
//       await AsyncStorage.removeItem('@userData')
//     } catch(e) {
//       console.log(e);
//     }
  
//     console.log('Done.')
//   }


const LoginScreen = ({ navigation }) => {

    const [username, setName] = useState(''); //get the input (username) of user
    const [password, setPass] = useState(''); //get the input (password) of user


    const url = 'https://consultaterd.azurewebsites.net/api/LoginTbls/' + `${username}/${password}`;//url of api request for login
    // const url = 'https://localhost:7000/api/LoginTbls/' + `${username}/${password}`; //local url of api local request for login



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
            else if (userInfo != null && (userInfo.correoElectronico == username && userInfo.usuarioContraseña==password)) { //if there was a user found and (username and password matches)
                storeData(JSON.stringify(userInfo));
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

        {/* container start */}

        <ScrollView
        style = {{flex:1, backgroundColor:'#68CCC0'}}
        showsVerticalScrollIndicator = {false}>

            {/* brand view */}

            <View
            style = {{height: Dimensions.get('window').height/2.5,
            }}>
                <View style={styles.brandView}>
                    <Image style={styles.logo} source={require('../../assets/Consultate-RD-logo.png')}/>
                    <Text style={styles.textlogo}>Consultate RD</Text>
                </View>
            </View>

            {/* bottom view */}
            <View style={styles.bottomView}>

                {/* loginBox View */}
                <View style = {styles.loginBox}>

                    {/* form inputs View */}
                    <View style={{width:'80%', paddingVertical:15}}>
                        <TextInput name="username" placeholderTextColor="grey" placeholder="Correo" style={styles.inputs} onChangeText={(val1) => setName(val1)}></TextInput>
                        <TextInput secureTextEntry={true} placeholderTextColor="grey" placeholder="Contraseña" name="password" style={styles.inputs} onChangeText={(val2) => setPass(val2)}></TextInput>
                    </View>

                    {/* form buttons View */}
                    <View
                    style={styles.buttonsView}>
                        <StyledButton txtColor="#ffffff" content="Log in" bgColor="#68CCC0" radius="80"  onPress={() => iniciarSesion()}></StyledButton>
                        <StyledButton txtColor="#ffffff" content="Registrarse" bgColor="#68CCC0" radius="80" onPress={() => navigation.navigate('Registrarse')}></StyledButton>
                    </View>

                </View>

            </View>

        </ScrollView>

        {/* container end */}

    </>


}

export default LoginScreen;

const styles = StyleSheet.create(
    {
        brandView:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        },
        logo: {
            width: 200,
            height: 150,
            marginTop: 30
        },
        textlogo: {
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 10,
            // marginBottom: 15
        },

        bottomView:{
            flex:1.5,
            // bottom:10,
            alignItems:'center',
            textAlign:'center',


        },

        loginBox: {

            paddingVertical:10,
            paddingHorizontal:10,
            alignItems:"center",
            backgroundColor: "#ffffff",

            width:'80%',
            marginTop:50,

            borderRadius:40,
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 2,
            shadowRadius: 3,

        },

        inputs:{
            backgroundColor: "#e6e6fa",
            textColor: "gray",
            marginVertical:10,
            padding:13,

            borderRadius: 10,
            borderColor:'#ffffff',
            shadowColor:'#171717',
            shadowOffset:{width:1, height:1},
            shadowOpacity:2,

            width:'100%',
            placeholdertextcolor:'red',

        },
        buttonsView:{
            justifyContent:'center',
            alignItems:'center',
            height:130,
            width: '80%',
            // width:Dimensions.get('window').width/2.5,

        },
     
    });