import { useState, useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
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

  return <UserContext.Provider value={{ user, setuser, users, setUsers }}>{children}</UserContext.Provider>;
}
