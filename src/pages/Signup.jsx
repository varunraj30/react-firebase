import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createuser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((user) =>
      alert("Created User Successfully!!"),
    );
  };

  return (
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
      <button onClick={createuser}>Sign up</button>
    </div>
  );
}

export default Signup;
