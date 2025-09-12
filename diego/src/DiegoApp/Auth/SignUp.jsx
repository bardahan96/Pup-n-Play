import { useContext, useEffect, useState } from "react";
// import { auth } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./AuthStyle/AuthStyle.css";
import { DogContext } from "../app/context/DogContext";
import { UserContext } from "../app/context/UserContext";
// import {} from "../../assets/Diego.png"
export default function SignUp() {
  // onchageDogData- function that take and sets the data of the dog
  const { dog, setDogs, dogs, onChangeDogData } = useContext(DogContext);

  const { user, setuser, users, setUsers, signUpDB, onChangeUserData } = useContext(UserContext);
  
 function handleSignUp() {
    // מוסיפים כלב פעם אחת בלחיצה
    setDogs(prev => [...prev, dog]);
    // מפעילים את רישום המשתמש (DB)
    signUpDB();
  }

  return (
    <>
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
            <label htmlFor="preferences">preferences :</label>
            <input type="text" id="preferences" value={dog.preferences} name="preferences" onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="age">Age</label>
            <input type="range" onChange={onChangeDogData} value={dog.age} name="age" min="0" max="30" step="0.1" />
            <span>{dog.age}</span>
          </div>

          <div className="formInput">
            <label htmlFor="size">Size</label>
            <select onChange={onChangeDogData} name="size" id="size">
              <option value="">Select</option>
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
        </div>
      </div>

      {/* <input
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
       {/* img need to make 
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
      <button disabled={auth.currentUser} onClick={signUpDB}>Sign Up</button> */}

      <div className="submitContainer"></div>
    </>
  );
}
