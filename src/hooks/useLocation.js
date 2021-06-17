import { useState, useEffect } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  // Listener for watchPositionAsync.
  let subscriber;

  useEffect(() => {
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        /*
        After the intial permission request, the OS handles future requests accordingly.

        If location permission is granted, then the map component with receive both,
        the device's current location and the incoming points from _mockLocation.
        
        If location permission is not granted, then the map component will only use the
        incoming points from _mockLocation.
        */

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      // Stop watching when not tracking to save battery life.
      subscriber ? subscriber.remove() : null;
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback, subscriber]);

  return [err];
};
