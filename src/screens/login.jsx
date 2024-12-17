import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../helper/common';
import GradientText from '../components/gradientText';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '../components/progressbar';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useUser} from '../context/UserContext';
import {authorize} from 'react-native-app-auth';
import {
  GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  REDIRECT_URL,
} from '@env';

const config = {
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  redirectUrl: REDIRECT_URL,
  scopes: ['read:user', 'user:email'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  },
};

const Login = () => {
  const navigation = useNavigation();
  const {updateUser} = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        const userData = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        updateUser(userData);
        navigation.navigate('Home');
      }
    });

    return unsubscribe;
  }, []);

  // Function to handle Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      await GoogleSignin.signOut();

      const signInResult = await GoogleSignin.signIn();
      console.log(
        'Full Google Sign-In Result:',
        JSON.stringify(signInResult, null, 2),
      );

      const idToken = signInResult.idToken || signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;

      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      const response = await fetch(
        'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,genders,birthdays,phoneNumbers,addresses',
        {
          headers: {
            Authorization: `Bearer ${signInResult.accessToken}`,
          },
        },
      );

      const profile = await response.json();
      console.log('Full Google Profile:', profile);

      const fullUserData = {
        ...userData,
        gender: profile.genders?.[0]?.value || 'N/A',
        birthday: profile.birthdays?.[0]?.date || null,
        phone: profile.phoneNumbers?.[0]?.value || 'N/A',
        address: profile.addresses?.[0]?.formattedValue || 'N/A',
        fullName: profile.names?.[0]?.displayName || user.displayName,
      };
      console.log('Full User Data:', fullUserData);

      updateUser(fullUserData);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      setLoading(false);
      Alert.alert('Google Login Error', error.message);
    }
  };

  // GitHub Login
  const handleGitHubLogin = async () => {
    try {
      const authResult = await authorize(config);
      console.log('OAuth Result:', authResult);

      const credential = auth.GithubAuthProvider.credential(
        authResult.accessToken,
      );
      const userCredential = await auth().signInWithCredential(credential);
      const user = userCredential.user;

      const userData = {
        id: user.uid,
        name: user.displayName || user.providerData[0]?.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${authResult.accessToken}`,
        },
      });

      const profile = await response.json();
      console.log('Full GitHub Profile:', profile);

      const fullUserData = {
        ...userData,
        location: profile.location || 'N/A',
        bio: profile.bio || 'N/A',
        followers: profile.followers || 0,
        following: profile.following || 0,
      };
      console.log('Full User Data:', fullUserData);

      updateUser(fullUserData);

      Alert.alert('GitHub Login', 'Successfully logged in!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('GitHub Authentication Error:', error);
      Alert.alert('GitHub Login Error', error.message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar progress={wp(20)} />

      {/* Quotes Section */}
      <View style={styles.quotesContainer}>
        <GradientText
          text="Begin Your"
          gradientColors={['#FF7E5F', '#FD297B']}
          fontSize={5.5}
          fontWeight="normal"
        />
        <GradientText
          text="Mindful Journey"
          gradientColors={['#FF7E5F', '#FD297B']}
          fontSize={5.5}
          fontWeight="bold"
        />
        <Text style={styles.subText}>
          Log In Or Sign Up To Begin Your Journey With Personalized, Human-Like
          Wellness Support
        </Text>
      </View>

      {/* Buttons Section */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF7E5F', '#FF7E5F', '#FD297B']}
        style={styles.buttonContainer}>
        <View style={styles.progressdotcontainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        <Pressable style={styles.socialButton} onPress={handleGitHubLogin}>
          <Image
            source={require('../assets/github.png')}
            style={styles.socialicon}
          />
          <Text style={styles.socialButtonText}>Continue With Github</Text>
        </Pressable>

        <Pressable
          style={[styles.socialButton, styles.googleButton]}
          onPress={handleGoogleLogin}>
          <Image
            source={require('../assets/googlelogo.png')}
            style={styles.socialicon}
          />
          <Text style={[styles.socialButtonText, styles.googleText]}>
            Continue With Google
          </Text>
        </Pressable>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <Text
          style={styles.agreeText}
          onPress={() => navigation.navigate('NameDetail')}>
          I agree to <Text style={styles.linkText}>Privacy Policy</Text> &{' '}
          <Text style={styles.linkText}>Terms of Service</Text>
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  quotesContainer: {
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  subText: {
    fontSize: hp(2),
    color: '#7F7F7F',
    textAlign: 'center',
    marginTop: hp(0.5),
    lineHeight: hp(2.5),
  },
  buttonContainer: {
    borderTopLeftRadius: hp(3),
    borderTopRightRadius: hp(3),
    padding: hp(4),
    alignItems: 'center',
  },
  progressdotcontainer: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    backgroundColor: '#E99377',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: hp(5),
    width: wp(20),
    marginBottom: hp(2),
  },
  progressDot: {
    width: hp(1),
    height: hp(1),
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
    borderRadius: hp(0.9),
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: hp(2),
    width: wp(85),
    borderRadius: hp(5),
    marginVertical: hp(1),
  },
  googleButton: {
    backgroundColor: '#FFF',
  },
  socialButtonText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 15,
  },
  googleText: {
    color: '#333',
  },
  socialicon: {
    height: hp(3),
    width: hp(3),
    marginRight: hp(1.3),
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: hp(1),
  },
  orText: {
    color: '#FFFFFF',
    fontSize: hp(1.6),
    fontWeight: '500',
    textAlign: 'center',
  },
  agreeText: {
    color: '#ffffff',
    fontSize: hp(1.4),
    textAlign: 'center',
  },
  linkText: {
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
});

export default Login;
