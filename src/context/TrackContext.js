import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const fetchTracks = (dispatch) => async () => {
  const response = await trackerApi.get("/tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};

const createTrack = () => async (name, locations) => {
  await trackerApi.post("/tracks", { name, locations });
};

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
