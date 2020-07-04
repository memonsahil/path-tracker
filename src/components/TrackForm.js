import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from '../components/Spacer';

const TrackForm = () => {
    return (
        <>
        <Spacer>
            <Input placeholder = 'Enter Name' />
            <Button title = 'Start Recording' />
        </Spacer>
        </>
    );
};

export default TrackForm;