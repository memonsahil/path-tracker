import { useState, useEffect } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);
    let subscriber; //Listener for watchPositionAsync.

    useEffect(() => {
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
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000, //Watch every 1s.
                    distanceInterval: 10 //Watch every 10m.
                }, callback);
            } catch (e) {
                setErr(e);
            }
        };
       
        if (shouldTrack) {  //startWatching depending on the value of shouldTrack (boolean) or when it changes.
            startWatching();
        } else {
            //Stop watching to save battery life.
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }
        //useEffect returns a cleanup function which will be referred before startWatching is called the next time.
        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback, subscriber]); //Also startWatching when the value of the callback changes.
    //All essential variables that influence startWatching should be stored within the dependency array.
    return [err]; //Returning as an array by following community convention.
};