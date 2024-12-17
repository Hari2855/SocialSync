import {View, Text} from 'react-native';
import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {UserProvider} from './context/UserContext';
import Profile from './screens/profile';

export default function App() {
  return (
    <UserProvider>
      <AppNavigation>
        <Text>App</Text>
      </AppNavigation>
    </UserProvider>
  );
}
