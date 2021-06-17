import React, { useContext, useCallback } from "react";
import { Text } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import useLocation from "../hooks/useLocation";
//import '../_mockLocation';
// Uncomment _mockLocation when running on Expo Go.

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  const callback = useCallback(
    (location) => addLocation(location, recording),
    [recording]
  );

  // When isFocused or recording is true, keep watching the changing location within useLocation.
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services.</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

export default withNavigationFocus(TrackCreateScreen);
