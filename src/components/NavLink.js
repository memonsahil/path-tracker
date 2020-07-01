import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

/*
Every component displayed using a navigator in App.js
has the navigation prop. However, any child component
that is not displayed with the help of a navigator
(such as this) requires wrapping the component with 
the withNavigation element to access that navigation prop.
This is a preffered solution compared the navigationRef.js file. 
*/

const NavLink = ({ navigation, text, routeName }) => {
    return (
        <Spacer>
            <TouchableOpacity onPress = {() => {navigation.navigate({ routeName })}}>
                <Text style = {styles.link}>{ text }</Text>
            </TouchableOpacity>
        </Spacer>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'blue'
    }
});

export default withNavigation(NavLink);