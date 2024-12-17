import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../helper/common';

const Button = ({onPress, title}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF7E5F', '#FF7E5F', '#FD297B']}
        style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: hp(6.5),
    width: '100%',
    borderRadius: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: hp(2),
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: hp(2),
    fontWeight: '500',
  },
});
