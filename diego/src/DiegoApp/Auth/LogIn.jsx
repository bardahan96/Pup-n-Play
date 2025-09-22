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




export default function LogIn() {

  const { signInDB, authReady} = useContext(UserContext)
  const { getAllDogs } = useContext(DogContext)
  const navigate = useNavigate(null)
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }


  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  async function signIn() {
      const logged = await signInDB(email, password);
     if (authReady && logged?.username) {
        await getAllDogs();
        navigate(`/${encodeURIComponent(logged.username)}/home`, { replace: true });
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
        <input
        id="Email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        </div>

        <div className="formInput">
          <label htmlFor="Pass">Password: </label>
          <div className="password-container">
        <input
        id="Pass"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer'}}>{showPassword ? <img src={eyeClosed} alt="eyeOpen" /> : <img src={eyeOpen} alt="eyeClosed" />}</span>
        </div>
        </div>
            <div className="userForm-btns">
                <button onClick={signIn}> log in</button>
                <button onClick={navToSignup}> Sign Up</button>
            </div>
      </div>
      
    </div>
    
  );
}
