import { useContext, useEffect, useState } from "react";
import { collection, addDoc, setDoc,doc } from "firebase/firestore";
import { db } from "../config/firebase";
// import { auth } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";
import { DogContext } from "../app/context/DogContext";
import { UserContext } from "../app/context/UserContext";
import LogIn from "./LogIn";
import { useNavigate } from "react-router";
export default function SignUp() {
  // onchageDogData- function that take and sets the data of the dog
  const { dog, setDogs, dogs, onChangeDogData } = useContext(DogContext);

  const { user, setuser, users, setUsers, signUpDB, onChangeUserData } = useContext(UserContext);

  const navigate=useNavigate()
  async function addDogForUser() {
    try {
      

      const userDogsCollectionRef = doc(db, "dogs", String(dog.id));

      await setDoc(userDogsCollectionRef, {
        name:dog.name,
        size: dog.size,
        id: dog.id,
        imgs: null,
        age: dog.age,
        bread: dog.bread,
        description: dog.description,
        likes: dog.likes,
        location: dog.location,
      });

      console.log("Dog added!");
    } catch (err) {
      console.error(err);
    }
  }

  function handleSignUp() {
    // מוסיפים כלב פעם אחת בלחיצה
    setDogs((prev) => [...prev, dog]);
    // מפעילים את רישום המשתמש (DB)
    signUpDB();
    addDogForUser();
  }

  return (
    
      <div className="signUpContainer">
        <div className="signUpForm">
          <img src={"../../assets/Diego.png"} alt="" />

          <div className="formInput">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={onChangeUserData} value={user.username} placeholder="please enter your name" />
          </div>

          <div className="formInput">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={onChangeUserData} value={user.email} />
          </div>

          <div className="formInput">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" onChange={onChangeUserData} value={user.password} placeholder="please enter your name" />
          </div>

          <div className="formInput">
            <label htmlFor="dogName">dog name:</label>
            <input type="text" id="dogName" name="name" value={dog.name} onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="description">description :</label>
            <input type="text" id="description" value={dog.description} name="description" onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="preferences">bread :</label>
            <input type="text" id="preferences" value={dog.bread} name="bread" onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="age">Age</label>
            <input type="range" onChange={onChangeDogData} value={dog.age} name="age" min="0" max="30" step="0.1" />
            <span>{dog.age}</span>
          </div>

          <div className="formInput">
            <label htmlFor="size">Size</label>
            <select onChange={onChangeDogData} name="size" id="size">
              <option disabled={true} value="">Select</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </div>

          <div className="formInput">
            <label htmlFor="uploadImgs">Upload img</label>
            <input type="file" />
          </div>

          <button onClick={handleSignUp}>Sign Up</button>
              <button onClick={()=>navigate("/logIn")}>Login</button> 
        </div>

      </div>
       
  );
}
