import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";



const gProvider = new GoogleAuthProvider()
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    // GOOGLE
    // signin 
    const signInGoogle = async () => {
        setLoading(true)
        return signInWithPopup(auth , gProvider)
    }


    // email authentication
    // create user
    const createUser = async (email, password) => {
        setLoading(true)
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    
    // sign in
    const signIn = async(email, password) => {
        setLoading(true)
        return await signInWithEmailAndPassword(auth, email, password)
    }
    
    // sign out
    const signOutUser = async () => {
        setLoading(true)
        return await signOut(auth);
    }
    

    // update user
    const updateProfileUser = async (updateUserData) => {
        return await updateProfile(auth.currentUser, updateUserData)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    


    
    
    
    const authInfo = {
        user,
        setUser,
        loading,
        signInGoogle,
        createUser,
        signIn,
        signOutUser,
        updateProfileUser,
    }

    return (
        <AuthContext.Provider value={ authInfo} >
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;