import { collection, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  console.log(auth?.currentUser?.email); //this is the way we cann access to the current user!!!!

  const params = useParams(null);

  const [users, setUsers] = useState([]);

  const [user, setuser] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
  });

  async function signUpDB() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  
 

  //img modal swiper
  const [isPop, setIsPop] = useState(false);

  //function to likeBtn - insert like into the array

  //update form - to the dog state  and than to the dogs state

 

  return <UserContext.Provider value={{ isPop, setDogs, dogs, params, setIsPop, dog, onChangeDogData }}>{children}</UserContext.Provider>;
}
