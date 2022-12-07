import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@userData', value)
    } catch (e) {
      // saving error
    }
  }

  
const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData')
      if(value !== null) {
        // value previously stored
        console.log(value);
      }
    } catch(e) {
      // error reading value
    }
  }
  
//hello storage_key
const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@userData')
    } catch(e) {
      console.log(e);
    }
  
    console.log('Done.')
  }

  export {removeValue, getData,storeData};