import React from 'react';
import { TouchableOpacity, View, Text, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StyledButtonIcon = (props) => {

  const { content, bgColor, onPress } = props;

  return (

    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={() => onPress()}>

      <View style={{ width: "80%", alignItems: 'center' }} >
        <Text style={[styles.text]}>{content}</Text>
      </View>

      <AntDesign style={{ alignSelf: "center" }} name="right" size={14} color="#B1B1C1" />

    </TouchableOpacity>


  );
};

export default StyledButtonIcon;

const styles = StyleSheet.create({

  button: {
    borderRadius: 99,
    flexDirection: 'row',
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    justifyContent: 'center',
  }
});