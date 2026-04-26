import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        (console.log(user), alert("Signed in successully"));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signin-page">
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
      <button onClick={loginUser}>Sign in</button>
    </div>
  );
}

export default Signin;
