import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoctoresScreen from "../screens/busqueda/DoctoresScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PerfilScreen from "../screens/perfil/PerfilScreen";
import GestionCitaScreen from "../screens/citas/GestionCitaScreen";
import InfoDoctorScreen from "../screens/busqueda/InfoDoctorScreen";
import DisponibilidadDoctorScreen from "../screens/busqueda/DisponibilidadDoctorScreen";
import { Entypo, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//const cookies = new Cookies();


function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function DoctoresStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="DoctoresScreen" component={DoctoresScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InfoDoctor" component={InfoDoctorScreen} options={{ title: 'Información del Doctor' }} />
            <Stack.Screen name="DisponibilidadDoctor" component={DisponibilidadDoctorScreen} options={{ title: 'Disponibilidad' }} />
        </Stack.Navigator>
    );
}

function GestionCitaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GestionCita" component={GestionCitaScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


function PerfilStack(navigation) {
    const route = useRoute();
    console.log(route.params);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


export default function AppNavigator(navigation) {

    const route = useRoute();

    return (
        <NavigationContainer independent={true}>

            <Tab.Navigator initialRouteName="Home"
                screenOptions={{
                    tabBarActiveTintColor: '#8BC1B8',
                    tabBarInactiveTintColor: '#B8B3B3',
                    tabBarStyle: { backgroundColor: '#232020' },
                }}>

                <Tab.Screen name="Home" component={HomeStack} inicialParams={{ userInfo: route }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />)
                    }} />

                <Tab.Screen name="Buscar" component={DoctoresStack} inicialParams={{ userInfo: route, age: 45 }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-search" size={size} color={color} />)
                    }} />

                {/* solamente si es doctor carga gestion de citas */}
                {route.params.rol == true
                    ? <Tab.Screen name="Citas" component={GestionCitaStack} inicialParams={{ userInfo: route }}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (<AntDesign name="calendar" size={size} color={color} />)
                        }} />
                    : null}

                <Tab.Screen name="Perfil" component={PerfilStack} inicialParams={{ userInfo: route }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Ionicons name="person" size={size} color={color} />)
                    }} />
            </Tab.Navigator>

        </NavigationContainer>
    );
}