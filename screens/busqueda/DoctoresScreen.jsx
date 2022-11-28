import React, { Component, useEffect, useLayoutEffect, useState, useRef } from "react";
import { StyleSheet, Button, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import SearchableDropdown from 'react-native-searchable-dropdown';
import AppNavigator from '../../navigator/Navigator';
import { SelectList } from 'react-native-dropdown-select-list';
//import axios from "axios";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
//import { Avatar } from "@rneui/themed";


const DoctoresScreen = ({ navigation }) => {

    // ----------------Consumir API tabla Usuario Doctores-----------------
    const [apidata, apisetData] = useState([]);
    const [apifilteredData, apisetFilteredData] = useState({
        data: [],
        isLoading: true
    });
    // const isLoading = useRef(true);

    useEffect(() => {
        fetchData('https://consultaterd.azurewebsites.net/api/UsuarioDoctores/GetDoctoresContent');
    }, [])

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            apisetData(json);
            apisetFilteredData({
                data: json,
                isLoading: false
            });

        } catch (error) {
            console.error(error);
        }
        // finally {
        //     isLoading.current = false;
        // }
    };

    //-------------Consumir API tabla Centros Medicos--------------------
    const [apidataCentros, apisetDataCentros] = useState([]);
    const [selectedCentro, setSelectedCentro] = useState("");

    useEffect(() => {
        fetchDataCentros('https://consultaterd.azurewebsites.net/api/CentroMedico');
    }, [])

    const fetchDataCentros = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const newarray = json.map((item) => {
                return { key: item.centroMedicoId, value: item.centroMedicoNombre }
            })
            apisetDataCentros(newarray);

        } catch (error) {
            console.error(error);
        }
    };

    //-------------Consumir API tabla Especialidades--------------------
    const [apidataEspecialidad, apisetDataEspecialidad] = useState([]);
    const [selectedEspecialidad, setSelectedEspecialidad] = useState("");

    useEffect(() => {
        fetchDataEspecialidad('https://consultaterd.azurewebsites.net/api/Especialidades');
    }, [])

    const fetchDataEspecialidad = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const newarray = json.map((item) => {
                return { key: item.especialidadId, value: item.nombreEspecialidad }
            })
            apisetDataEspecialidad(newarray);

        } catch (error) {
            console.error(error);
        }
    };

    //------------ Funcion para filtrar la data por Nombre y/o apellido
    const [search, setSearch] = useState("");

    const SearchFilter = (text) => {
        if (text) {
            const newData = apifilteredData.data.filter((item) => {
                const itemData = item.nombreDoctor ? item.nombreDoctor.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            apisetFilteredData({data: newData});
            setSearch(text);
        } else {
            apisetFilteredData({data: newData});
            setSearch(text);
        }
    }

    // ------------ Funcion para filtrar por Especialidades
    const FilterEspecialidad = () => {
        if (selectedEspecialidad != "") {
            const newData = apifilteredData.data.filter(item =>
                item.especialidadesDoctor.map(data => data.especialidadId) == selectedEspecialidad
            )
            apisetFilteredData({data: newData});
        }
    }

    // ------------ Funcion para filtrar por Centros Medicos
    const FilterCentros = () => {
        if (selectedCentro != "") {
            const newData = apifilteredData.data.filter(item =>
                item.centroMedicoDoctor.map(data => data.centroMedicoId) == selectedCentro
            )
            apisetFilteredData({data: newData});
        }
    }

    // ------------ Funcion para quitar los filtros (No funciona)
    const QuitarFiltros = () => {
        apisetFilteredData({data: apidata});
        setSelectedEspecialidad("");
        setSelectedCentro("");
    }


    return <>
        <SafeAreaView style={{ backgroundColor: "#68CCC0", height: "100%" }} >
            <View style={{ alignItems: 'center' }}>
                <View style={styles.searchBar}>
                    <AntDesign name="search1" size={15} style={{ marginHorizontal: 10 }}></AntDesign>
                    <TextInput style={styles.searchInput} placeholder="Buscar..." value={search} onChangeText={(text) => SearchFilter(text)}></TextInput>
                </View>
                <View style={styles.textFiltroView}>
                    <Text style={{ color: '#817777', marginBottom: 5 }}>Filtros: </Text>
                    <TouchableOpacity style={{}} onPress={() => QuitarFiltros()}>
                        <MaterialCommunityIcons name="filter-off" size={20} color={'#D01B1B'} style={{ marginHorizontal: 10 }}></MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%" }}>
                    <Text style={{ color: '#FFFFFF', marginBottom: 1 }}>Especialidad: </Text>
                    <View>
                        <SelectList
                            setSelected={(val) => setSelectedEspecialidad(val)}
                            data={apidataEspecialidad}
                            onSelect={() => FilterEspecialidad()}
                            search={true}
                            //defaultOption={{ key: '0', value: 'Seleccione...' }}
                            inputStyles={{ color: '#ccc' }}
                            boxStyles={{
                                padding: 8,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: '#FAF7F6',
                                marginBottom: 10,
                                borderRadius: 8,
                                marginVertical: 5
                            }}
                            dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#F6F6F6', marginBottom: 15 }}
                            dropdownItemStyles={{ borderBottomWidth: 1, borderColor: '#ccc', }}
                            notFoundText=""
                            placeholder='Seleccione...' />
                    </View>
                </View>
                <View style={{ width: "90%", borderBottomWidth: 1, borderColor: "#817777", marginBottom: 15 }}>
                    <Text style={{ color: '#FFFFFF', marginBottom: 1 }}>Centro Médico: </Text>
                    <View>
                        <SelectList
                            setSelected={setSelectedCentro}
                            data={apidataCentros}
                            onSelect={() => FilterCentros()}
                            search={true}
                            //defaultOption={{ key: '0', value: 'Seleccione...' }}
                            inputStyles={{ color: '#ccc' }}
                            boxStyles={{
                                padding: 8,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: '#FAF7F6',
                                marginBottom: 15,
                                borderRadius: 8,
                                marginVertical: 5,
                            }}
                            dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#F6F6F6', marginBottom: 15 }}
                            dropdownItemStyles={{ borderBottomWidth: 1, borderColor: '#ccc', }}
                            notFoundText=""
                            placeholder='Seleccione...' />

                    </View>
                </View>
            </View>

            <ScrollView style={{ backgroundColor: '#FFFFFF', height: "100%" }}>
                {apifilteredData.isLoading == true ?
                    <View style={{alignSelf: "center", justifyContent: 'center', marginTop: 50}}>
                        <Image source={require('../../assets/loading_image.gif')} style={{ resizeMode: "cover", width: 25, height: 25 }}></Image>
                    </View> : null}

                {
                    apifilteredData.data.map((item, index) => {
                        return (

                            <TouchableOpacity key={item.doctorId} style={styles.listView} onPress={() => navigation.navigate('InfoDoctor', { item })}>
                                <View style={styles.listViewContent}>
                                    {item.imagenDoctor == null ? <Image style={{ resizeMode: 'cover', height: 60, width: 60, borderRadius: 50 }} source={require("../../assets/avatar.png")}></Image>
                                        : <Image style={{ resizeMode: 'cover', height: 60, width: 60, borderRadius: 50 }} source={{ uri: foto }}></Image>}
                                    <View style={styles.listTextView}>
                                        <Text style={{ color: "#35AABA", marginBottom: 8 }}>{item.nombreDoctor} {item.apellidoDoctor}</Text>
                                        {item.especialidadesDoctor.map(data => (
                                            <Text key={item.doctorId} style={{ marginBottom: 5 }}>
                                                {data.especialidad.nombreEspecialidad}
                                            </Text>
                                        ))}
                                        {item.centroMedicoDoctor.map(data => (
                                            <Text key={item.doctorId} style={{ marginBottom: 5 }}>
                                                {data.centroMedico.centroMedicoNombre}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            </TouchableOpacity>
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
            marginBottom: 10,
            width: "90%",
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: "#817777",
            justifyContent: 'space-between'
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
        },

    }
)
