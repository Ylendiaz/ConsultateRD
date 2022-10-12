import React from 'react';
import {TouchableOpacity, View, Text, Pressable } from 'react-native';
import styles from './BtnStyles';

const StyledButton = (props) => {

  const { content, bgColor, onPress, txtColor, radius } = props;

  return (

      <TouchableOpacity 
      style={[styles.button, { backgroundColor: bgColor}, {borderRadius: parseInt(radius) }]}
      onPress={() => onPress()}
      >
        <Text style={[styles.text, { color: txtColor }]}>{content}</Text>

      </TouchableOpacity>


  );
};

export default StyledButton;