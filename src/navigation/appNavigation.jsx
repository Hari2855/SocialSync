import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Login from '../screens/login';
import Home from '../screens/home';
import Profile from '../screens/profile';
import NameDetail from '../screens/nameDetail';
import AgeRange from '../screens/ageRange';
import Gender from '../screens/gender';
import GitHubLogin from '../screens/githublogin';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('Login');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#FF7E5F" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="git" component={GitHubLogin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NameDetail" component={NameDetail} />
        <Stack.Screen name="AgeRange" component={AgeRange} />
        <Stack.Screen name="Gender" component={Gender} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
