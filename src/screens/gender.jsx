import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../helper/common';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/button';
import {gendercategory} from '../contants';
import ProgressBar from '../components/progressbar';

const Gender = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(2);

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar />

      {/* Quotes Section */}
      <View style={styles.quotesContainer}>
        <Text style={styles.questionText}>
          Choose The <Text style={styles.identityText}>Identity </Text>That
        </Text>
        <Text style={styles.questionText}>
          Feels Right For <Text style={styles.callText}>You?</Text>
        </Text>
        <Image
          source={require('../assets/linevector.png')}
          style={styles.vectorimage}
          resizeMode="contain"
        />
      </View>

      {/* Gender Categories */}
      <View style={styles.genderContainer}>
        {gendercategory.map(category => (
          <Pressable
            key={category.id}
            onPress={() => setSelectedId(category.id)}>
            {selectedId === category.id ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF7E5F', '#FF7E5F', '#FD297B']}
                style={styles.genderbtn}>
                <Text style={[styles.genderText, styles.selectedText]}>
                  {category.name}
                </Text>
                <Image
                  source={category.selected}
                  resizeMode="contain"
                  style={styles.selectedicon}
                />
              </LinearGradient>
            ) : (
              <View style={[styles.genderbtn, styles.unselectedBtn]}>
                <Text style={styles.genderText}>{category.name}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Fotter Button */}
      <Button title="Continue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  quotesContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: hp(3.8),
    fontWeight: '400',
    color: '#4D4D4D',
  },
  identityText: {
    color: '#F7B174',
    fontWeight: '700',
  },
  callText: {
    color: '#4D4D4D',
    fontWeight: '700',
  },
  vectorimage: {
    height: hp(10),
    width: hp(8),
    alignSelf: 'flex-end',
    bottom: hp(4.5),
    marginRight: wp(11),
  },
  genderContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: hp(5),
  },
  genderbtn: {
    marginVertical: hp(0.7),
    borderRadius: hp(5),
    width: '100%',
    height: hp(6.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    elevation: 3,
  },
  unselectedBtn: {
    backgroundColor: '#F0F0F0',
  },
  genderText: {
    color: '#4F5E7B',
    fontSize: hp(2),
    fontWeight: '500',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  selectedicon: {
    height: hp(3),
    width: hp(3),
  },
});

export default Gender;
