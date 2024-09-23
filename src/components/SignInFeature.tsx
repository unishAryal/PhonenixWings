
'use client'
import styles from "./signin.module.css";
import { useState, useRef } from "react";

const baseUrl = "http://localhost:3001";

const SignInFeature = () => {
  const usernameRef = useRef <HTMLInputElement>(null);
  const passwordRef = useRef <HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  

  const signInHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password){
        setError("Username and password both are required.");
    
    }
    const toPass = {
        userName : username,
        passWord : password
    }
    const sendAuthToServer = await fetch(baseUrl + "/signInAuthentication", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(toPass)
    });

    if (sendAuthToServer.ok) {
      // Handle success
      console.log("Sign In successful")
    } else {
      // Handle error
      setError("Sign-In failed. Please Try again.")
    }
  };

  return (
    
      <form className = {styles.formStyle} onSubmit={signInHandler}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        

        <div className = {styles.signInContainer}>
            <h2>Login</h2>
            <div>Username :</div>
                <input
                type="text"
                ref={usernameRef}
                placeholder="Username (email)"
                required
                />
                <div> Password : </div>
                <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
                />
                <div className={styles.sendButton}>
                <button type="submit">Sign In</button>
                </div>
        </div>
      </form>
    
  );
};

export default SignInFeature;