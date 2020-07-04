import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from '../components/Spacer';

const TrackForm = () => {
    const { state: { name, recording, locations }, startRecording, stopRecording, changeName } = useContext(LocationContext);

    console.log(locations.length);

    return (
        <>
            <Spacer>
                <Input
                    value = {name}
                    onChangeText = {changeName}
                    placeholder = 'Enter Track Name'
                />
                { recording ? <Button title = 'Stop' onPress = {stopRecording} /> 
                : <Button title = 'Start Recording' onPress = {startRecording}/> }
            </Spacer>
        </>
    );
};

export default TrackForm;