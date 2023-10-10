import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Button } from 'react-native';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegistrationScreen';
import HomeScreen from './src/screens/app/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import Logout from './src/components/Logout';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';

const App = () => {
  const isAction = AsyncStorage.getItem('isAuth') || false

  const [auth] = useState(isAction)
  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth ? 'Home' : 'Welcome'} >
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerRight: () => <>
            <Logout />
          </>,
          headerTintColor: 'white',
          
          headerStyle: {
            backgroundColor: '#222'
          },
          headerRightContainerStyle: {
            marginRight: 10
          }
        }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{
          headerLeft: () => <></>,
          headerShown: false,
          // headerTransparent: true,
        }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default App

const styles = StyleSheet.create({

})
