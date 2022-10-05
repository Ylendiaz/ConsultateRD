import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoctoresScreen from "../screens/busqueda/DoctoresScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PerfilScreen from "../screens/perfil/PerfilScreen";
import GestionCitaScreen from "../screens/citas/GestionCitaScreen";
import Cookies from "universal-cookie";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const cookies = new Cookies();


function HomeStack(){
    return(
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/> 
            </Stack.Navigator>
    );
}

function DoctoresStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="DoctoresScreen" component={DoctoresScreen} options={{headerShown: false}}/> 
            </Stack.Navigator>
    );
}

function GestionCitaStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="GestionCita" component={GestionCitaScreen} options={{headerShown: false}}/> 
            </Stack.Navigator>
    );
}

function PerfilStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="Perfil" component={PerfilScreen} options={{headerShown: false}}/> 
            </Stack.Navigator>
    );
}

function MyTabs(){
    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Buscar" component={DoctoresStack} options={{headerShown: false}}/>
            {cookies.get('rol') == 'true' ? <Tab.Screen name="Citas" component={GestionCitaStack} /> : null}
            <Tab.Screen name="Perfil" component={PerfilStack} />
        </Tab.Navigator>
    );
}

export default function AppNavigator(){
    
    return(
        <NavigationContainer independent={true}>
                <MyTabs />
        </NavigationContainer>    
    );
}