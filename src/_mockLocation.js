import * as Location from "expo-location";

/*
Creating a fake location path for the user for testing within Expo Go. Not necessary when
testing on a simulator or emulator, as they have their own location testing features.
*/

const tenMetersWithDegrees = 0.0001;
let counter = 0;

const getLocation = (increment) => {
  return {
    timeStamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      latitude: 55.8642 + increment * tenMetersWithDegrees, // Glasgow
      longitude: -4.2518 + increment * tenMetersWithDegrees,
    },
  };
};

setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
