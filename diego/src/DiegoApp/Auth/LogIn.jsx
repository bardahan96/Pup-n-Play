import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../config/firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";

import { DogContext } from "../app/context/DogContext";
import diegoLogo from  './AuthStyle/diego.png'
import { UserContext } from "../app/context/UserContext";
import { useNavigate } from "react-router";
import eyeOpen from "./AuthStyle/eyeOpen.svg";
import eyeClosed from "./AuthStyle/eyeClosed.svg";
import { ErrorHandlingContext } from "../app/context/errorHandlingContext";




export default function LogIn() {

  const { signInDB, authReady} = useContext(UserContext)
  const { getAllDogs } = useContext(DogContext)
  const navigate = useNavigate(null)
  const [showPassword, setShowPassword] = useState(false);
  const { setFieldError, clearFieldError, clearFormErrors, getFieldError, validateLogin } = useContext(ErrorHandlingContext);
  const emailError = getFieldError('login', 'email');
  const passwordError = getFieldError('login', 'password');

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }


  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  async function signIn() {
    // Reset and validate via context
    const isValid = validateLogin({ email, password });
    if (!isValid) return;

    try {
      const logged = await signInDB(email, password);
      if (authReady && logged?.username) {
        await getAllDogs();
        navigate(`/${encodeURIComponent(logged.username)}/home`, { replace: true });
        clearFormErrors('login');
      } else {
        setFieldError('login', 'password', "Incorrect email or password");
      }
    } catch (err) {
      const code = err?.code || "";
      if (
        code.includes("invalid-credential") ||
        code.includes("wrong-password") ||
        code.includes("user-not-found")
      ) {
        setFieldError('login', 'password', "Incorrect email or password");
      } else if (code.includes("too-many-requests")) {
        setFieldError('login', 'password', "Too many attempts. Please try again later.");
      } else {
        setFieldError('login', 'password', "Sign in failed. Please try again.");
      }
    }
  }

  function navToSignup () {
    navigate("/signup")
  }

  return (
    
    <div className="login-page-container">
        <img className="diegoLogo" src={diegoLogo} alt="dog" sizes="10px"  />
    <div className="email-pass-container">

        <div className="formInput">
          <label htmlFor="Email">Email:</label>
        {emailError && <div className="field-error" role="alert">{emailError}</div>}
        <input
        id="Email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) clearFieldError('login', 'email');
          }}
        />
        </div>

        <div className="formInput">
          <label htmlFor="Pass">Password: </label>
          {passwordError && <div className="field-error" role="alert">{passwordError}</div>}
          <div className="password-container">
        <input
        id="Pass"
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) clearFieldError('login', 'password');
          }}
        />
        <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer'}}>{showPassword ? <img src={eyeClosed} alt="eyeOpen" /> : <img src={eyeOpen} alt="eyeClosed" />}</span>
        </div>
        </div>
            <div className="userForm-btns">
                <button onClick={signIn} > log in</button>
                <button onClick={navToSignup}> Sign Up</button>
            </div>
      </div>
      
    </div>
    
  );
}
