//import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext'; 
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons'; 

const TrackCreateScreen = ({ isFocused }) => {  //isFocused is a boolean.
    const { state: { recording }, addLocation } = useContext(LocationContext);
    
    /*
    useCallback limits the number of new instances
    of the callback within to be produced based on
    the value of recording, i.e. it produces
    a new instance of the callback within only when
    the value of recording changes.
    */
    
    const callback = useCallback((location) => addLocation(location, recording), [recording]);
    const [err] = useLocation(isFocused || recording, callback);
    //When isfocused or recording is true, keep watching within useLocation.

    //console.log(isFocused); returns true when this component is in focus and vice versa.
    
    return (
        <SafeAreaView forceInset = {{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services.</Text> : null}
            <TrackForm />    
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name = 'plus' size = {20} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
/*
withNavigationFocus is a HOC that accepts the
TrackCreateScreen component as an argument and
provides the isFocused object as a prop to it.
*/