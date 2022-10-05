import React, { Component, useEffect, useState } from "react";
import {StyleSheet, Button, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from '../../navigator/Navigator';
import DoctoresList from "../../components/doctoresList";
import axios from "axios";


const DoctoresScreen = ({navigation}) => {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    // const fetchData = async () => {
    //     try{
    //         const response = await axios.get('https://localhost:7000/api/UsuarioDoctores/GetDoctoresContent');
    //         console.log(response.data);
    //     } catch (error){
    //         console.error(error);
    //     }
    // };
    
    // useEffect(()=> {
    //     fetchData();
    // }, [])

    useEffect(()=> {
        fetchData('https://localhost:7000/api/UsuarioDoctores/GetDoctoresContent');
    }, [])

    const fetchData = async (url) => {
        try{
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setFilteredData(json);
            console.log(json);
        } catch (error){
            console.error(error);
        }
    };

    return<>
    <SafeAreaView style={{backgroundColor:"blue"}}>
        <Text>Pantalla de busqueda de doctores</Text>
    </SafeAreaView>
    </>
    
}

export default DoctoresScreen;