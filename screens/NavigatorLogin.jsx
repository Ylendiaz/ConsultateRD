import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./Login";
import Registrarse from "./Registrarse";
import AppNavigator from "./Navigator";
//import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();

function MyStack(){
    return(
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{title : "Login"}}/>
                <Stack.Screen name="HomeTab" component={AppNavigator} options={{headerShown: false}}/>
                <Stack.Screen name="Registrarse" component={Registrarse} options={{title : "Registrarse"}}/>
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