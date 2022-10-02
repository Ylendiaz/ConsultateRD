import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import DoctoresScreen from "./DoctoresScreen";
import Home from "./Home";
import Perfil from "./Perfil";
// import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
    return(
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{title : "Home Screen"}}/> 
            </Stack.Navigator>
    );
}

function DoctoresStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="DoctoresScreen" component={DoctoresScreen} options={{title : "Doctores Screen"}}/> 
            </Stack.Navigator>
    );
}

function PerfilStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="Perfil" component={Perfil} options={{title : "Perfil Screen"}}/> 
            </Stack.Navigator>
    );
}

function MyTabs(){
    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="HomeMenu" component={HomeStack} options={{headerShown: false}}/>
            <Tab.Screen name="PerfilMenu" component={DoctoresStack} options={{headerShown: false}}/>
            <Tab.Screen name="DoctoresMenu" component={PerfilStack} options={{headerShown: false}}/>
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