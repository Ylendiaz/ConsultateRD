import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoctoresScreen from "../screens/busqueda/DoctoresScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PerfilScreen from "../screens/perfil/PerfilScreen";
import GestionCitaScreen from "../screens/citas/GestionCitaScreen";
import InfoDoctorScreen from "../screens/busqueda/InfoDoctorScreen";
import DisponibilidadDoctorScreen from "../screens/busqueda/DisponibilidadDoctorScreen";
import DisponibilidadDoctorScreenModified from '../screens/citas/DisponibilidadDoctorScreenModified';
import { Entypo, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import InfoCitaScreen from "../screens/citas/InfoCitaScreen";


// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


let parametros = {};//save the parameters of the user that is logged in globally in the tab navigator


function HomeStack() {

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} initialParams={parametros} options={{ headerShown: false }} />
            <Stack.Screen name="InfoCita" component={InfoCitaScreen} options={{ title: 'Información de  la cita' }} />
        </Stack.Navigator>
    );
}

function DoctoresStack(navigation) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="DoctoresScreen" component={DoctoresScreen} initialParams={parametros} options={{ headerShown: false }} />
            <Stack.Screen name="InfoDoctor" component={InfoDoctorScreen} options={{ title: 'Información del Doctor' }} />
            <Stack.Screen name="DisponibilidadDoctor" component={DisponibilidadDoctorScreen} options={{ title: 'Disponibilidad' }} />
        </Stack.Navigator>
    );
}

function GestionCitaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GestionCita" component={GestionCitaScreen} initialParams={parametros} options={{ headerShown: false }} />
            <Stack.Screen name="InfoCita" component={InfoCitaScreen} options={{ title: 'Información de  la cita' }} />
            <Stack.Screen name="DisponibilidadDoctorModified" component={DisponibilidadDoctorScreenModified} options={{ title: 'Disponibilidad' }} />
        </Stack.Navigator>
    );
}


function PerfilStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Perfil" component={PerfilScreen} initialParams={parametros} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


export default function AppNavigator(navigation) {

    const route = useRoute();

    parametros = route.params;
    return (
        <NavigationContainer independent={true}>

            <Tab.Navigator initialRouteName="Home"
                screenOptions={{
                    tabBarActiveTintColor: '#8BC1B8',
                    tabBarInactiveTintColor: '#B8B3B3',
                    tabBarStyle: { backgroundColor: '#232020' },
                }}>

                <Tab.Screen name="Home" component={HomeStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />)
                    }} />

                <Tab.Screen name="Buscar" component={DoctoresStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-search" size={size} color={color} />)
                    }} />

                {/* solamente si es doctor carga gestion de citas */}
                {route.params.rol == true
                    ? <Tab.Screen name="Citas" component={GestionCitaStack}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (<AntDesign name="calendar" size={size} color={color} />)
                        }} />
                    : null}

                <Tab.Screen name="Perfil" component={PerfilStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Ionicons name="person" size={size} color={color} />)
                    }} />
            </Tab.Navigator>

        </NavigationContainer>
    );
}