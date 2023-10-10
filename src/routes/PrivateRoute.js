// ProtectedRoute.js

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; // or use React Context API
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = (props) => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized); // Use your state selector
  const navigation = useNavigation();
  const { Component } = props;

  useEffect(() => {
    if (!isAuthorized) {
      console.log("Not authorized>..")
      navigation.navigate('Login');
    }
  }, []);

  return Component; // Render nothing; this component is for navigation only
};

export default ProtectedRoute;
