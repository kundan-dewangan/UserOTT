import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { loginCred } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            await fetch(`${process.env.REACT_APP_URL}users`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    setList(data);
                })
                // .catch((err) => toast.error("Something wrong::" + err))
        } catch (err) {
            // toast.error("Something wrong::" + err);
            console.log("Error::", err)
        }
    }
    


    const handleLogin = (values) => {
        // Perform login logic here
        console.log('Login:', values);
        console.log('list:', list);

        const checkAuth  = list?.some((item) => (item.email === values.email) && (item.password === values.password))
        console.log("what is value:::", checkAuth)
        if (checkAuth) {
            AsyncStorage.setItem('isAuth', JSON.stringify(true))
            navigation.navigate('Home')
            console.log("Success::")
        } else {
            // toast.error("Invalid email and password")
            console.log("Error::")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Formik
                initialValues={{ email: 'kundan@gmail.com', password: 'Kundan@1234' }}
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

            <Button
                title="Go to Register"
                onPress={() => navigation.navigate('Register')}
                style={{ flex: 1 }}
            />
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
        fontSize: 24,
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
    },
    button: {
        backgroundColor: '#007aff', // Button background color
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff', // White text color
        textAlign: 'center',
        fontSize: 16,
    },
});

export default LoginScreen;
