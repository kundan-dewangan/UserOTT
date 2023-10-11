
import React, { createContext, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export const loginCred = {
    email: 'kundan@gmail.com',
    password: 'Kundan@1234'
}

export const headerPayload = {
    'Content-Type': 'application/json',
};

// Create a context instance
export const CounterContext = createContext();

// Custom hook for consuming the context
export const useCounter = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useCounter must be used within a CounterProvider');
    }
    return context;
};