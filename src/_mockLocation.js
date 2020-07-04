/*
For creating a fake location path from the user.
For Testing purposes only - on Expo app.
Not really necessary when testing on a simulator / emulator,
as it has its own testing features.
*/

import * as Location from 'expo-location';
/*
Importing * as Location since the expo-location library
exports multiple named functions which can be accessed
with this single variable (Location).
*/

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
    return {
        timeStamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            latitude: 53.22273389222794 + increment * tenMetersWithDegrees, //Bangor - latitude & longitude.
            longitude:  -4.132752800979557 + increment * tenMetersWithDegrees
        }
    };
};

let counter = 0;
setInterval(() => { //New location is emitted every second.
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000); //1000ms equals 1s.