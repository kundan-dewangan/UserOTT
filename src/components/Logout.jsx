import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

const Logout = () => {
    const navigation = useNavigation();

    const logoutHandler = () => {
        // AsyncStorage.clear();
        AsyncStorage.setItem('isAuth', JSON.stringify(false)).then(() => {
            console.log('Data stored successfully');
            navigation.navigate('Welcome')
        }).catch((error) => {
            console.error('Error storing data:', error);
        });
    
    }
    return (
        <Button
            title="Logout"
            onPress={() => logoutHandler()}
            style={styles.btn}
        />
    )
}

export default Logout

const styles = StyleSheet.create({
    btn: {
        marginHorizontal: 20,
        right: 20
    }
})