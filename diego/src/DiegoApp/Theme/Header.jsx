import "./ThemeStyle/ThemeStyle.css";
import logo from "./ThemeStyle/Logos/Diego-logo.png";
import back from "./ThemeStyle/Icons/Back-icon.png";

export default function Header() {
  return (
    <>
      <div className="header">
        <button className="back-btn">
          <img className="back-arrow" src={back} alt="back" />
        </button>
        <div className="logo">
          <img className="logo" src={logo} alt="" />
        </div>
      </div>
    </>
  );
}
