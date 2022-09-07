import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from "twrnc"
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native';

const LoginView = () => {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const navigation = useNavigation();
    let passwordRef = useRef();

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
      onPress={() => navigation.navigate("Start")}>
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