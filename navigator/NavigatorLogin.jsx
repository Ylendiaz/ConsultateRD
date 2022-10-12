import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/login/LoginScreen";
import RegistrarseScreen from "../screens/login/RegistrarseScreen";
import AppNavigator from "./Navigator";
import Cookies from "universal-cookie";

const Stack = createNativeStackNavigator();
const cookies = new Cookies();

function MyStack(){
    
    return(
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="HomeTab" component={AppNavigator} options={{headerShown: false}}/>
                <Stack.Screen name="Registrarse" component={RegistrarseScreen} options={{title : "Registrarse"}}/>
            </Stack.Navigator>
    );
}

export default function AppNavigatorLogin(){

    return(
        
        <NavigationContainer independent={true}>
            <MyStack />
        </NavigationContainer>
    );
}