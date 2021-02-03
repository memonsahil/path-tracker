import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation"; //For handling events when a component is is focus or blur (not in focus).
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents //Removes the error message when about to focus on this SigninScreen component, i.e. when the transition is initiated.
        onWillFocus={clearErrorMessage} //All its props - onWillFocus, onDidFocus, onWilBlur, onDidBlur.
      />
      <AuthForm
        headerText="Sign In for PathTracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        text="Dont have an account? Sign Up instead."
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    //borderWidth: 8,
    flex: 1, //To take up the available space.
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SigninScreen;
