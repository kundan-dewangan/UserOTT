// AppNavigator.js (updated)

import ProtectedRoute from './ProtectedRoute';

const AppNavigator = () => {
  return (
    <>
      <ProtectedRoute />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </>
  );
};
