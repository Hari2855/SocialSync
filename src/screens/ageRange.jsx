import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../helper/common';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/button';
import {birthRanges} from '../contants';
import ProgressBar from '../components/progressbar';

const AgeRange = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(2);

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar progress={wp(60)} />

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>
          Great, Let's make Mynd all about you!
        </Text>
        <Text style={styles.questionText}>
          How long have you been rocking this{' '}
          <Text style={styles.highlightedText}>World? 🎂</Text>
        </Text>
      </View>

      {/* Birth Ranges */}
      <View style={styles.optionsContainer}>
        {birthRanges.map(range => (
          <Pressable
            key={range.id}
            onPress={() => setSelectedId(range.id)}
            style={[
              styles.optionButton,
              selectedId === range.id && styles.selectedButton,
            ]}>
            {selectedId === range.id ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF7E5F', '#FF7E5F', '#FD297B']}
                style={styles.optionGradient}>
                <Text style={styles.selectedText}>{range.label}</Text>
                <Image
                  source={range.selected}
                  resizeMode="contain"
                  style={styles.selectedicon}
                />
              </LinearGradient>
            ) : (
              <Text style={styles.optionText}>{range.label}</Text>
            )}
          </Pressable>
        ))}
      </View>

      {/* Footer Button */}
      <Button title="Continue" onPress={() => navigation.navigate('Gender')} />
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
  titleContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: hp(2.2),
    color: '#6E7C87',
    marginBottom: hp(1),
  },
  questionText: {
    fontSize: hp(3.8),
    fontWeight: '400',
    color: '#4D4D4D',
    textAlign: 'center',
  },
  highlightedText: {
    color: '#F7B174',
    fontWeight: '700',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp(5),
  },
  optionButton: {
    width: '48%',
    marginVertical: hp(1),
    borderRadius: hp(5),
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(6.5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    paddingHorizontal: hp(2),
  },
  optionGradient: {
    width: '100%',
    height: '100%',
    borderRadius: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    elevation: 3,
  },
  optionText: {
    fontSize: hp(2.2),
    color: '#4F5E7B',
    fontWeight: '500',
  },
  selectedButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  selectedText: {
    fontSize: hp(2.2),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  selectedicon: {
    height: hp(3),
    width: hp(3),
  },
});

export default AgeRange;
