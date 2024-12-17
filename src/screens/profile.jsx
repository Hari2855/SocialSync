import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useUser} from '../context/UserContext';
import Button from '../components/button';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomTextInput from '../components/customTextInput';
import firestore from '@react-native-firebase/firestore';
import {hp} from '../helper/common';
import Header from '../components/header';

const Profile = ({route, navigation}) => {
  const {user: initialUserData} = route.params;
  const {updateUser} = useUser();

  const [formData, setFormData] = useState({
    name: initialUserData?.name || '',
    email: initialUserData?.email || '',
    phone: initialUserData?.phone || '',
    address: initialUserData?.address || '',
    photo: initialUserData?.photo || '',
  });

  useEffect(() => {
    if (initialUserData) {
      setFormData({
        name: initialUserData?.name || '',
        email: initialUserData?.email || '',
        phone: initialUserData?.phone || '',
        address: initialUserData?.address || '',
        photo: initialUserData?.photo || '',
      });
    }
  }, [initialUserData]);

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0].uri;
        setFormData({...formData, photo: selectedImage});
      }
    });
  };

  const handleSave = async () => {
    try {
      const updatedData = {...formData};
      updateUser(updatedData);
      await firestore()
        .collection('users')
        .doc(initialUserData.id)
        .update(updatedData);
      console.log('Updated user data:', updatedData);

      navigation.goBack();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Header title="Edit Profile" />
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={{uri: formData.photo}} style={styles.profileImage} />
        </TouchableOpacity>

        <CustomTextInput
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
          placeholder="Name"
        />

        <CustomTextInput
          value={formData.email}
          onChangeText={text => setFormData({...formData, email: text})}
          placeholder="Email"
          keyboardType="email-address"
        />

        <CustomTextInput
          value={formData.phone}
          onChangeText={text => setFormData({...formData, phone: text})}
          placeholder="Phone"
          keyboardType="phone-pad"
        />

        <CustomTextInput
          value={formData.address}
          onChangeText={text => setFormData({...formData, address: text})}
          placeholder="Address"
        />
      </View>

      <View style={{width: '100%'}}>
        <Button title="Update" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(2),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailContainer: {
    width: '95%',
  },
  profileImage: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(2.5),
    marginVertical: hp(5),
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#FF7E5F',
  },
});

export default Profile;
