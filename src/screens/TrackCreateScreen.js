import '../_mockLocation';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'; //For asking location permission from the user.
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';

const TrackCreateScreen = () => {
    const [err, setErr] = useState(null);

    //Helper function to get the permission.
    const startWatching = async () => {
        try {
            await requestPermissionsAsync();
            /*
            const { granted } = await requestPermissionsAsync();
            if(!granted) {
                throw new Error('Location permission not granted');
            }
            */
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000, //Watch every 1s.
                distanceInterval: 10 //Watch every 10m.
            }, (location) => {
                    console.log(location);
                });
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(() => {
        startWatching();
    }, []);

    return (
        <SafeAreaView forceInset = {{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;