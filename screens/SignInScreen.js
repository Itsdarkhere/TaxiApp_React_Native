import { StyleSheet, Text, View } from 'react-native'
import tw from "twrnc"
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgotView from '../components/ForgotView'
import LoginView from '../components/LoginView'
import SignUpView from '../components/SignUpView'

const SignInScreen = () => {
    const Stack = createNativeStackNavigator();
  return (
    <View style={tw`h-full`}>
      <Stack.Navigator>
        <Stack.Screen 
        name="Login"
        component={LoginView}
        options={{
            headerShown: false,
        }}
        />

        <Stack.Screen 
        name="Signup"
        component={SignUpView}
        options={{
            headerShown: false,
        }}
        />

        <Stack.Screen 
        name="Forgot"
        component={ForgotView}
        options={{
            headerShown: false,
        }}
        />
      </Stack.Navigator>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})