import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

//For resolving a user's authentication state by confirming the presence of a token (jwt).
const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);
    
    useEffect(() => {tryLocalSignin()}, []);

    return null;
};

export default ResolveAuthScreen;