import React, { Component } from "react";
import { StyleSheet, Button, Text, View } from 'react-native';
import AppNavigator from '../../navigator/Navigator';
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";

// function hello({route}){

    
// }

const PerfilScreen = ({ route, navigation}) => {
    return <>
        {/* <AppNavigator /> */}
        <View style={{ height: 100, width: 100 }}>
            <Text>Pantalla de Perfil</Text>
        </View>
    </>

}

export default PerfilScreen;