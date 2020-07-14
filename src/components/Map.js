import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        //Delta values indicate the zoom level.
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        //To center the map on the moving location.
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={25}
        strokeColor="rgba(158, 158, 255, 1.0)" //RGB and Opacity.
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline
        coordinates={locations.map((loc) => loc.coords)}
        /*
                Mapping the locations array to just access
                the coords property of every location object
                which contains the latitude and longitude
                values within.
                */
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 400,
  },
});

export default Map;
