import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "twrnc"

const SignUpView = () => {
    const [username, onChangeUsername] = React.useState(null);
    const [passwordOne, onChangePasswordOne] = React.useState(null);
    const [passwordTwo, onChangePasswordTwo] = React.useState(null);

  return (
    <View style={tw`h-full p-10 justify-center items-center`}>
      <Text style={tw`font-semibold text-3xl mb-5`}>Sign up</Text>

      <Text style={tw`pb-2 w-80`}>New username</Text>
      {/* Username */}
      <TextInput
      onChangeText={onChangeUsername}
      value={username}
      placeholder="Username"
      style={tw`w-80 h-15 pl-5 rounded-lg bg-gray-300`}
      />

      <Text style={tw`mt-5 w-80`}>New password</Text>
      {/* Password */}
      <TextInput 
      onChangeText={onChangePasswordOne}
      value={passwordOne}
      placeholder="Password"
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
      style={tw`w-80 h-15 mt-3 pl-5 rounded-lg bg-gray-300`}
      secureTextEntry={true}
      />

      {/* Login button */}
      {/* TODO: Add possibility to add values to backend */}
      <TouchableOpacity style={tw`mt-10 h-17 bg-black items-center justify-center w-80 rounded-lg`}>
        <Text style={tw`text-white font-semibold text-base`}>Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpView

const styles = StyleSheet.create({})