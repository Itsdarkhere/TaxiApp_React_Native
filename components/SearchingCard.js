import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SocialIcon } from 'react-native-elements';
import tw from "twrnc"

const SearchingCard = () => {
  return (
    <View style={tw`h-full items-center justify-center`}>
        <SocialIcon 
            loading={true}
            iconColor="black"
        />
      <Text style={tw`font-semibold text-lg`}>Connecting to a driver</Text>
    </View>
  )
}

export default SearchingCard

const styles = StyleSheet.create({})