import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import DoctoresScreen from "./DoctoresScreen";
import Home from "./Home";
import Perfil from "./Perfil";
import GestionCita from "./GestionCita";
// import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
    return(
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/> 
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
                <Stack.Screen name="GestionCita" component={GestionCita} options={{headerShown: false}}/> 
            </Stack.Navigator>
    );
}

function PerfilStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="Perfil" component={Perfil} options={{headerShown: false}}/> 
            </Stack.Navigator>
    );
}

function MyTabs(){
    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Buscar" component={DoctoresStack} />
            <Tab.Screen name="Citas" component={GestionCitaStack} />
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