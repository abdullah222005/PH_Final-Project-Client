import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../../../Firebase/firebase.config';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const GoogleProvider = new GoogleAuthProvider();

    const registerUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUer = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(email, password);
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider);
    }

    const logOutUser = () =>{
        setLoading(true)
        return signOut(auth);
    }

    const updateUserProfile =(profile)=>{
        return updateProfile(auth.currentUser, profile);
    }

    //Observer here
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return () =>{
            unSubscribe();
        }
    }, [])

    const AuthInfo = {
      user,
      loading,
      registerUser,
      signInUer,
      signInWithGoogle,
      logOutUser,
      updateUserProfile,
      
    };

    return (
        <AuthContext value={AuthInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;