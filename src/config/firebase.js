// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9R1QT1rkvR1oKtjO7ovWeQbtREA-Mm8o",
    authDomain: "attendance-tracker-a1385.firebaseapp.com",
    projectId: "attendance-tracker-a1385",
    storageBucket: "attendance-tracker-a1385.appspot.com",
    messagingSenderId: "875266852591",
    appId: "1:875266852591:web:c939543e155758267cbd1a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// create New user
export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Login user
export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Logout User
export const logout = () => {
  return signOut(auth);
};

//  custom hook to get current User
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);

  return currentUser;
};
