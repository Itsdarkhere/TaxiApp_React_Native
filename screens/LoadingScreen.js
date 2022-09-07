import { StyleSheet, Animated, Alert } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as Location from "expo-location";
import { setSplashFinished } from '../slices/initialLoadSlice';
import { setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const backgroundFade = useRef(new Animated.Value(0)).current;
    const textFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(backgroundFade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        Animated.timing(textFade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(({finished}) => {
            if (finished) {
                dispatch(setSplashFinished(true));

                // IMPL later
                // If the app has loaded we want to move on. 
                // Now we just move on if animation itself has run its course
                navigation.navigate("Signin");
            }
        });

        // Check that we have permission to access location
        // Then set our origin to that location
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert("You need to enable location to use this app...")
                return;
            }

            let coordinates = await Location.getCurrentPositionAsync({});

            let latitude = coordinates.coords.latitude;
            let longitude = coordinates.coords.longitude;

            // Get locationInfo such as address
            let locationInfo = await Location.reverseGeocodeAsync({
                longitude,
                latitude
            });

            dispatch(setOrigin({
                latitude: latitude,
                longitude: longitude,
                address: locationInfo[0]?.name + ", " + locationInfo[0]?.city + ", " + locationInfo[0]?.country
            }))
        })();
    })

    const styles = StyleSheet.create({
        view: {
            flex: 1,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gray',
            opacity: backgroundFade,
        },
        text: {
            color: 'white',
            fontSize: 55,
            fontWeight: 'bold',
            opacity: textFade,
        },
        textTwo: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            opacity: textFade,
        }
    })

  return (
    <Animated.View style={styles.view}>
        <Animated.Text style={styles.text}>T</Animated.Text>
        <Animated.Text style={styles.textTwo}>CON</Animated.Text>
    </Animated.View>
  )
}

export default LoadingScreen
