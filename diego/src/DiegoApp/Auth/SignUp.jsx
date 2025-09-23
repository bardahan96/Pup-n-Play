import "./AuthStyle/AuthStyle.css";
import { UserContext } from "../app/context/UserContext";
import LogIn from "./LogIn";
import { useNavigate  } from "react-router";
import { useState, useContext } from "react";
import { DogContext } from "../app/context/DogContext";
import eyeOpen from "./AuthStyle/eyeOpen.svg";
import eyeClosed from "./AuthStyle/eyeClosed.svg";
import { ErrorHandlingContext } from "../app/context/errorHandlingContext";
export default function SignUp() {
  

  const { user, signUpDB, onChangeUserData } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const { getFieldError, clearFieldError, validateSignup } = useContext(ErrorHandlingContext);
  const usernameError = getFieldError('signup', 'username');
  const emailError = getFieldError('signup', 'email');
  const passwordError = getFieldError('signup', 'password');

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  

  const navigate=useNavigate()
  

  function handleSignUp() {
    const isValid = validateSignup({ username: user.username, email: user.email, password: user.password });
    if (!isValid) return;
    navigate(`/:${user.username}/createDogForm`)
  }

  function navToLogin () {
    navigate("/")
  }

  return (
    
      <div className="signUpContainer">
        <div className="signUpForm">
          <img src={"../../assets/Diego.png"} alt="" />

          <div className="formInput">
            <label htmlFor="username">Username</label>
            {usernameError && <div className="field-error" role="alert">{usernameError}</div>}
            <input type="text" id="username" name="username" onChange={(e) => { onChangeUserData(e); if (usernameError) clearFieldError('signup','username'); }} value={user.username} placeholder="please enter your name" />
          </div>

          <div className="formInput">
            <label htmlFor="email">Email</label>
            {emailError && <div className="field-error" role="alert">{emailError}</div>}
            <input type="text" id="email" name="email"
            placeholder="please enter your email"
            onChange={(e) => { onChangeUserData(e); if (emailError) clearFieldError('signup','email'); }} value={user.email} />
          </div>

          <div className="formInput">
            <label htmlFor="password">Password</label>
            {passwordError && <div className="field-error" role="alert">{passwordError}</div>}
            <div className="password-container">
            <input type={showPassword ? 'text' : 'password'} 
            id="password" 
            name="password" 
            onChange={(e) => { onChangeUserData(e); if (passwordError) clearFieldError('signup','password'); }} 
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
