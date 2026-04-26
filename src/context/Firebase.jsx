import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBXFu39S9lR-WlMJvdtty3e5lGyyr0PjCk",
  authDomain: "app-84441.firebaseapp.com",
  projectId: "app-84441",
  storageBucket: "app-84441.firebasestorage.app",
  messagingSenderId: "99729895882",
  appId: "1:99729895882:web:f549b69df0b071d8511f33",
  databaseURL: "https://app-84441-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signupUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const putData = (key, data) => {
    return set(ref(firebaseDB, key), data);
  };

  const signUpWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  const loginUser = async (email, password) => {
    const userCreds = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );
    return userCreds.user;
  };

  const signOutUser = () => {
    return signOut(firebaseAuth);
  };

  const authState = (cb) => {
    return onAuthStateChanged(firebaseAuth, (user) => {
      cb(user);
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmail,
        putData,
        signUpWithGoogle,
        authState,
        loginUser,
        signOutUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
