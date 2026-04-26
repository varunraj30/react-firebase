import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { app } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { useFirebase } from "./context/Firebase";

// const auth = getAuth(app);

// function App() {
//   const signupUser = () => {
//     createUserWithEmailAndPassword(
//       auth,
//       "varunraj.dev@gmail.com",
//       "123456",
//     ).then((res) => console.log(res));
//   };

//   return (
//     <div>
//       <Signup />
//       <h1></h1>
//       <Signin />
//     </div>
//   );
// }

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);

  const firebase = useFirebase();

  const handleSignup = async () => {
    try {
      const user = await firebase.signupUserWithEmail(email, password);
      console.log(user);
    } catch (err) {
      setErr(err.code);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.authState((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user == null) {
    return (
      <div className="App">
        <div className="signup-page">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Enter your email"
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
          />
          <button
            onClick={() => {
              handleSignup();
            }}
          >
            Sign up
          </button>
          <h1></h1>
          <button
            onClick={() => {
              firebase.loginUser(email, password);
            }}
          >
            Sign in
          </button>
          <h1></h1>
          <button onClick={firebase.signUpWithGoogle}>
            Sign in with Google
          </button>
        </div>
        {err}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Hello {user.email}</h1>
        <button onClick={() => firebase.signOutUser()}>Signout</button>
      </div>
    );
  }
}

export default App;
