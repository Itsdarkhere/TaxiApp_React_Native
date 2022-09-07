import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import tw from "twrnc"
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import { GOOGLE_API_KEY } from "@env";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const dispatch = useDispatch();
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom to fit route
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination])


    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json
                ?units=metric
                &destinations=${destination.address}
                &origins=${origin.address}
                &key=${GOOGLE_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setTravelTimeInformation(data?.rows[0].elements[0]));
                });
        };

        getTravelTime();

    }, [origin, destination, GOOGLE_API_KEY])

  return (
    <MapView 
    ref={mapRef}
    style={tw`flex-1`}
    mapType="mutedStandard"
    initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        }}
    >
        {/* Displays the route */}
        {origin && destination && (
            <MapViewDirections 
             origin={
                {
                    latitude: origin.latitude, 
                    longitude: origin.longitude 
                }
            }
             destination={
                {
                    latitude: destination.latitude, 
                    longitude: destination.longitude
                }
            }
             apikey={GOOGLE_API_KEY}
             strokeWidth={2}
             strokeColor="black"
            />
        )}

        {/* Displays your location */}
        {origin?.latitude && (
            <Marker
            title="Your location"
            description="location"
            identifier="origin" 
            coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
            }}
            />    
        )}

        {/* Displays destination */}
        {destination?.latitude && (
            <Marker
            title="Destination"
            description="Destination"
            identifier="destination" 
            coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
            }}
            />    
        )}

    </MapView>
  )
}

export default Map
