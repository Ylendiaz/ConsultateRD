import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import {StyleSheet, Button, Text, View, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from '../../navigator/Navigator';
import axios from "axios";

// API
import UsuarioDoctores_GetDoctoresContent from "../../API/UsuarioDoctores_GetDoctoresContent";

const DoctoresScreen = ({navigation}) => {

    // const [data, setData] = useState([]);
    // const [filteredData, setFilteredData] = useState([]);
    // useEffect(()=> {
    //     fetchData('https://localhost:7000/api/UsuarioDoctores/GetDoctoresContent');
    // }, []) 

    // const fetchData = async (url) => {
    //     try{
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         setData(json);
    //         setFilteredData(json);
    //         console.log(json);
    //     } catch (error){
    //         console.error(error);
    //     }
    // };

    // Get data
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Search
    const [search, setSearch] = useState("");

    // Funcion para capturar la data del archivo y ponerlo en un Estado
    function listaDoctores(){
        const js = UsuarioDoctores_GetDoctoresContent;
        useEffect(() => {
            setData(js);
            setFilteredData(js);
        }, [])
        return filteredData;
    }
    
    // Funcion para filtrar la data por Nombre y/o apellido
    const SearchFilter = (text) => {
        if (text) {
            const newData = data.filter((item) =>{
                const itemData = item.nombreDoctor ? item.nombreDoctor.toUpperCase()
                        : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredData(newData);
            setSearch(text);
        } else{
            setFilteredData(data);
            setSearch(text);
        }
    }

    // console.log(UsuarioDoctores_GetDoctoresContent);
    const doctoresList = listaDoctores();
    //console.log(doctoresList);

    return<>
    <SafeAreaView style={{alignItems:'center'}}>
        <View style={styles.searchBar}>
            <TextInput placeholder="Buscar..." value={search} onChangeText={(text) => SearchFilter(text)}></TextInput>
        </View>
        <Text>Pantalla de busqueda de doctores</Text>
        <ScrollView>
            {
                doctoresList.map((item,index) => {
                    return(
                        <View key={index}>
                            <View>
                                <Image source={item.imagenDoctor}></Image>
                                <Text>{item.nombreDoctor} {item.apellidoDoctor}</Text>
                                <Text key={item.centroMedicoDoctor[index]}> {item.doctorId} </Text>
                            </View>
                        </View>
                    )
                })
            }
        </ScrollView>
    </SafeAreaView>
    </>
    
}

export default DoctoresScreen;

const styles = StyleSheet.create(
    {
        container:{
        },
    
        searchBar:{
            backgroundColor: "blue",
            marginTop: 20,
            width: "80%",
            flexDirection:'column'
        },

        searchInput:{
            
        }

       
    }
)