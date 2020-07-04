import '../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext'; 
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {  //isFocused is a boolean.
    const { state, addLocation } = useContext(LocationContext);
    const [err] = useLocation(isFocused, (location) => { addLocation(location, state.recording) });

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

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
/*
withNavigationFocus is a HOC that accepts the
TrackCreateScreen component as an argument and
provides the isFocused object as a prop to it.
*/