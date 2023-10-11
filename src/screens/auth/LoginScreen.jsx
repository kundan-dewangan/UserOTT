import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { headerPayload, loginCred } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {

    const navigation = useNavigation();
    const [list, setList] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            axios.get(`${process.env.REACT_APP_URL}users`, {
                headers: headerPayload,
            })
                .then((response) => {
                    setList(response?.data);
                })
                .catch((error) => {
                    console.error('Error:', JSON.stringify(error));
                });
        } catch (err) {
            console.log("Error::", err)
        }
    }

    const handleLogin = (values) => {
        const checkAuth = list?.some((item) => (item.email === values.email) && (item.password === values.password))
        if (checkAuth) {
            navigation.navigate('Home')
        } else {
            Alert.alert("Email and password is invalid")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            value={values.password}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
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
    title: {
        fontSize: 50,
        color: '#fff', // White text color
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
        width:'80%',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff', // White text color
        textAlign: 'center',
        fontSize: 16,
    },
});

export default LoginScreen;
