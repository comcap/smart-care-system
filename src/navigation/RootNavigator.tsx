import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import { withSafeArea } from './withSafeArea'
import { Login } from '../screens/Login/Login'
import { Main } from '../screens/Main/Main'
import { AddRequest } from '../screens/AddRequest/AddRequest'
import { RequestDetail } from '../screens/RequestDetail/RequestDetail'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={withSafeArea(Login)} />
        <Stack.Screen name="Main" component={withSafeArea(Main)} />
        <Stack.Screen name="AddRequest" component={withSafeArea(AddRequest)} />
        <Stack.Screen
          name="RequestDetail"
          component={withSafeArea(RequestDetail)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
