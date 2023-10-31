import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { headerPayload } from '../../utils/utils';
import axios from 'axios';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPasswordScreen = () => {

    const navigation = useNavigation();
    const [list, setList] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [isPass, setIsPass] = useState([])

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
        const checkAuth = list?.filter((item) => (item.email === values.email))
        if (checkAuth.length) {
            setIsCorrect(true)
            setIsPass(checkAuth)
        } else {
            Alert.alert("Email not found")
        }
    };

    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../../assets/login.png')} // Replace with your image source
                style={styles.image}
            /> */}
            <Text style={styles.title}>Forget Password</Text>
            <Text style={styles.description}>You will receive instructions for reseting your password.</Text>
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

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Forget Password</Text>
                        </TouchableOpacity>

                        {isCorrect && <Text style={styles.passShow}>Your password is : {isPass[0]?.password}</Text>}

                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                                <Text style={styles.alreadyHave}>Go to <Text style={styles.loginCtn}>Login</Text></Text>
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
        fontSize: 36,
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
    },
    passShow:{
        color: 'white',
        fontSize: 22,
        marginTop: 20
    }
});

export default ForgetPasswordScreen;
