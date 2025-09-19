import { collection, getDoc, addDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
// import { auth } from "../config/firebase";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { db } from "../../config/firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {



  const [users, setUsers] = useState([]);
  const idRef = useRef("");
  const [user, setUser] = useState({
    username: "",
    id: "",
    email: "",
    password: "",
  });

  function onChangeUserData(e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function signUpDB() {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      await updateProfile(auth.currentUser, { displayName: user.username });

      const newUser = {
        ...user,
        id: auth.currentUser.uid, 
      };

      setUser(newUser);
      setUsers((prev) => [...prev, newUser]); 

      return newUser

    } catch (error) {
      console.error(error);
    }
  }

  // inside UserContext.jsx
async function signInDB(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const fb = cred.user;

  let username = fb.displayName || "";

  const loggedUser = {
    id: fb.uid,
    email: fb.email,
    username: username || user.username || "", 
  };

  setUser(loggedUser);
  return loggedUser;
}

  return <UserContext.Provider value={{signInDB, auth, user, setUser, users, setUsers, signUpDB, onChangeUserData }}>{children}</UserContext.Provider>;
}
