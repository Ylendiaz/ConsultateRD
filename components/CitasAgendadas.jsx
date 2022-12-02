import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar} from 'react-native';
import CalendarPickerModal from 'react-native-calendar-picker';
//import { SafeAreaView } from "react-native-safe-area-context";
import { withSafeAreaInsets } from 'react-native-safe-area-context';


const CitasAgendadas = (props) => {

    const { citas } = props;
  
    return (
  
        <ScrollView style={{ backgroundColor: '#68CCC0', height: "100%" }}>
        {
            citas.map((item, index) => {
                return (

                    <TouchableOpacity key={item.citaId} style={styles.listView} onPress={() => navigation.navigate('InfoCita', { item })}>
                        <View style={styles.listViewContent}>
                            
                            <View style={styles.listTextView}>
                                <Text style={{ color: "black", marginBottom: 8 }}>{item.citaFecha} {item.pacienteId} {item.citasHoraInicio}</Text>
                                
                                
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    </ScrollView>
        
    );
  };
  
  export default CitasAgendadas;
  
  const styles = StyleSheet.create({
  
    listView: {
        marginHorizontal: 15,
        marginTop: 15,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: '#171717',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 2,
    },
    
    listViewContent: {
        //flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center",
        marginHorizontal: 15,
        marginVertical: 15
    },
    
    // listTextView: {
    //     marginLeft: 15
    // }
  });