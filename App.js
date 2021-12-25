import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTab from './src/components/BottomTab';
import register from './src/screen/register';
import RegisterScreen from './src/screen/register';
import LoginScreen from './src/screen/login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
