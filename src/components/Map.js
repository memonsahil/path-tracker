import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const Map = () => {
    let points = [];
    for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) { //When i is even.
            points.push({
                latitude: 51.509865 + i * 0.0001,
                longitude: -0.118092 + i * 0.0001 
            });
        } else {
            points.push({
                latitude: 51.509865 + i * 0.0002,
                longitude: -0.118092 + i * 0.0001 
            });
        }
    }


    return (
        <MapView
            style = {styles.map}
            initialRegion = {{ //Delta values indicate the zoom level.
                latitude: 51.509865,
                longitude: -0.118092,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Polyline coordinates = {points}/>
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;