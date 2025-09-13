import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";
import {db} from "../config/firebase"
import { getDocs, collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";




export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInDB() {
   
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }





  return (
    
    <div className="login-page-container">
       {/* {auth?.currentUser?.email} */}
        <img src="../../assets/Diego.PNG" alt="dog" sizes="10px"  />
      <div className="email-pass-container">
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={signInDB}> log in</button>
      
    </div>
    
  );
}
