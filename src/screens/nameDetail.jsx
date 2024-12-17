import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {hp, wp} from '../helper/common';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/button';
import ProgressBar from '../components/progressbar';

const NameDetail = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar progress={wp(40)} />

      <ScrollView>
        <View style={styles.seccontainer}>
          <View style={{padding: hp(7.5)}} />

          {/* Quotes Section */}
          <View style={styles.quotesContainer}>
            <Text style={styles.subText}>Let’s get to know each other</Text>
            <Text style={styles.questionText}>
              <Text style={styles.whatText}>What </Text>
              <Text style={styles.callText}>Should We Call</Text> You?
            </Text>
            <Image
              source={require('../assets/linevector.png')}
              style={styles.vectorimage}
              resizeMode="contain"
            />
          </View>

          <View style={{padding: hp(3)}} />
          {/* Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#616161"
          />

          <View style={{flex: 1}} />

          {/*Fotter Button */}
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Button
              title="Continue"
              onPress={() => navigation.navigate('AgeRange')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
  },
  seccontainer: {
    flex: 1,
    minHeight: '100%',
    minWidth: '100%',
  },
  quotesContainer: {
    alignItems: 'center',
  },
  subText: {
    fontSize: hp(2.2),
    fontWeight: '500',
    color: '#6F6E6D',
    textAlign: 'center',
  },
  questionText: {
    fontSize: hp(3.8),
    fontWeight: '700',
    color: '#000000',
  },
  whatText: {
    color: '#F7B174',
  },
  callText: {
    color: '#4D4D4D',
    fontWeight: '400',
  },
  vectorimage: {
    height: hp(10),
    width: hp(8),
    alignSelf: 'flex-end',
    bottom: hp(4.5),
    marginRight: wp(6.5),
  },
  input: {
    height: hp(6.5),
    width: '90%',
    alignSelf: 'center',
    borderRadius: hp(5),
    borderWidth: 1,
    borderColor: '#D3D8E0',
    paddingLeft: hp(2),
    fontSize: 16,
    fontWeight: '500',
    color: '#616161',
    marginBottom: hp(10),
  },
});

export default NameDetail;
