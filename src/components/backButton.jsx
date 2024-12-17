import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React from 'react';
import {hp} from '../helper/common';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
      <Image source={require('../assets/back.png')} style={styles.backbtn} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: hp(1),
    borderRadius: hp(1.5),
    backgroundColor: 'rgba(0,0,0,0.07)',
  },
  backbtn: {
    height: hp(2.6),
    width: hp(2.6),
  },
});
