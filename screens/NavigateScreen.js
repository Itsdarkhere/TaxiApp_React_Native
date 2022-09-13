import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_API_KEY } from "@env";
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const axios = require('axios').default;
import { selectUsername } from '../slices/userSlice';
import tw from "twrnc"

const NavigateScreen = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const username = useSelector(selectUsername);
    const ref = useRef();
    const navigation = useNavigation();

    useEffect(() => {
        if (origin?.address) ref.current?.setAddressText(origin.address);
    }, [origin])

    const add_address = async (address) => {
        let res = await axios.post("http://127.0.0.1:8000/add_address", {
            login: {
                username: username,
                // Password not needed by the api, but cant be empty
                password: "notempty",
            },
            address: address,
          }, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
        });

        console.log(res.data);
    }

  return (
    <View style={tw`bg-gray-200 h-full pt-5`}>
        <Text style={tw`pt-2 pl-2 pb-1 text-lg pr-1 font-semibold`}>From:</Text>
        <GooglePlacesAutocomplete 
        ref={ref}
        placeholder='Where from?'
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
            key: GOOGLE_API_KEY,
            language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        styles={{
            container: {
                flex: 0,
                marginLeft: 7,
                marginRight: 7,
            },
            textInput: {
                fontSize: 18,
                height: 55
            },
        }}
        onPress={(data, details) => {
            dispatch(
                setOrigin({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    address: data.description
                })
            )
        }}
        />

        <Text style={tw`pt-2 pl-2 pb-1 pr-1 text-lg font-semibold`}>To:</Text>
        <GooglePlacesAutocomplete 
        placeholder='Where to?'
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
            key: GOOGLE_API_KEY,
            language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        styles={{
            container: {
                flex: 0,
                marginLeft: 7,
                marginRight: 7,
            },
            textInput: {
                fontSize: 18,
                height: 55
            },
        }}
        onPress={(data, details = null) => {
            dispatch(
                setDestination({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    address: data.description
                })
            )
            
            // Adds address to the database
            add_address(data.description);

            navigation.navigate("Order");
        }}
        />
    </View>
  )
}

export default NavigateScreen