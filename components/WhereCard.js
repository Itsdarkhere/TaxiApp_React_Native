import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from "react-native-elements";
import tw from "twrnc"
const axios = require('axios').default;
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUsername } from '../slices/userSlice';
import { selectDestination } from '../slices/navSlice';

const WhereCard = () => {
    const navigation = useNavigation();
    const username = useSelector(selectUsername);
    const destination = useSelector(selectDestination);
    const [addresses, setAddresses] = React.useState(null);


    // Gets the 5 most used destinations
    const getRegularRoutes = async () => {
        let res = await axios.post("http://127.0.0.1:8000/get_regular_routes", {
            username: username,
            // Password not needed by the api
            password: "",
          }, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
        });

        // Insert list to state
        if (res?.data?.addresses) {
            console.log(res.data);
            setAddresses(res.data.addresses);
        }
    }

    // refresh on destination change
    useEffect(() => {
        getRegularRoutes();
    }, [destination])

  return (
    <View style={tw`h-full bg-white`}>
        <TouchableOpacity 
        style={tw`flex-row justify-center items-center bg-gray-300 self-center h-15 w-100 
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
        <ScrollView style={{flexGrow: 0, marginTop: 2}}>
            {addresses?.map((address) => {
                return (
                    <TouchableOpacity key={address} 
                    style={tw`bg-gray-200 pl-3 pr-3 flex-row w-90 mt-2 h-10 ml-8 rounded-lg items-center justify-between`}>
                        <Text style={tw`font-semibold text-black`}>{address}</Text>
                        <Icon
                        size={14}
                        type="font-awesome-5"
                        name="arrow-right"
                        color="black"
                        />
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    </View>
  )
}

export default WhereCard

const styles = StyleSheet.create({})