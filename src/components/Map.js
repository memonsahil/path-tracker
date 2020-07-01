import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
    return (
        <MapView 
            style = {styles.map}
            initialRegion = {{ //Delta values indicate the zoom level.
                latitude: 51.509865,
                longitude: -0.118092,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        />
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;