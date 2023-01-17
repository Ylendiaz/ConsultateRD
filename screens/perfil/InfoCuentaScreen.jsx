import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Button, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from "moment";
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import HorariosDoctors from "../../API/HorariosDoctors";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

const InfoCuentaScreen = ({ navigation, route }) => {

    let { loginId, correoElectronico, rol, } = route.params.userData;
    let { apidataDoctor } = route.params;

    const [horaEntrada, sethoraEntrada] = useState("");
    const [horaSalida, sethoraSalida] = useState("");

    //-------------Consumir API tabla HorariosDoctors--------------------
    const [apidataHorarios, apisetDataHorarios] = useState([]);

    useEffect(() => {
        fetchDataEspecialidad(HorariosDoctors);
    }, [])

    const fetchDataEspecialidad = (table) => {
        try {
            const newarray = table.filter(item => item.doctorId == apidataDoctor);
            apisetDataHorarios(newarray);

        } catch (error) {
            console.error(error);
        }
    }
    const data = [
        { key: '1', value: '08:00' },
        { key: '2', value: '10:00' },
        { key: '3', value: '12:00' },
        { key: '4', value: '14:00' },
        { key: '5', value: '16:00' },
        { key: '6', value: '18:00' }];

    const dia = [
        { key: 1, dia: "Lunes" },
        { key: 2, dia: "Martes" },
        { key: 3, dia: "Miércoles" },
        { key: 4, dia: "Jueves" },
        { key: 5, dia: "Viernes" },
        { key: 6, dia: "Sábado" },
        { key: 7, dia: "Domingo" }]


    return <>
        <ScrollView style={{ backgroundColor: "#509F8C", height: "100%" }} >
            <View style={styles.viewTopPerfil}>
                <Image style={styles.viewFoto} source={require("../../assets/avatar.png")}></Image>
            </View>
            <KeyboardAwareScrollView style={{ width: '100%' }}>

                <View style={{ marginTop: 30, alignItems: 'center', marginVertical: 10, alignSelf: 'center', flexDirection: 'row' }}>
                    <FontAwesome name="credit-card" size={24} color="black" />
                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 18, }}>Método de Pago</Text>
                </View>

                <TouchableOpacity style={{ backgroundColor: "#F2F2F2", width: "80%", marginVertical: 10, flexDirection: 'row', alignSelf: 'center', borderRadius: 15, shadowColor: '#171717', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 2 }}>
                    <View style={{ marginHorizontal: 20, marginVertical: 5, alignItems: 'center', borderRadius: 15, }}>
                        <Image style={{ resizeMode: 'contain', height: 60, width: 60, marginHorizontal: 20, }} source={require("../../assets/Mastercard_2019_logo.png")}></Image>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, }}>MasterCard</Text>
                        <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 14, }}>**** 9453</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, }}>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{}} />
                    </View>
                </TouchableOpacity>

                <View style={{ marginTop: 20, alignItems: 'center', width: "70%", borderBottomWidth: 1, borderColor: "black", alignSelf: 'center' }}></View>
                <View style={{ backgroundColor: "#509F8C", alignItems: 'center', width: "100%", height: "100%", marginVertical: 10, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 15, fontWeight: 'bold' }}>Modificar Disponibilidad</Text>
                    <View style={{ backgroundColor: "#509F8C", alignItems: 'center', width: "100%", flexDirection: 'row', borderRadius: 80, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10, }}>
                        {dia.map((item) => {
                            return <>
                                <View key={item.key} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={[
                                        apidataHorarios.filter(element => element.diaId == item.key).map(obj => { return obj.diaId }) == item.key
                                            ? styles.circleDayOn
                                            : styles.circleDayOff]}>
                                        <Text style={{ marginVertical: 5, marginHorizontal: 5, fontSize: 13, fontStyle: 'italic' }}>{item.dia}</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        })}
                    </View>
                    <View style={{ width: "80%",  marginTop: 10, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ fontSize: 16,  fontWeight: 'bold' }}>Intervalo entre citas: </Text>
                        <TextInput placeholderTextColor={'black'} placeholder={"30 mins"} label="Intervalo" style={styles.input} ></TextInput>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginBottom: 35 }}>
                        <View style={{ width: "80%" }}>
                            <SelectList
                                setSelected={sethoraEntrada}
                                data={data}
                                search={true}
                                inputStyles={{ color: 'gray' }}
                                boxStyles={styles.inputList}
                                dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#e6e6fa', marginBottom: 15 }}
                                dropdownItemStyles={{}}
                                notFoundText=""
                                placeholder='Hora de Entrada' />
                        </View>
                        <View style={{ width: "80%" }}>
                            <SelectList
                                setSelected={sethoraEntrada}
                                data={data}
                                search={true}
                                inputStyles={{ color: 'gray' }}
                                boxStyles={styles.inputList}
                                dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#e6e6fa', marginBottom: 15 }}
                                dropdownItemStyles={{}}
                                notFoundText=""
                                placeholder='Hora de Salida' />
                        </View>
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </ScrollView>
    </>

}

export default InfoCuentaScreen;

const styles = StyleSheet.create({

    viewTopPerfil: {
        alignItems: 'center',
        backgroundColor: "#65D1B7",
        height: 230,
        borderBottomWidth: 1,
        borderColor: '#7E8C8A',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.84,
        elevation: 9,
    },
    textPerfil: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 70
    },
    textCitas: {
        borderRadius: 10,
        marginTop: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#232020",
        width: "65%",
    },
    viewFoto: {
        resizeMode: 'cover',
        marginTop: 25,
        height: 175,
        width: 175,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'black',
    },
    textInfo: {
        width: "80%",
        alignItems: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(10, 9, 9, 0.17)',
    },
    buttonsContainer: {
        //backgroundColor: "blue",
        justifyContent: "center",
        width: "100%",
        alignItems: 'center',
        padding: "5%"
    },
    inputsContainer: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    input: {
        textColor: "black",
        alignSelf: 'center',
        width: "40%",
        paddingLeft: 10,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderColor: "#364956",
 
    },
    circleDayOn: {
        backgroundColor: "#42855B",
        padding: 5,
        marginVertical: 5,
        borderRadius: 15,
        marginHorizontal: 5
    },
    circleDayOff: {
        backgroundColor: "#E64848",
        padding: 5,
        marginVertical: 5,
        borderRadius: 15,
        marginHorizontal: 5
    },
    inputList: {
        textColor: "gray",
        backgroundColor: "#e6e6fa",
        borderRadius: 10,
        marginTop: 15
    },
});