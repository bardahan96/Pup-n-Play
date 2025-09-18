import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../config/firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";

import { DogContext } from "../app/context/DogContext";
import diegoLogo from  '../../assets/diego.png'
import { UserContext } from "../app/context/UserContext";
import { useNavigate } from "react-router";




export default function LogIn() {

  const { auth, user } = useContext(UserContext)
  const navigate = useNavigate(null)

  const { signedIn, setSignedIn, getAllDogs } = useContext(DogContext)
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInDB() {
   
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }
  
  function signIn () {
    signInDB()
    setSignedIn(true)
    navigate(`/:${user.username}/home`)
    
  }

  function navToSignup () {
    navigate("/signup")
  }



  useEffect(() => {
    getAllDogs()

  }, [signedIn])

  return (
    
    <div className="login-page-container">
        <img src={diegoLogo} alt="dog" sizes="10px"  />
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
        <input
        id="Pass"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        </div>
            <div className="userForm-btns">
                <button onClick={signIn}> log in</button>
                <button onClick={navToSignup}> Sign Up</button>
            </div>
      </div>
      
    </div>
    
  );
}
