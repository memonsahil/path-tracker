//Context helps pass values to any nested component within the { children } object.
//File name starts with lowercase since it's exporting a plain function.

import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        //value to be accessed with useContext.
        return (
            <Context.Provider value = {{ state, ...boundActions }}>
                { children }
            </Context.Provider>
        );
    };

    return { Context, Provider };
};
