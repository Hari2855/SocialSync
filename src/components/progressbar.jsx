import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../helper/common';

const ProgressBar = ({progress}) => {
  return (
    <View style={styles.progressContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF7E5F', '#FD297B']}
        style={[styles.linearGradient, {width: progress}]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressContainer: {
    height: hp(0.8),
    backgroundColor: 'lightgray',
    borderRadius: hp(1),
    width: wp(85),
    alignSelf: 'center',
    marginTop: hp(5),
  },
  linearGradient: {
    width: wp(20),
    height: '100%',
    borderRadius: hp(1),
  },
});
