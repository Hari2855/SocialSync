import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useUser} from '../context/UserContext';
import Button from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../helper/common';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {user, logoutUser} = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('User in Home screen:', user);

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (user && navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [user, navigation]);

  const handleUpdateData = () => {
    navigation.navigate('Profile', {user});
  };

  const handleLogout = () => {
    Alert.alert('Confirm', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => logoutUser(),
        style: 'destructive',
      },
    ]);
  };

  if (!user) {
    return navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.profilebtn} onPress={handleUpdateData}>
          <Image
            source={
              user
                ? user.photo
                  ? {uri: user.photo}
                  : require('../assets/user.png')
                : require('../assets/user.png')
            }
            style={styles.profilebtnimg}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image
            source={require('../assets/logout.png')}
            style={styles.logimg}
          />
        </TouchableOpacity>
      </View>

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF7E5F', '#FD297B']}
        style={styles.infoContainer}>
        <Image
          source={
            user.photo ? {uri: user.photo} : require('../assets/user.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.infoText}>
          <Text style={styles.label}>Name: </Text>
          {user.name || 'N/A'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Email: </Text>
          {user.email || 'N/A'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Phone: </Text>
          {user.phone || 'N/A'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Address: </Text>
          {user.address || 'N/A'}
        </Text>
      </LinearGradient>

      <View style={{width: '100%'}}>
        <Button title="Update Profile" onPress={handleUpdateData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  noUserContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  message: {
    fontSize: hp(2.5),
    color: '#555',
    textAlign: 'center',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp(5),
  },
  profilebtn: {
    position: 'absolute',
    left: 0,
  },
  profilebtnimg: {
    width: hp(4.8),
    height: hp(4.8),
    borderRadius: hp(1.5),
    borderWidth: 1,
    borderColor: '#FF7E5F',
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    padding: hp(1),
    borderRadius: hp(1.3),
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#FF7E5F',
  },
  logimg: {
    height: hp(2.3),
    width: hp(2.3),
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    flex: 1,
  },
  profileImage: {
    width: hp(18),
    height: hp(18),
    borderRadius: hp(3),
    marginVertical: hp(2),
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignSelf: 'center',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: hp(3),
    borderRadius: hp(1),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: hp(2.2),
    color: '#FFFFFF',
    marginBottom: hp(0.2),
  },
  label: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Home;
