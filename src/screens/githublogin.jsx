import React from 'react';
import {View, Text, Button} from 'react-native';
import {authorize} from 'react-native-app-auth';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const config = {
  clientId: 'Ov23li0O0y6Ss2iZsBpj',
  clientSecret: '4840b36e3051f8b8fb32c0ed199c01d9e8a010b1',
  redirectUrl: 'https://socialsync-f0bc9.firebaseapp.com/__/auth/handler',
  scopes: ['read:user', 'user:email'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  },
};

const GitHubLogin = () => {
  const navigation = useNavigation();

  const handleGitHubLogin = async () => {
    try {
      // Step 1: OAuth with GitHub
      const authResult = await authorize(config);
      console.log('OAuth Result:', authResult);

      // Step 2: Use Firebase to authenticate with the GitHub token
      const credential = auth.GithubAuthProvider.credential(
        authResult.accessToken,
      );

      const userCredential = await auth().signInWithCredential(credential);
      console.log('User signed in with GitHub:', userCredential.user);
      navigation.navigate('git');
    } catch (error) {
      console.error('GitHub Authentication Error:', error);
    }
  };

  return (
    <View>
      <Text>GitHub Authentication</Text>
      <Button title="Sign in with GitHub" onPress={handleGitHubLogin} />
    </View>
  );
};

export default GitHubLogin;
