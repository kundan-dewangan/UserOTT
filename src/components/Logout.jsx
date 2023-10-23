import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useCounter } from '../utils/utils';

const Logout = () => {
    const navigation = useNavigation();
    const { logout } = useCounter();

    const logoutHandler = () => {
        logout()
        navigation.navigate('Welcome');
    }

    useEffect(() => {
        logoutHandler()
    }, [])


    return (
        <View style={styles.container}>
            {/* <Button
                title="Logout"
                onPress={logoutHandler}
                style={styles.btn}
            />
            <Text>    </Text> */}
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    btn: {
        // marginHorizontal: 20,
        // paddingHorizontal: 20,
    }
})