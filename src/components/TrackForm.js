import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [SaveTrack] = useSaveTrack();

  //console.log(locations.length);

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter Track Name"
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title="Stop" onPress={stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button title="Save" onPress={SaveTrack} />
        ) : null}
      </Spacer>
    </>
    /*
        When not recording and some number of location objects exist
        within the locations array, then show the save Button. 
        */
  );
};

export default TrackForm;
