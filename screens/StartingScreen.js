import { StyleSheet, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import Map from '../components/Map'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WhereCard from '../components/WhereCard';
import OrderCard from '../components/OrderCard';
import SearchingCard from '../components/SearchingCard';


const StartingScreen = () => {
    const origin = useSelector(selectOrigin);
    const Stack = createNativeStackNavigator();

  return (
    <View style={tw`h-full`}>
        <View style={tw`h-2/3`}>
            {origin && (
                <Map></Map>
            )}
        </View>
        <View style={tw`h-1/3`}>
            <Stack.Navigator>
                <Stack.Screen
                name="Where"
                component={WhereCard}
                options={{
                    headerShown: false,
                }}
                />

                <Stack.Screen
                name="Order"
                component={OrderCard}
                options={{
                    headerShown: false,
                }}
                />

                <Stack.Screen 
                name="Search"
                component={SearchingCard}
                options={{
                    headerShown: false,
                }}
                />
            </Stack.Navigator>
        </View>
    </View>
  )
}

export default StartingScreen

const styles = StyleSheet.create({})