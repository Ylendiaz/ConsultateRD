import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Button, Text, View, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from '../../navigator/Navigator';
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from "@rneui/themed";


// API
import UsuarioDoctores_GetDoctoresContent from "../../API/UsuarioDoctores_GetDoctoresContent";
import CentroMedico from "../../API/CentroMedico";
import Especialidades from "../../API/Especialidades";

const DoctoresScreen = ({ navigation }) => {

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
    function listaDoctores() {
        const js = UsuarioDoctores_GetDoctoresContent;
        useEffect(() => {
            setData(js);
            setFilteredData(js);
        }, [])
        return filteredData;
    }

    // 
    const [dataCentro, setDataCentro] = useState([]);
    const cm = CentroMedico;
    useEffect(() => {
        setDataCentro(cm);
    }, [])
    // 
    const [dataEspecialidad, setDataEspecialidad] = useState([]);
    const es = Especialidades;
    useEffect(() => {
        setDataEspecialidad(es);
    }, [])

    // Funcion para filtrar la data por Nombre y/o apellido
    const SearchFilter = (text) => {
        if (text) {
            const newData = data.filter((item) => {
                const itemData = item.nombreDoctor ? item.nombreDoctor.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(data);
            setSearch(text);
        }
    }

    // console.log(UsuarioDoctores_GetDoctoresContent);
    const doctoresList = listaDoctores();
    //console.log(doctoresList);

    return <>
        <SafeAreaView style={{ backgroundColor: "#68CCC0" }} >
            <View style={{ alignItems: 'center' }}>
                <View style={styles.searchBar}>
                    <AntDesign name="search1" size={15} style={{ marginHorizontal: 10 }}></AntDesign>
                    <TextInput style={styles.searchInput} placeholder="Buscar..." value={search} onChangeText={(text) => SearchFilter(text)}></TextInput>
                </View>
                <View style={styles.textFiltroView}>
                    <Text style={{ color: '#817777', marginBottom: 5 }}>Filtros: </Text>
                    {/* <AntDesign name="search1" size={15} style={{ marginHorizontal: 10 }}></AntDesign> */}
                </View>
            </View>

            <ScrollView style={{ backgroundColor: '#FFFFFF', height: "100%" }}>
                {
                    doctoresList.map((item, index) => {
                        return (
                            <View key={index} style={styles.listView}>
                                <View style={styles.listViewContent}>
                                    <Avatar rounded size={60} source={require("../../assets/avatar.png")}></Avatar>
                                    <View style={styles.listTextView}>
                                        <Text style={{color:"#35AABA", fontSize:"16", marginBottom:8}}>{item.nombreDoctor} {item.apellidoDoctor}</Text>
                                        <Text key={item.centroMedicoDoctor[index]} style={{marginBottom:5}}>
                                            {dataEspecialidad.find(x => x.EspecialidadId == item.EspecialidadId).nombreEspecialidad}
                                        </Text>
                                        <Text key={item.centroMedicoDoctor[index]}>
                                            {dataCentro.find(x => x.CentroMedicoId == item.centroMedicoId).centroMedicoNombre}
                                        </Text>
                                    </View>
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
        container: {
        },

        searchBar: {
            alignItems: 'center',
            marginTop: 20,
            width: "90%",
            flexDirection: 'row',
            borderRadius: 100,
            backgroundColor: "#FFFFFF"
        },

        searchInput: {
            marginVertical: 10,
            width: "100%"
        },

        textFiltroView: {
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
            width: "90%",
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: "#817777"
        },

        listView: {
            marginHorizontal: 15,
            marginTop: 15,
            backgroundColor: "#FFFFFF",
            borderRadius: 5,
            shadowColor: '#171717',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 2,
        },

        listViewContent: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginVertical: 15
        },

        listTextView: {
            marginLeft: 15
        }

    }
)