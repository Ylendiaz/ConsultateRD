import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import Home from "./Home";
// import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack(){
    return(
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Login" component={Login} options={{title : "Login Screen"}}/>
                {/* <Stack.Screen name="Home" component={Home} options={{title : "Home Screen"}, {headerShown: false}} /> */}
            </Stack.Navigator>
    );
}

function MyTabs(){
    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={MyStack} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}

export default function AppNavigator(){
    return(
        <NavigationContainer>
                <MyTabs />
        </NavigationContainer>
          
    );
}