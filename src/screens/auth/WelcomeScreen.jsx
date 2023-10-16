import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={require('../../assets/welcome.png')} // Replace with your image source
        style={styles.image}
      />

      {/* Welcome Title */}
      <Text style={styles.title}>Welcome to OTT Platform</Text>

      {/* Description */}
      <Text style={styles.description}>
      OTT platforms deliver streaming content over the internet, offering diverse entertainment choices like movies, series, and live TV
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={()=> navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222', // Dark background color
  },
  image: {
    width: 500,
    height: 300,
    // borderRadius: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff', // White text color
    marginBottom: 10,
    fontWeight:'600'
  },
  description: {
    fontSize: 16,
    color: '#aaa', // Light gray text color
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#007aff', // Dark blue button background color
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#ccc', // Gray button background color
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text color for buttons
    fontSize: 18,
  },
});

export default WelcomeScreen;
