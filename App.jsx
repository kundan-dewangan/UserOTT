import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegistrationScreen';
import HomeScreen from './src/screens/app/HomeScreen';
import Logout from './src/components/Logout';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import DetailScreen from './src/screens/app/DetailScreen';
import { AuthContext } from './src/context/AuthContext';

const App = () => {
  const Stack = createStackNavigator();
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };


  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Welcome'} >
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerRightContainerStyle: {
              marginRight: 20
            },
            headerLeft: null,
            headerRight: () =>  <Logout />,
            headerTintColor: 'white',

            headerStyle: {
              backgroundColor: '#222'
            },

          }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{
            headerRight: () => <>
              <Logout />
            </>,
            headerShown: false,
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
    </AuthContext.Provider>
  )
}

export default App

const styles = StyleSheet.create({

})
