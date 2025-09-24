import { useEffect, useState,useContext } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { UserContext } from "../app/context/UserContext";
import { Navigate, useNavigate } from "react-router";
export default function SignOut() {
  const { authReady, user } = useContext(UserContext)
  const navigate = useNavigate(null)
  
  async function signOutDB() {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }   
  
  return(
    <>
      {!authReady && <div style={{width: "33px", height: '33px', alignSelf: 'center'}}></div>}
      {authReady && user?.id && <button style={{width: "33px", height: '33px', alignSelf: 'center'}} onClick={signOutDB}><svg xmlns="http://www.w3.org/2000/svg" 
     width="28" height="28" viewBox="0 0 24 24" 
     fill="none" stroke="white" stroke-width="2" 
     stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="2" width="14" height="20" rx="2" ry="2" stroke="white"/>
  <path d="M16 12h5M19 9l3 3-3 3" stroke="lightgray"/>
</svg>
</button>}
      {authReady && !user?.id && <div style={{width: "33px", height: '33px', alignSelf: 'center'}}></div>}
    </>
  )
}