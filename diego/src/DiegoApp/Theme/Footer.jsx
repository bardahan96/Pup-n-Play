import "./ThemeStyle/ThemeStyle.css";
import DogIcon from "./ThemeStyle/Icons/Dog-icon.png";
// import HomeIcon from "./ThemeStyle/Icons/House-icon.svg";
import Kennel from "./ThemeStyle/Icons/kennel.png";
import ChatIcon from "./ThemeStyle/Icons/ChatCircle.png";
import HeartIcon from "./ThemeStyle/Icons/Heart-icon.png";
import Chat from "./ThemeStyle/Icons/conversation.png";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <button className="matches-btn btn">
          Matches
          <img src={HeartIcon} alt="" />
        </button>
        <button className="chat-btn btn">
          Chat
          <img src={Chat} alt="" />
        </button>
        <button className="home-btn btn">
          Home
          {/* <img src={HomeIcon} alt="" /> */}
          <img src={Kennel} alt="" />
        </button>
        <button className="user-btn btn">
          User
          <img src={DogIcon} alt="User" />
        </button>
      </div>
    </>
  );
}
