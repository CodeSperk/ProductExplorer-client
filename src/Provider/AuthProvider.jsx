/* eslint-disable react/prop-types */
import {  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // to create a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // to login User
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleLogin = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  //to logout user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }


  // to keep an eye on users present
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    })
    return () => {
      unSubscribe();
    }
  }, [])


  const authInfo = {
    user, loading, createUser, googleLogin, loginUser, logOutUser 
  }

  return(
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;