import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required').min(2,'Full Name should be 2 character long'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
    'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character'
  ),
});

const RegisterScreen = () => {

  const [isLoading, setIsLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const handleRegister = (values) => {
    setIsLoading(true)
    try {
      axios.post(`${process.env.REACT_APP_URL}users`, values)
        .then((response) => {
          console.log("responce is::", response.data)
          Alert.alert("Registration Successfully")
          navigation.navigate('Welcome')
        })
        .catch((error) => {
          console.error('Error:', JSON.stringify(error));
        });
    } catch (err) {
      console.log("Error::", err)
    }
    setIsLoading(false)
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/register.png')} // Replace with your image source
        style={styles.image}
      /> */}
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.description}>Sign Up as a New User</Text>
      <Formik
        initialValues={{ fullName: '', email: '', password: '', role: 'user' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.alreadyHave}>Already have an account? <Text style={styles.loginCtn}>Login</Text></Text>
              </TouchableOpacity>
            </View>

          </>
        )}
      </Formik>
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
    width: 510,
    height: 310,
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    color: '#fff', // White text color
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#f2f2f2', // White text color
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff', // White input background
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontWeight: '600'
  },
  button: {
    backgroundColor: '#007aff', // Button background color
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '80%'
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    position: 'absolute',
    alignItems: 'center',
    right: 0,
  },
  alreadyHave:{
    color: 'white',
    fontSize:16,
    marginTop: 20
  },
  loginCtn: {
    color: 'blue',
  }
});

export default RegisterScreen;
