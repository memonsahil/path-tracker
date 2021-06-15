import { NavigationActions } from "react-navigation";

let navigator;

// Method to access the navigator from outside of any React components.
export const setNavigator = (nav) => {
  navigator = nav;
};

// Method used by files to navigate using that navigator.
export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
