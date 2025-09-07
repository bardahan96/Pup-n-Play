import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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