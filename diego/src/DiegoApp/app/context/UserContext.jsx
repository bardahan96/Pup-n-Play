import { collection, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { createContext } from "react";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../config/firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  console.log(auth?.currentUser?.email); //this is the way we cann access to the current user!!!!



  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
  });

  async function signUpDB() {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    } catch (error) {
      console.error(error);
    }
  }

  function onChangeUserData (e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUser(prev => ({
      ...prev, [field]: value
    }))
  }

  useEffect(() => {
    console.log("user : ", user);
  }, [user])

  useEffect(() => {
    console.log(auth?.currentUser?.email);

  })



  
 

  //img modal swiper
  const [isPop, setIsPop] = useState(false);

  //function to likeBtn - insert like into the array

  //update form - to the dog state  and than to the dogs state

 

  return <UserContext.Provider value={{ signUpDB , onChangeUserData}}>{children}</UserContext.Provider>;
}
