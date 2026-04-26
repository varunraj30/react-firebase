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
 // KEYS
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
