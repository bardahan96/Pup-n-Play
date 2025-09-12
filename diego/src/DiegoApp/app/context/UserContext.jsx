import { collection, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
// import { auth } from "../config/firebase";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "../../config/firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  console.log(auth?.currentUser?.email); //this is the way we cann access to the current user!!!!

  const params = useParams(null);

  const [users, setUsers] = useState([]);

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
    // await createUserWithEmailAndPassword(auth, user.email, user.password);

    const newUser = {
      ...user,
      id: auth?.currentUser?.uid ?? user.id, // fallback אם אין currentUser
    };

    setUser(newUser);
    setUsers(prev => [...prev, newUser]);   // ⬅️ שמירה נכונה למערך
  } catch (error) {
    console.error(error);
  }
}

  return <UserContext.Provider value={{ params, user, setUser, users, setUsers, signUpDB, onChangeUserData }}>{children}</UserContext.Provider>;
}
