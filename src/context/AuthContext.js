import { createDataContext } from './createDataContext';

const authReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

//Actions functions

const signup = (dispatch) => {
    return ({ email, password }) => {
        /*
        Use the email and password to signup;
        update the state accordingly;
        catch errors if found any.
        */
    };
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
        update the state correspondingly;
        catch errors if found any.
        */
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { isSignedIn: false }
);