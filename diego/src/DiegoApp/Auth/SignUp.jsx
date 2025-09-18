import "./AuthStyle/AuthStyle.css";
import { UserContext } from "../app/context/UserContext";
import LogIn from "./LogIn";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { DogContext } from "../app/context/DogContext";
export default function SignUp() {
  

  const { user, signUpDB, onChangeUserData } = useContext(UserContext);
  const { signedIn, setSignedIn } = useContext(DogContext)

  const navigate=useNavigate()
  

  function handleSignUp() {
    signUpDB();

    setSignedIn(true)
    navigate(`/:${user.username}/createDogForm`)
    
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

          <div className="userForm-btns">
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={()=>navigate("/logIn")}>Login</button> 
          </div>
        </div>

      </div>
       
  );
}
