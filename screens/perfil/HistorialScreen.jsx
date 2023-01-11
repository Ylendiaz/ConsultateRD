import React, { Component, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import SwitchSelector from "react-native-switch-selector";

const HistorialScreen = ({ navigation, route }) => {

  const { loginId, rol } = route.params.userData;

  let appDoctorID = 0;//here we're going to save the pacient id of the user that is logged in (to fetch appointments informacion)
  let appPacienteID = 0;//here we're going to save the pacient id of the user that is logged in (to fetch appointments informacion)


  // ----------------Consumir API tabla Usuario Pacientes-----------------
  const [apidataPaciente, apisetDataPaciente] = useState([]);

  useEffect(() => {
    //call fetchData passing the GET request url
    fetchData('https://consultaterd.azurewebsites.net/api/UsuarioPacientes');//pacient users
  }, []);

  const fetchData = async (url) => {
    try {

      const response = await fetch(url); //get the request response
      const json = await response.json(); // transform it to json format
      apisetDataPaciente(json);
      const getid = json.filter(x => x.loginId == loginId).map(y => { return y.pacienteId }); // get the pacient id where the loginId's match
      appPacienteID = getid[0]; // save the pacient id found in a global variable

    } catch (error) {
      console.error(error); // otherwise there was an error in the request
    }
  };


  // ----------------Consumir API tabla Usuario Doctores-----------------
  const [apidataDoctores, apisetDoctores] = useState([]);

  useEffect(() => {
    //call fetchData passing the GET request url
    fetchDataDoctor('https://consultaterd.azurewebsites.net/api/UsuarioDoctores');//doctor users
  }, []);

  const fetchDataDoctor = async (url) => {
    try {

      const response = await fetch(url); //get the request response
      const json = await response.json(); // transform it to json format
      apisetDoctores(json);
      const getid = json.filter(x => x.loginId == loginId).map(y => { return y.doctorId }); // get the pacient id where the loginId's match
      appDoctorID = getid[0]; // save the pacient id found in a global variable

    } catch (error) {
      console.error(error); // otherwise there was an error in the request
    }
  };

  // ----------------Consumir API tabla Centro Medico-----------------
  const [apidataCentros, apisetDataCentros] = useState([]);

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


  const refresh = useCallback(() => {
    // Perform any refresh logic here
    fetchAppointments('https://consultaterd.azurewebsites.net/api/CitasAgendadas'); // appointments
  }, []);

  const [apidataCitasDoctor, apisetDataCitasDoctor] = useState([]);
  const [apidataCitasPaciente, apisetDataCitasPaciente] = useState([]); //useState to save the appointments of this specific

  useEffect(() => {
    //call fetchData passing the GET request url
    fetchAppointments('https://consultaterd.azurewebsites.net/api/CitasAgendadas'); // appointments

    const interval = setInterval(refresh, 5000); // refresh the screen every 5 second

    return () => clearInterval(interval);
  }, [refresh]);

  const fetchAppointments = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const newarray = json.filter(item => item.doctorId == appDoctorID && item.estadoCitas == false);
      apisetDataCitasDoctor(newarray);
      const appointmentsArray = json.filter(item => item.pacienteId == appPacienteID && item.estadoCitas == false); //add the appointments with this pacientID to the array
      apisetDataCitasPaciente(appointmentsArray); // save it in the useState variable
    } catch (error) {
      console.error(error);
    }
  };


  //Para el Switch Selector
  const [showHide, setShowHide] = useState(false);



  return (

    <ScrollView style={{ backgroundColor: '#509F8C', height: "100%" }} >

      {rol !== true
        ? //Tus Citas
        <View style={{ width: '70%', alignItems: 'center', alignSelf: 'center', marginBottom: 15, }}>
          <View style={styles.selectView}>
            <SwitchSelector
              initial={0}
              textColor={'#8B8585'}
              selectedColor={'#FFF'}
              backgroundColor={'#232020'}
              buttonColor={'#232020'}
              borderColor={'#509F8C'}
              height={45}
              hasPadding
              onPress={value => setShowHide(value)}
              options={[
                { label: "Citas Finalizadas", value: false }]}
            >
            </SwitchSelector>
          </View>
        </View>
        : //Con Pacientes
        <View style={{ width: '95%', alignItems: 'center', alignSelf:'center', marginBottom: 10, }}>
          <View style={styles.selectView}>
            <SwitchSelector
              initial={0}
              textColor={'#8B8585'}
              selectedColor={'white'}
              backgroundColor={'#E7E7E7'}
              buttonColor={'#232020'}
              borderColor={'#509F8C'}
              height={45}
              bold
              onPress={value => setShowHide(value)}
              options={[
                { label: "Tus Citas", value: false },
                { label: "Con Pacientes", value: true }]}
            >
            </SwitchSelector>
          </View>
        </View>
      }

      {
        showHide !== true
          ? //Tus Citas
          apidataCitasPaciente.map((item, index) => {
            return (
              <TouchableOpacity key={item.citaId} style={styles.listView} >
                <View style={styles.listViewContent}>
                  <View style={styles.listTextView}>
                    <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                      <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#0C7A28", }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>Cita</Text>
                      </View>
                      <Text style={{ marginHorizontal: 5, }}></Text>
                      <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#900707", }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>Finalizada</Text>
                      </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: "space-around", marginBottom: 10, borderColor: 'rgba(0, 0, 0, 0.25)' }}>
                      <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citasHoraInicio} - {item.citaHoraCierre}</Text>
                      <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citaFecha}</Text>
                    </View>
                    <Text style={{ color: "black", marginBottom: 10 }}>{apidataDoctores.filter(x => x.doctorId == item.doctorId).map(y => { return y.nombreDoctor + " " + y.apellidoDoctor })}</Text>
                    <Text>{apidataCentros.filter(x => x.key == item.centroMedicoId).map(y => { return y.value })}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
          : //Con Pacientes
          apidataCitasDoctor.map((item, index) => {
            return (
              <TouchableOpacity key={item.citaId} style={styles.listView} >
                <View style={styles.listTextView}>
                  <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                    <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#2B95FF", }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>Con Paciente</Text>
                    </View>
                    <Text style={{ marginHorizontal: 5, }}></Text>
                    <View style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: "#900707", }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 30, marginVertical: 5, }}>Finalizada</Text>
                    </View>
                  </View>
                  <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: "space-around", marginBottom: 10, borderColor: 'rgba(0, 0, 0, 0.25)' }}>
                    <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citasHoraInicio} - {item.citaHoraCierre}</Text>
                    <Text style={{ color: "black", marginBottom: 10, fontWeight: "bold" }} >{item.citaFecha}</Text>
                  </View>
                  <Text style={{ color: "black", marginBottom: 10 }}>{apidataPaciente.filter(x => x.pacienteId == item.pacienteId).map(y => { return y.nombrePaciente + " " + y.apellidoPaciente })}</Text>
                  <Text>{apidataCentros.filter(x => x.key == item.centroMedicoId).map(y => { return y.value })}</Text>
                </View>
              </TouchableOpacity>
            )
          })
      }


    </ScrollView >

  );
};


export default HistorialScreen;

const styles = StyleSheet.create({
  selectView: {
    width: '80%',
    alignItems: 'center',
    marginTop: 30
  },

  listView: {
    marginHorizontal: 25,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 2
  },

  listTextView: {
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 15
  },

});