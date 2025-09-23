import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { db } from "../../config/firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState({
    username: "",
    id: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
    const unsub = onAuthStateChanged(auth, (fb) => {
      if (fb) {
        setUser({
          username: fb.displayName || "",
          id: fb.uid || "",
          email: fb.email || "",
          password: "",
        });
      } else {
        setUser({ username: "", id: "", email: "", password: "" });
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  function onChangeUserData(e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function signUpDB() {
    const cred = await createUserWithEmailAndPassword(auth, user.email, user.password);
    await updateProfile(cred.user, { displayName: user.username });
    const newUser = {
      ...user,
      id: cred.user.uid,
      email: cred.user.email || user.email,
      username: cred.user.displayName || user.username,
      password: "",
    };
    setUser(newUser);
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  }

  async function signInDB(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const fb = cred.user;
    const loggedUser = {
      id: fb.uid,
      email: fb.email || "",
      username: fb.displayName || user.username || "",
      password: "",
    };
    setUser(loggedUser);
    return loggedUser;
  }

  function signOutDB() {
    return signOut(auth);
  }

  return (
    <UserContext.Provider
      value={{
        auth,
        authReady,
        user,
        users,
        setUser,
        setUsers,
        onChangeUserData,
        signUpDB,
        signInDB,
        signOutDB,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
