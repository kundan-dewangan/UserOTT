import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/app/HomeScreen';
import Logout from './Logout';



const Drawer = createDrawerNavigator();



  
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            drawerInactiveTintColor: 'white',
            drawerStyle: {
                backgroundColor: '#222',
                paddingTop: 20,
            },
        }}  
        >
            <Drawer.Screen name="Main" component={HomeScreen}
                options={{
                    title: 'Pinmbo',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: '#222'
                    },
                    headerShadowVisible: false,
                    drawerItemStyle: { display: 'none' }
                }} />
            <Drawer.Screen name="Home" component={HomeScreen}
                options={{
                    title: 'Home',
                    headerTitle: "Pinmbo",
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: '#222'
                    },

                }} />
            <Drawer.Screen name="My Profile" component={MyProfile}
                options={{
                    title: 'My Profile',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: '#222'
                    },

                }} />
            <Drawer.Screen name="Payment History" component={PaymentHistory}
                options={{
                    title: 'Payment History',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: '#222'
                    },

                }} />
            <Drawer.Screen name="About" component={About}
                options={{
                    title: 'About',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: '#222'
                    },

                }} />
            <Drawer.Screen name="Settings" component={Settings}
                options={{
                    title: 'Settings',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: '#222'
                    },

                }} />
            <Drawer.Screen name="Logout" component={Logout}
                options={{
                    title: 'Logout',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: '#222'
                    },

                }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({
    textLable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        verticalAlign: 'middle',
        textAlign: 'center',
        fontSize: 16,
        top: 100
    },
    image: {
        width: 500,
        height: 500,
        marginBottom: 20,
    },
})


const About = () => {
    return (<Image
        source={require('../assets/under-main.png')} // Replace with your image source
        style={styles.image}
    />)
}
const MyProfile = () => {
    return (<Image
        source={require('../assets/under-main.png')} // Replace with your image source
        style={styles.image}
    />)
}
const PaymentHistory = () => {
    return (<Image
        source={require('../assets/under-main.png')} // Replace with your image source
        style={styles.image}
    />)
}
const Settings = () => {
    return (<Image
        source={require('../assets/under-main.png')} // Replace with your image source
        style={styles.image}
    />)
}