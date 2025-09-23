import "./ThemeStyle/ThemeStyle.css";
import logo from "./ThemeStyle/Logos/Diego-logo.png";
import back from "./ThemeStyle/Icons/Back-icon.png";
import SignOut from "../Auth/SignOut";
import { useNavigate } from "react-router";

export default function Header() {

  const navigate = useNavigate(null)

  function returnPrev() {
    navigate(-1)
  }

  return (
    <>
      <div className="header">
        
          <img className="back-arrow" src={back} alt="back" onClick={returnPrev} />
        
        <div className="logoContainer">
          <img className="logo" src={logo} alt="" />
        </div>
        <SignOut/>
      </div>
    </>
  );
}
