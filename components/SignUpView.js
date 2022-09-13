import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import tw from "twrnc"
import { useDispatch } from 'react-redux';
import { setUsername } from '../slices/userSlice';
const axios = require('axios').default;

const SignUpView = () => {
    const [username, onChangeUsername] = React.useState(null);
    const [passwordOne, onChangePasswordOne] = React.useState(null);
    const [passwordTwo, onChangePasswordTwo] = React.useState(null);
    const [usernameTaken, setUsernameTaken] = React.useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const signup = async () => {
      let res = await axios.post("http://127.0.0.1:8000/signup", {
        username: username,
        // Add a check that we have both matching passwords
        password: passwordOne,
      }, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });

      if (res?.data?.success) {
        setUsernameTaken(false);

        // In prod we would use react-native-keychain
        // to store the login, but expo managed workflow does not support native modules.
        // And since Im not going even close to prod with this, I wont spend time on it
        
        // Store username in state, to use in common address related activities
        dispatch(setUsername(username));

        navigation.navigate("Start");
      } else {
        // Display failed username field. 
        setUsernameTaken(true);
      }
    }

  return (
    <View style={tw`h-full p-10 justify-center items-center`}>
      <Text style={tw`font-semibold text-3xl mb-5`}>Sign up</Text>

      <Text style={tw`pb-2 w-80`}>New username</Text>
      {/* Username */}
      <TextInput
      onChangeText={onChangeUsername}
      value={username}
      placeholder="Username"
      autoCapitalize="none"
      style={tw`w-80 h-15 pl-5 rounded-lg bg-gray-300`}
      />

      <Text style={tw`mt-5 w-80`}>New password</Text>
      {/* Password */}
      <TextInput 
      onChangeText={onChangePasswordOne}
      value={passwordOne}
      placeholder="Password"
      autoCapitalize="none"
      style={tw`w-80 h-15 mt-2 pl-5 rounded-lg bg-gray-300`}
      secureTextEntry={true}
      passwordRules="minlength: 5;"
      />

      <Text style={tw`mt-2 w-80`}>Repeat password</Text>
      {/* Repeat password */}
      <TextInput 
      onChangeText={onChangePasswordTwo}
      value={passwordTwo}
      placeholder="Password"
      autoCapitalize="none"
      style={tw`w-80 h-15 mt-3 pl-5 rounded-lg bg-gray-300`}
      secureTextEntry={true}
      />

      {/* Login button */}
      {/* TODO: Add possibility to add values to backend */}
      <TouchableOpacity style={tw`mt-10 h-17 bg-black items-center justify-center w-80 rounded-lg`} 
      onPress={() => signup()}>
        <Text style={tw`text-white font-semibold text-base`}>Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpView

const styles = StyleSheet.create({})