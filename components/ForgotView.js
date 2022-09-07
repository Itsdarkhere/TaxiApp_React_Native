import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "twrnc"

const ForgotView = () => {
  return (
    <View style={tw`h-full justify-center items-center`}>
      <Text style={tw`font-semibold text-lg`}>You're shit out of luck...</Text>
    </View>
  )
}

export default ForgotView

const styles = StyleSheet.create({})