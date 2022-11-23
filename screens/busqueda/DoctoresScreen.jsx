import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Button, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SearchableDropdown from 'react-native-searchable-dropdown';
import AppNavigator from '../../navigator/Navigator';
//import axios from "axios";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
//import { Avatar } from "@rneui/themed";


const DoctoresScreen = ({ navigation }) => {

    const [apidata, apisetData] = useState([]);
    const [apifilteredData, apisetFilteredData] = useState([]);

    useEffect(() => {
        fetchData('https://consultaterd.azurewebsites.net/api/UsuarioDoctores/GetDoctoresContent');
    }, [])

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            apisetData(json);
            apisetFilteredData(json);
            // console.log(json);

        } catch (error) {
            console.error(error);
        }
    };

    // Search
    const [search, setSearch] = useState("");

    // Funcion para filtrar la data por Nombre y/o apellido
    const SearchFilter = (text) => {
        if (text) {
            const newData = apidata.filter((item) => {
                const itemData = item.nombreDoctor ? item.nombreDoctor.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            apisetFilteredData(newData);
            setSearch(text);
        } else {
            apisetFilteredData(apidata);
            setSearch(text);
        }
    }

    const [selected, setSelected] = useState("");
    const items = [
        { id: 1, name: 'angellist' },
        { id: 2, name: 'codepen' },
        { id: 3, name: 'envelope' },
        { id: 4, name: 'etsy' },
        { id: 5, name: 'facebook' },
        { id: 6, name: 'foursquare' },
        { id: 7, name: 'github-alt' },
        { id: 8, name: 'github' },
        { id: 9, name: 'gitlab' },
        { id: 10, name: 'instagram' },
    ];


    return <>
        <SafeAreaView style={{ backgroundColor: "#68CCC0", height: "100%" }} >
            <View style={{ alignItems: 'center' }}>
                <View style={styles.searchBar}>
                    <AntDesign name="search1" size={15} style={{ marginHorizontal: 10 }}></AntDesign>
                    <TextInput style={styles.searchInput} placeholder="Buscar..." value={search} onChangeText={(text) => SearchFilter(text)}></TextInput>
                </View>
                <View style={styles.textFiltroView}>
                    <Text style={{ color: '#817777', marginBottom: 5 }}>Filtros: </Text>
                    <TouchableOpacity style={{}}>
                        <MaterialCommunityIcons name="filter-off" size={20} color={'#D01B1B'} style={{ marginHorizontal: 10 }}></MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%" }}>
                    <Text style={{ color: '#FFFFFF', marginBottom: 1 }}>Especialidad: </Text>
                    <SearchableDropdown
                        onTextChange={(text) => console.log(text)}
                        selectedItems={selected}
                        onItemSelect={(item) => setSelected(item)}
                        containerStyle={{ padding: 0 }}
                        textInputStyle={{
                            padding: 8,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            backgroundColor: '#FAF7F6',
                            borderRadius: 8,
                            marginVertical: 5
                        }}
                        itemStyle={{
                            padding: 15,
                            marginTop: 0,
                            backgroundColor: '#FAF9F8',
                            borderColor: '#bbb',
                            borderWidth: 1,
                        }}
                        itemTextStyle={{ color: '#222', }}
                        itemsContainerStyle={{ maxHeight: '75%', }}
                        items={items}
                        placeholder="Seleccione..."
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={{ width: "90%", borderBottomWidth: 1, borderColor: "#817777", marginBottom: 15 }}>
                    <Text style={{ color: '#FFFFFF', marginBottom: 1 }}>Centro Médico: </Text>
                    <SearchableDropdown
                        onTextChange={(text) => console.log(text)}
                        selectedItems={selected}
                        onItemSelect={(item) => setSelected(item)}
                        containerStyle={{ padding: 0 }}
                        textInputStyle={{
                            padding: 8,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            backgroundColor: '#FAF7F6',
                            marginBottom: 15,
                            borderRadius: 8,
                            marginVertical: 5

                        }}
                        itemStyle={{
                            padding: 15,
                            marginTop: 0,
                            backgroundColor: '#FAF9F8',
                            borderColor: '#bbb',
                            borderWidth: 1,
                        }}
                        itemTextStyle={{ color: '#222', }}
                        itemsContainerStyle={{ maxHeight: '75%', }}
                        items={items}
                        placeholder="Seleccione..."
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>

            <ScrollView style={{ backgroundColor: '#FFFFFF', height: "100%" }}>
                {
                    apifilteredData.map((item, index) => {
                        return (

                            <TouchableOpacity key={item.doctorId} style={styles.listView} onPress={() => navigation.navigate('InfoDoctor', { item })}>
                                <View style={styles.listViewContent}>
                                    <Image style={{ resizeMode: 'cover', height: 60, width: 60, borderRadius: 50 }}
                                        source={require("../../assets/avatar.png")}></Image>
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
            justifyContent:'space-between'
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