import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation"; //For handling events when a component is is focus or blur (not in focus).
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents //Removes the error message when about to focus on this SignupScreen component, i.e. when the transition is initiated.
        onWillFocus={clearErrorMessage} //All its props - onWillFocus, onDidFocus, onWilBlur, onDidBlur.
      />
      <AuthForm
        headerText="Sign Up for PathTracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup} //Same as onSubmit = {({ email, password }) => signup({ email, password })} Automatically passes the appropriate arguments.
      />
      <NavLink
        text="Already have an account? Sign In instead."
        routeName="Signin"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;
