// CustomTextInput.js
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={'#000000'}
      secureTextEntry={secureTextEntry} // Optional for password fields
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default CustomTextInput;
