import { useState, useEffect } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);
    const [subscriber, setSubscriber] = useState(null);

    /*
    Helper function to get the permission and
    watch the changing position which is being
    updated every second.
    */
   const startWatching = async () => {
        try {
            await requestPermissionsAsync();
            //After the intial permission request, the OS handles future requests correspondingly.

            /*
            If location permission is granted for the Expo app, then the
            Map component with receive both the device's current location
            and the incoming points from _mockLocation.

            If the initial latitude and longitude within _mockLocation is
            set as the device's current location, then this will enable
            testing with the location permission status set as granted
            since the initial point comming from _mockLocation and the
            device's current location is the same (almost accurate
            depending on the latitude and longitude mentioned within
            _mockLocation).

            If location permission is not granted, then the map component will
            only use the incoming points from _mockLocation.
            */
            const sub = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000, //Watch every 1s.
                distanceInterval: 10 //Watch every 10m.
            }, callback);
            setSubscriber(sub);
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(() => {   //startWatching depending on the value of shouldTrack (boolean).
        if (shouldTrack) {
            startWatching();
        } else {
            //Stop watching to save battery life.
            subscriber.remove();
            setSubscriber(null);
        }

    }, [shouldTrack]);

    return [err]; //Returning as an array by following community convention.
};