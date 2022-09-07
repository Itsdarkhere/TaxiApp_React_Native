import { FlatList, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from "react-native-elements";
import tw from "twrnc"
import React from 'react'

const WhereCard = () => {
    const navigation = useNavigation();
    const fillerDestinations = [
        {
            id: 1,
            address: "Tehtaankatu 12",
        },
        {
            id: 2,
            address: "Iso Robertinkatu 10",
        },
        {
            id: 3,
            address: "Lönnrotinkatu 12",
        },
        {
            id: 4,
            address: "Linnanmäki",
        },
    ]

  return (
    <View style={tw`h-full bg-white`}>
        <TouchableOpacity 
        style={tw`flex-row justify-center items-center bg-gray-300 self-center h-15 w-90 
        z-50 rounded-xl mt-5`}
        onPress={() => navigation.navigate('Navigate')}
        >
            <Icon
            type="font-awesome-5"
            name="car-side"
            color="black"

            />
            <Text style={tw`pl-2 text-black font-semibold text-base`}>Where to ?</Text>
        </TouchableOpacity>
        {/* Previously used locations */}
        <FlatList
        data={fillerDestinations}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({item: { address }}) => (
            <TouchableOpacity style={tw`bg-gray-200 w-2/5 h-15 ml-4 rounded-lg mt-4 justify-center`}>
                <Text style={tw`font-semibold text-black pl-3 pr-3`}>{address}</Text>
            </TouchableOpacity>
        )}
        >

        </FlatList>
    </View>
  )
}

export default WhereCard

const styles = StyleSheet.create({})