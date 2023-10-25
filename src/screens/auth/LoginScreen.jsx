import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { headerPayload, useCounter } from '../../utils/utils';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {

    const navigation = useNavigation();
    const [list, setList] = useState([])
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useCounter();

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
            login()
            navigation.navigate('Home')
        } else {
            Alert.alert("Email and password is invalid")
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/login.png')} // Replace with your image source
                style={styles.image}
            />
            <Text style={styles.title}>Login</Text>
            <Text style={styles.description}>Please sign in to continue</Text>
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

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')} >
                                <Text style={styles.alreadyHave}><Text style={styles.loginCtn}>Forget Password!</Text></Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register')}
                            >
                                <Text style={styles.alreadyHave}>Don't have an account? <Text style={styles.loginCtn}>Sign Up</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View >
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
        width: 300,
        height: 300,
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
    buttonText: {
        color: '#fff', // White text color
        textAlign: 'center',
        fontSize: 16,
    },
    alreadyHave: {
        color: 'white',
        fontSize: 16,
        marginTop: 20
    },
    loginCtn: {
        color: 'blue',
    }
});

export default LoginScreen;
