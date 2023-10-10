import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { createContext, useContext, useState } from 'react';


export const loginCred = {
    email: 'kundan@gmail.com',
    password: 'Kundan@1234'
}

export const headerPayload = {
    'Content-Type': 'application/json',
};


// Create (Put) an item in AsyncStorage
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(`Data with key "${key}" stored successfully.`);
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

// Read (Get) an item from AsyncStorage
export const retrieveData = async (key) => {
    let flag = false
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(`Data with key "${key}" retrieved successfully: ${value}`);
            flag = true;
        } else {
            console.log(`No data found with key "${key}".`);
            flag = false
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        flag = false
    }
    return flag;
};

// Update an item in AsyncStorage
export const updateData = async (key, newValue) => {
    try {
        await AsyncStorage.setItem(key, newValue);
        console.log(`Data with key "${key}" updated successfully.`);
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

// Delete (Remove) an item from AsyncStorage
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`Data with key "${key}" removed successfully.`);
    } catch (error) {
        console.error('Error removing data:', error);
    }
};

// // Example usage:
// storeData('name', 'John');
// retrieveData('name'); // Should log "Data with key "name" retrieved successfully: John"
// updateData('name', 'Alice');
// retrieveData('name'); // Should log "Data with key "name" retrieved successfully: Alice"
// removeData('name');
// retrieveData('name'); // Should log "No data found with key "name"."




// Create a context instance
export const CounterContext = createContext();



// Custom hook for consuming the context
export const useCounter = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error('useCounter must be used within a CounterProvider');
    }
    return context;
};