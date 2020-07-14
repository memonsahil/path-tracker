import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native"; //Soon to be depreciated and superseded with react-native-async-storage, however that's not supported with Expo yet.
//AsynceStorage - used for storing small pieces of data on device so that the user is signed in everytime they reopen the app.
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload }; //Re-render the state object with the updated state property, i.e. errorMessage.
    case "signin":
      return { errorMessage: "", token: action.payload }; //NOT re-rendering but resetting the entire state object.
    case "clear_error_message":
      return { ...state, errorMessage: "" }; //Re-render the state object with the cleared error message.
    case "signout":
      return { token: null, errorMessage: "" }; //Resetting the entire state object to its default value.
    default:
      return state;
  }
};

//Action functions

/*
Syntax update:
const add = (a, b) => a+b;
Implicit return, i.e. the value of a+b will be automatically returned.

Same as

const add = (a, b) => {
    return a+b;
}
*/

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    console.log(response.data);
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with Sign Up.",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    console.log(response.data);
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with Sign In.",
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("Signup");
};

//If a token (jwt) exists, then the user is signed in and vice versa.
export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
