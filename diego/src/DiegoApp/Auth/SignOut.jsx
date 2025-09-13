import { useEffect, useState,useContext } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { UserContext } from "../app/context/UserContext";
export default function SignOut() {
    async function signOutDB() {
        
        try {
            
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
      }   
      return(
        <>
              <button  onClick={signOutDB}> log out</button>

        </>
      )
}