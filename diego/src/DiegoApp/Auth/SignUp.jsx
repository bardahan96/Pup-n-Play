import { useContext, useEffect, useState } from "react";
import "./AuthStyle/AuthStyle.css";
import { DogContext } from "../app/context/DogContext";
import { UserContext } from "../app/context/UserContext";

import diegoImg from "../../assets/diego.png";


export default function SignUp() {
  const { onChangeUserData,signUpDB, user} = useContext(UserContext);
  const { dog,dogs,  setDogs, onChangeDogData } = useContext(DogContext)

  // onchageDogData- function that take and sets the data of the dog




function SignUp () {
  setDogs(prev => [...prev , dog])
}
  useEffect(() => {
    SignUp()
  }, [signUpDB])

  useEffect(() => {
    console.log("dogs", dogs);
  }, [dogs])

  useEffect(() => {
    console.log("signupdb:" , signUpDB());
  },[signUpDB])

  return (
    
      <div className="signUpContainer">
        <div className="signUpForm">
          <img src={diegoImg} alt="" />

            <div className="formInput">
                <label htmlFor="username">Username</label>
                <input type="text" name="name" id="name" onChange={onChangeUserData} />
            </div>

            <div className="formInput">
              <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" onChange={onChangeUserData} />
            </div>

            <div className="formInput">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={onChangeUserData} />
            </div>


            <div className="formInput">
                <label htmlFor="dogName">dog name:</label>
                <input type="text" id="dogName" name="name" value={dog.name} onChange={onChangeDogData} />
            </div>

            <div className="formInput">
                <label htmlFor="description">description :</label>
                <input type="text"
                id="description" 
                value={dog.description}
                name="description"
                onChange={onChangeDogData}/>
            </div>

            <div className="formInput">
                <label htmlFor="preferences">preferences :</label>
                <input type="text" 
                id="preferences"
                 value={dog.preferences}
                 name="preferences"
                 onChange={onChangeDogData}/>
            </div>

            <div className="formInput">
                <label htmlFor="age">Age</label>
                <input type="range"  onChange={onChangeDogData} value={dog.age}
                name="age"
                min="0"
                max="30"
                step="0.1"
                />
                <span>{dog.age}</span>
            </div>

            <div className="formInput">
                <label htmlFor="size">Size</label>
                <select onChange={onChangeDogData} name="size" id="size">
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </select>
            </div>

            <div className="formInput">
                <label htmlFor="uploadImgs">Upload img</label>
                <input type="file" />
            </div>


              <button onClick={signUpDB}>Sign Up</button>

        </div>
    </div>
    

    
  );
}
