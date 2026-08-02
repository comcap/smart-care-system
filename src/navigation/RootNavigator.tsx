import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { Login } from '../screens/Login/Login';
import { Main } from '../screens/Main/Main';
import { AddRequest } from '../screens/AddRequest/AddRequest';
import { RequestDetail } from '../screens/RequestDetail/RequestDetail';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="AddRequest"
          component={AddRequest}
          options={{ headerShown: true, title: 'Add Request' }}
        />
        <Stack.Screen
          name="RequestDetail"
          component={RequestDetail}
          options={{ headerShown: true, title: 'Request Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
