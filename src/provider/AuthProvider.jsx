import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //user creation
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //sign in
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    //update user profile
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    //user mangement
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser)
            setLoading(false);
        }
        );
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = {
        user, loading, createUser, signIn, logOut , updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;