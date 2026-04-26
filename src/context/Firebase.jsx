import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, set, ref, child, get, onValue } from "firebase/database";

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
  const [name, setName] = useState(null);

  const signupUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const putData = (key, data) => {
    return set(ref(firebaseDB, key), data);
  };

  const signUpWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  // users is path eg: users/hyd
  // get(child(ref(firebaseDB), "users")).then((snap) => console.log(snap.val()));

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

  useEffect(() => {
    onValue(ref(firebaseDB, "users"), (snap) => setName(snap.val().name));
  }, []);

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
      <h3>Name is {name}</h3>
      {props.children}
    </FirebaseContext.Provider>
  );
};
