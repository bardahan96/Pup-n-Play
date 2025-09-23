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
      {authReady && user?.id && <button style={{width: "33px", height: '33px', alignSelf: 'center'}} onClick={signOutDB}>log out</button>}
      {authReady && !user?.id && <div style={{width: "33px", height: '33px', alignSelf: 'center'}}></div>}
    </>
  )
}