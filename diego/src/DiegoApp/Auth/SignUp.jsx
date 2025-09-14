import { useContext, useEffect, useState } from "react";
import { collection, addDoc, setDoc,doc } from "firebase/firestore";
import { db } from "../config/firebase";
// import { auth } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";
import { DogContext } from "../app/context/DogContext";
import { UserContext } from "../app/context/UserContext";
import LogIn from "./LogIn";
import { useNavigate } from "react-router";
export default function SignUp() {
  // onchageDogData- function that take and sets the data of the dog
  const { dog, setDogs, dogs, onChangeDogData } = useContext(DogContext);

  const { user, signUpDB, onChangeUserData } = useContext(UserContext);

  const navigate=useNavigate()
  

  function handleSignUp() {
    signUpDB();
    navigate(`/:${user.username}/createDogForm`)
  }

  return (
    
      <div className="signUpContainer">
        <div className="signUpForm">
          <img src={"../../assets/Diego.png"} alt="" />

          <div className="formInput">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={onChangeUserData} value={user.username} placeholder="please enter your name" />
          </div>

          <div className="formInput">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={onChangeUserData} value={user.email} />
          </div>

          <div className="formInput">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" onChange={onChangeUserData} value={user.password} placeholder="please enter your name" />
          </div>

          
          <button onClick={handleSignUp}>Sign Up</button>
              <button onClick={()=>navigate("/logIn")}>Login</button> 
        </div>

      </div>
       
  );
}
