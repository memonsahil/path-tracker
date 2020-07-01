import { NavigationActions } from 'react-navigation';

let navigator;  //let - variable's value is not a constant.

//Clever function to access the navigator from outside of any React component, eg: through action functions.
export const setNavigator = (nav) => {
    navigator = nav;
};

//Helper function used by files to navigate using that navigator.
export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
};