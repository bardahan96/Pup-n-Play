import { useContext, useEffect, useState } from "react";
// import { auth } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";
import { DogContext } from "../app/context/DogContext";
import { UserContext } from "../app/context/UserContext";

export default function SignUp() {
  const {user, setuser, users, setUsers}=useContext(UserContext)
  

  // onchageDogData- function that take and sets the data of the dog

  
  async function signUpDB() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      //TODO: להוסיף בדיקה של אימייל קיים,אימייל לא תקין
    }
  }
function updateArry () {
  setDogs(prev => [...prev , dog])
}
  useEffect(() => {
    signUpDB()
  }, [dogs])

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
        value={dog.age}
        min="0"
        max="30"
        step="0.1"
        onChange={onChangeDogData}
      />

       {/* img need to make */}
       <div className="preferencesContainer">
          <label htmlFor="preferences">preferences :</label>
       <input type="text" 
       id="preferences"
        value={dog.preferences}
        name="preferences"
        onChange={onChangeDogData}
       />
       </div>

       <div className="descriptionContainer">
        <label htmlFor="description">description :</label>
        <input type="text"
        id="description" 
        value={dog.description}
        name="description"
        onChange={onChangeDogData}
        />


       </div>


      <p>Age:{age}</p>
      <h2>email pass</h2>
      {email}
      {password}
      <button onClick={updateArry}>Sign Up</button>
      {/* <button disabled={auth.currentUser} onClick={signUpDB}>Sign Up</button> */}


        <div className="submitContainer">
        </div>

    </>
  );
}
