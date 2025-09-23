import "./AuthStyle/AuthStyle.css";
import { UserContext } from "../app/context/UserContext";
import LogIn from "./LogIn";
import { useNavigate  } from "react-router";
import { useState } from "react";
import { useContext } from "react";
import { DogContext } from "../app/context/DogContext";
import eyeOpen from "./AuthStyle/eyeOpen.svg";
import eyeClosed from "./AuthStyle/eyeClosed.svg";
export default function SignUp() {
  

  const { user, signUpDB, onChangeUserData } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  

  const navigate=useNavigate()
  

  function handleSignUp() {
    navigate(`/:${user.username}/createDogForm`)
  }

  function navToLogin () {
    navigate("/logIn")
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
            <input type="text" id="email" name="email"
            placeholder="please enter your email"
            onChange={onChangeUserData} value={user.email} />
          </div>

          <div className="formInput">
            <label htmlFor="password">Password</label>

            <div className="password-container">
            <input type={showPassword ? 'text' : 'password'} 
            id="password" 
            name="password" 
            onChange={onChangeUserData} 
            value={user.password} 
            placeholder="please enter your password" />
            <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer'}}>{showPassword ? <img src={eyeClosed} alt="eyeOpen" /> : <img src={eyeOpen} alt="eyeClosed" />}</span>
            </div>
          </div>

          <div className="userForm-btns">
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={navToLogin}>Login</button> 
          </div>
        </div>

      </div>
       
  );
}
