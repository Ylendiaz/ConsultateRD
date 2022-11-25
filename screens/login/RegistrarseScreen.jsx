import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet, Button, Text, View, TextInput, ScrollView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwitchSelector from "react-native-switch-selector";
import {SelectList, MultipleSelectList} from 'react-native-dropdown-select-list';
import StyledButton from '../../components/StyledButton/Btn';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const RegistrarseScreen = ({ navigation }) => {

    //Para el Switch Selector
    const [showHide, setShowHide] = useState(false);

    //Para el dropdown
    const [selectedSexo, setSelectedSexo] = useState("");
    const data = [{ key: '1', value: 'Masculino' }, { key: '2', value: 'Femenino' }];

    //Para el checkBox Paciente
    const [checkboxState1, setCheckboxState1] = useState(false);

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


    return <>
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={styles.selectView}>
                        <SwitchSelector
                            initial={0}
                            textColor={'#8B8585'}
                            selectedColor={'#5DB075'}
                            backgroundColor={'#E7E7E7'}
                            buttonColor={'#FFF'}
                            borderColor={'#72c8dc'}
                            height={45}
                            hasPadding
                            onPress={value => setShowHide(value)}
                            options={[
                                { label: "Paciente", value: false },
                                { label: "Doctor", value: true }]}>
                        </SwitchSelector>
                    </View>
                </View>

                {showHide !== true
                    ? //Pacientes
                    <View style={styles.container}>
                        <View style={styles.inputsContainer}>
                            <TextInput placeholderTextColor={'gray'} placeholder="Nombres" label="Nombres" style={styles.input} ></TextInput>
                            <TextInput placeholderTextColor={'gray'} placeholder="Apellidos" label="Apellidos" style={styles.input} ></TextInput>
                            <TextInput placeholderTextColor={'gray'} placeholder="Teléfono" label="Teléfono" keyboardType="numeric" style={styles.input} ></TextInput>
                            <View style={{ width: "80%" }}>
                                <SelectList
                                    setSelected={setSelectedSexo}
                                    data={data}
                                    search={false}
                                    inputStyles={{ color: 'gray' }}
                                    boxStyles={styles.inputList}
                                    dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#e6e6fa', marginBottom: 15 }}
                                    dropdownItemStyles={{}}
                                    placeholder='Sexo' />
                            </View>
                            <TextInput placeholderTextColor={'gray'} placeholder="Fecha de Nacimiento" label="FechaNacimiento" style={styles.input} ></TextInput>

                            {/* <Text style={styles.inputText}>Correo Electronico: </Text> */}
                            <TextInput placeholderTextColor={'gray'} placeholder="Email" label="Email" keyboardType="email-address" style={styles.input} ></TextInput>
                            {/* <Text style={styles.inputText}>Contraseña: </Text> */}
                            <TextInput placeholderTextColor={'gray'} placeholder="Contraseña" label="Password" secureTextEntry={true} style={styles.input} ></TextInput>
                            <TextInput placeholderTextColor={'gray'} placeholder="Repite Contraseña" label="Password" secureTextEntry={true} style={styles.input} ></TextInput>
                        </View>

                        <View style={{ marginTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="black"
                                unfillColor="#68CCC0"
                                isChecked={checkboxState1}
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={() => { setCheckboxState1(!checkboxState1) }}
                            />
                            <Text>I agree to the terms And privacy policy</Text>
                        </View>
                        <View style={{ height: 50, width: "80%", marginTop: 20, marginBottom: 60 }}>
                            <StyledButton txtColor="#5E6472" content="Crear Cuenta" bgColor="#FFFFFF" radius="10" onPress={() => navigator.navigation('HomeTab')}></StyledButton>
                        </View>
                    </View>

                    : //Doctores
                    <View style={styles.container}>
                        <View style={styles.inputsContainer}>
                            <TextInput placeholderTextColor={'gray'} placeholder="Nombres" label="Nombres" style={styles.input} ></TextInput>
                            <TextInput placeholderTextColor={'gray'} placeholder="Apellidos" label="Apellidos" style={styles.input} ></TextInput>
                            <TextInput placeholderTextColor={'gray'} placeholder="Teléfono" label="Teléfono" keyboardType="numeric" style={styles.input} ></TextInput>
                            <View style={{ width: "80%" }}>
                                <SelectList
                                    setSelected={setSelectedSexo}
                                    data={data}
                                    search={false}
                                    inputStyles={{ color: 'gray' }}
                                    boxStyles={styles.inputList}
                                    dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#e6e6fa', marginBottom: 15 }}
                                    dropdownItemStyles={{}}
                                    placeholder='Sexo' />
                            </View>
                            <TextInput placeholderTextColor={'gray'} placeholder="Fecha de Nacimiento" label="FechaNacimiento" style={styles.input} ></TextInput>

                            {/* <Text style={styles.inputText}>Correo Electronico: </Text> */}
                            <TextInput placeholderTextColor={'gray'} placeholder="Email" label="Email" keyboardType="email-address" style={styles.input} ></TextInput>
                            {/* <Text style={styles.inputText}>Contraseña: </Text> */}
                            <TextInput placeholderTextColor={'gray'} placeholder="Contraseña" label="Password" secureTextEntry={true} style={styles.input} ></TextInput>
                            <TextInput placeholderTextColor={'gray'} placeholder="Repite Contraseña" label="Password" secureTextEntry={true} style={styles.input} ></TextInput>
                            <View style={{ width: "80%" }}>
                                <SelectList
                                    setSelected={setSelectedCentro}
                                    data={apidataCentros}
                                    search={true}
                                    inputStyles={{ color: 'gray' }}
                                    boxStyles={styles.inputList}
                                    dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#e6e6fa', marginBottom: 15 }}
                                    dropdownItemStyles={{}}
                                    placeholder='Centro Médico' />
                            </View>
                            <View style={{ width: "80%" }}>
                                <MultipleSelectList
                                    setSelected={(val) => setSelectedEspecialidad(val)} // Retorna un arreglo con los id de las especialidades
                                    //onSelect={() => console.log(selectedEspecialidad)}
                                    data={apidataEspecialidad}
                                    save="key"
                                    inputStyles={{ color: 'gray' }}
                                    boxStyles={styles.inputList}
                                    dropdownStyles={{ borderColor: '#ccc', backgroundColor: '#e6e6fa', marginBottom: 15 }}
                                    labelStyles={{color: 'gray'}}
                                    label="Especialidades"
                                    placeholder='Especialidades'
                                />
                            </View>
                            <View style={{ marginTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <BouncyCheckbox
                                    size={25}
                                    fillColor="black"
                                    unfillColor="#68CCC0"
                                    isChecked={checkboxState1}
                                    iconStyle={{ borderColor: "red" }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    onPress={() => { setCheckboxState1(!checkboxState1) }}
                                />
                                <Text>I agree to the terms And privacy policy</Text>
                            </View>
                            <View style={{ height: 50, width: "80%", marginTop: 20, marginBottom: 60 }}>
                                <StyledButton txtColor="#5E6472" content="Crear Cuenta" bgColor="#FFFFFF" radius="10" onPress={() => navigator.navigation('HomeTab')}></StyledButton>
                            </View>
                        </View>
                    </View>
                }
            </KeyboardAwareScrollView>
        </View>
    </>

}

export default RegistrarseScreen;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: "#68CCC0",
            width: '100%',
            height: '100%',
        },

        selectView: {
            width: '80%',
            alignItems: 'center',
            marginTop: 30
        },

        inputsContainer: {
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            marginTop: 30,
        },

        input: {
            textColor: "gray",
            width: "80%",
            height: 50,
            backgroundColor: "#e6e6fa",
            flexDirection: 'row',
            borderRadius: 10,
            padding: 15,
            shadowColor: '#171717',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 2,
            marginTop: 15
        },

        inputList: {
            textColor: "gray",
            backgroundColor: "#e6e6fa",
            borderRadius: 10,
            shadowColor: '#171717',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 2,
            marginTop: 15
        },
        checkboxContainer: {
            flexDirection: "row",
            marginBottom: 20,
        },
        checkbox: {
            alignSelf: "center",
        },
        label: {
            margin: 8,
        }
    }
)