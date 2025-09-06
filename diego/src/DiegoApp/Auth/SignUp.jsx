import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("Small");
  const [age, setAge] = useState(0);
  console.log(auth?.currentUser?.email); //this is the way we cann access to the current user!!!!
  console.log(size);
  //   name: "",
  //     id: "",
  //     imgs: null,
  //     age: "",
  //     preferences: "",
  //     descrption: "",
  //     likes: [],
  //     location: ""

  async function signUpDB() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      //TODO: להוסיף בדיקה של אימייל קיים,אימייל לא תקין
    }
  }

  return (
    <>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        value={email}
        placeholder="Enter Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        placeholder="Enter password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <div className="dog-size-container">
        <p></p>
        <label>
          <input
            type="radio"
            value="Small"
            checked={size === "Small"}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          Small
        </label>
        <label>
          <input
            type="radio"
            value="Medium"
            checked={size === "Medium"}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            value="Large"
            checked={size === "Large"}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          Large
        </label>
      </div>
      <input
        type="range"
        value={age}
        min="0"
        max="30"
        step="0.1"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <p>Age:{age}</p>
      <h2>email pass</h2>
      {email}
      {password}
      <button onClick={signUpDB}>Sign Up</button>
      {/* <button disabled={auth.currentUser} onClick={signUpDB}>Sign Up</button> */}
    </>
  );
}
