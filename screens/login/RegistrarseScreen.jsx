import React, { Component, useState } from "react";
import { StyleSheet, Button, Text, View, TextInput, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SwitchSelector from "react-native-switch-selector";
import SelectList from 'react-native-dropdown-select-list';

const RegistrarseScreen = ({ navigation }) => {

    //Para el Switch Selector
    const [showHide, setShowHide] = useState(false);

    //Para el dropdown
    const [selected, setSelected] = useState("");
    const data = [{key:'1',value:'Masculino'}, {key:'2', value:'Femenino'}];

    return <>
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{width: '100%'}}>
            <View style={{width:'100%', alignItems:'center'}}>
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
                    ?
                    <View style= {styles.inputsContainer}>
                        <TextInput placeholderTextColor={'gray'} placeholder="Nombres" label = "Nombres" style={styles.input} ></TextInput>
                        <TextInput placeholderTextColor={'gray'} placeholder="Apellidos" label = "Apellidos" style={styles.input} ></TextInput>
                        <TextInput placeholderTextColor={'gray'} placeholder="Teléfono" label = "Teléfono" keyboardType="numeric" style={styles.input} ></TextInput>
                        <View style={{flex: 1, width:'100%', alignItems:'center', paddingHorizontal:72}}>
                            <SelectList 
                                setSelected={setSelected} 
                                data={data}  
                                search={false} 
                                
                                boxStyles={styles.inputList} //override default styles
                                placeholder='Sexo'/>
                        </View>
                        <TextInput placeholderTextColor={'gray'} placeholder="Fecha de Nacimiento" label = "FechaNacimiento" style={styles.input} ></TextInput>
                        
                        {/* <Text style={styles.inputText}>Correo Electronico: </Text> */}
                        <TextInput placeholderTextColor={'gray'} placeholder="Email" label = "Email" keyboardType="email-address" style={styles.input} ></TextInput>
                        {/* <Text style={styles.inputText}>Contraseña: </Text> */}
                        <TextInput placeholderTextColor={'gray'} placeholder="Contraseña" label = "Password" secureTextEntry={true} style={styles.input} ></TextInput>
                        <TextInput placeholderTextColor={'gray'} placeholder="Repite Contraseña" label = "Password" secureTextEntry={true} style={styles.input} ></TextInput>
                    </View>

                    :
                    <View style= {styles.inputsContainer}>
                        <TextInput placeholderTextColor={'gray'} placeholder="Nombres" label = "Nombres" style={styles.input} ></TextInput>
                        <TextInput placeholderTextColor={'gray'} placeholder="Apellidos" label = "Apellidos" style={styles.input} ></TextInput>
                        <TextInput placeholderTextColor={'gray'} placeholder="Teléfono" label = "Teléfono" keyboardType="numeric" style={styles.input} ></TextInput>
                        <View style={{flex: 1, width:'100%', alignItems:'center', paddingHorizontal:72}}>
                            <SelectList 
                                setSelected={setSelected} 
                                data={data}  
                                search={false} 
                                
                                boxStyles={styles.inputList} //override default styles
                                placeholder='Sexo'/>
                        </View>
                        <TextInput placeholderTextColor={'gray'} placeholder="Fecha de Nacimiento" label = "FechaNacimiento" style={styles.input} ></TextInput>
                        
                        {/* <Text style={styles.inputText}>Correo Electronico: </Text> */}
                        <TextInput placeholderTextColor={'gray'} placeholder="Email" label = "Email" keyboardType="email-address" style={styles.input} ></TextInput>
                        {/* <Text style={styles.inputText}>Contraseña: </Text> */}
                        <TextInput placeholderTextColor={'gray'} placeholder="Contraseña" label = "Password" secureTextEntry={true} style={styles.input} ></TextInput>
                        <TextInput placeholderTextColor={'gray'} placeholder="Repite Contraseña" label = "Password" secureTextEntry={true} style={styles.input} ></TextInput>
                        <View style={{flex: 1, width:'100%', alignItems:'center', paddingHorizontal:72}}>
                            <SelectList 
                                setSelected={setSelected} 
                                data={data}  
                                search={false} 
                                
                                boxStyles={styles.inputList} //override default styles
                                placeholder='Centro Médico'/>
                        </View>
                        <View style={{flex: 1, width:'100%', alignItems:'center', paddingHorizontal:72}}>
                            <SelectList 
                                setSelected={setSelected} 
                                data={data}  
                                search={false} 
                                boxStyles={styles.inputList} //override default styles
                                placeholder='Especialidad'/>
                        </View>
                    </View>}
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

        inputsContainer:{
            alignItems:'center',
            width: '100%',
            justifyContent: 'center',
            marginTop: 30,
            //backgroundColor: "blue",
        },
        
        // inputText:{
        //     marginTop: 20
        // },

        input: {
            textColor: "gray",
            width: "80%", 
            height: 50,
            backgroundColor:"#e6e6fa",
            justifyContent:'center',
            flexDirection:'row',
            borderRadius:10,
            padding:15,
            shadowColor: '#171717',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 2,
            marginTop:15
        },

        inputList: {
            textColor: "gray",
            width:'80%',
            height: 50,
            backgroundColor:"#e6e6fa",
            alignItems:'center',
            borderRadius:10,
            shadowColor: '#171717',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 2,
            marginTop:15
        }
    }
)