import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { useSelector } from 'react-redux'
import { Icon } from "react-native-elements";
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native';

const OrderCard = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const navigation = useNavigation();

  return (
    <View style={tw`h-full items-center`}>
        {/* Time, point A, point B */}
        <View style={tw`flex-row`}>
            <View style={tw`w-21 mt-2 h-21 items-center justify-center bg-gray-200 rounded-lg`}>
                <Text style={tw`text-black text-lg font-bold`}>{travelTimeInformation?.distance.text}</Text>
                <Text style={tw`text-black text-xs font-semibold`}>MIN</Text>
            </View>
            <View style={tw`w-70 pl-1`}>
                <TouchableOpacity style={tw`h-10 rounded-lg w-full bg-gray-200 mt-2 justify-center`}>
                    <Text style={tw`text-black font-semibold pl-3`}>{origin.address}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`h-10 rounded-lg w-full bg-gray-200 mt-1 justify-center`}>
                    <Text style={tw`text-black font-semibold pl-3`}>{destination.address}</Text>
                </TouchableOpacity>
            </View>
        </View>
        {/* Shows price */}
        <View style={tw`flex-row mt-2 p-2 w-90 bg-gray-200 rounded-lg h-15 items-center`}>
            <Icon
            type="font-awesome-5"
            name="credit-card"
            color="black"
            />
            <View style={tw`pl-5 h-full justify-center`}>
                <Text style={tw`font-semibold text-lg`}>Price:</Text>
            </View>
        </View>
        {/* Order button */}
        <TouchableOpacity
            style={tw`flex-row justify-center items-center bg-black self-center h-15 w-90 
            z-50 rounded-xl mt-3`}
            onPress={() => {
                navigation.navigate("Search");
            }}
        >
            <Text style={tw`text-white font-semibold text-base`}>Order</Text>
        </TouchableOpacity>
    </View>
  )
}

export default OrderCard

const styles = StyleSheet.create({})