import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native'; //Soon to be depreciated and superseded with react-native-async-storage, however that's not supported with Expo. 
//AsynceStorage - used for storing small pieces of data on device.
const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }; //Re-render the component with the updated state property , i.e. errorMessage.
        case 'signup':
            return {errorMessage: '', token: action.payload}; //NOT re-rendering but resetting the entire state object, thereby resetting the errorMessage property.
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

const signup = (dispatch) => async ({ email, password }) => {

    try {
        const response = await trackerApi.post('/signup', { email, password });
        console.log(response.data);
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signup', payload: response.data.token });
    } catch (err) {
        console.log(err.response.data);
        dispatch({type: 'add_error', payload: 'Something went wrong with Sign Up'})
    }
};


const signin = (dispatch) => {
    return ({ email, password }) => {
        /*
        Use the email and password to signin;
        update the state accordingly;
        catch errors if found any.
        */
    };
};

const signout = (dispatch) => {
    return () => {
        /*
        Signout;
        update the state accordingly;
        catch errors if found any.
        */
    };
};

//If a token (jwt) exists, then the user is signed and vice versa.
export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { token: null, errorMessage: '' }
);