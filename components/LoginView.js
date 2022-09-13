import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from "twrnc"
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
const axios = require('axios').default;
import { useDispatch } from 'react-redux';
import { setUsername } from '../slices/userSlice';
import { CommonActions } from '@react-navigation/native';

const LoginView = () => {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    let passwordRef = useRef();

    const login = async () => {
      let res = await axios.post("http://127.0.0.1:8000/login", {
        username: username,
        password: password,
      }, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });

      if (res?.data?.success) {
        // In prod we would use react-native-keychain
        // to store the login, but expo managed workflow does not support native modules.
        // And since Im not going even close to prod with this, I wont spend time on it
        
        // Store username in state, to use in common address related activities
        dispatch(setUsername(username));
        // This resets the stack, so we cant swipe back to splash screen
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [
                  { name: "Start"},
              ]
          })
        );
      } else {
        // Reset fields on failed attempt
        onChangeUsername(null)
        onChangePassword(null);
        
      }
    }

  return (
    <View style={tw`h-full p-10 justify-center items-center`}>
      <Text style={tw`font-semibold text-3xl mb-5`}>Login</Text>

      {/* Username */}
      <TextInput
      onChangeText={onChangeUsername}
      value={username}
      placeholder="Username"
      style={tw`w-80 h-15 pl-5 rounded-lg bg-gray-300`}
      autoCapitalize="none"
      onSubmitEditing={() => {
        if (username) {
            passwordRef.focus();
        }
      }}
      />

      {/* Password */}
      <TextInput 
      ref={(input) => {
        passwordRef = input;
      }}
      onChangeText={onChangePassword}
      value={password}
      placeholder="Password"
      style={tw`w-80 h-15 mt-3 pl-5 rounded-lg bg-gray-300`}
      secureTextEntry={true}
      autoCapitalize="none"
      />

      {/* Forgot password 'link' */}
      <TouchableOpacity style={tw`w-80 mt-5`} onPress={() => {
        navigation.navigate("Forgot");
      }}>
            <Text style={tw`text-black`}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login button */}
      {/* TODO: Add possibility to check values on backend */}
      <TouchableOpacity style={tw`mt-10 h-17 bg-black items-center justify-center w-80 rounded-lg`} 
      onPress={() => login()}>
        <Text style={tw`text-white font-semibold text-base`}>Login</Text>
      </TouchableOpacity>

      {/* Create account ... */}
      <View style={tw`flex-row mt-5 items-center`}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity style={styles.bb} onPress={() => {
            navigation.navigate("Signup")
        }}>
            <Text style={tw`text-black`}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginView

const styles = StyleSheet.create({
    bb: {
        borderBottomColor: "black",
        borderBottomWidth: 2,
    }
})