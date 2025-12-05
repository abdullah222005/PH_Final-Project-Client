import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../Firebase/firebase.config';

const AuthProvider = ({children}) => {

    const registerUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUer = (email, password)=>{
        return signInWithEmailAndPassword(email, password);
    }

    const AuthInfo = {
        registerUser,
        signInUer,
        
    }

    return (
        <AuthContext value={AuthInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;