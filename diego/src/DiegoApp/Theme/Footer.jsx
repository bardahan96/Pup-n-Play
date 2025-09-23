import "./ThemeStyle/ThemeStyle.css";
import DogIcon from "./ThemeStyle/Icons/Dog-icon.png";
import Kennel from "./ThemeStyle/Icons/kennel.png";
import Chat from "./ThemeStyle/Icons/conversation.png";
import HeartIcon from "./ThemeStyle/Icons/Heart-icon.png";
import ChatRoom from "../Chats/ChatRoom";
import { NavLink } from "react-router";
import SignOut from "../Auth/SignOut";
import { useContext } from "react";
import { UserContext } from "../app/context/UserContext";
export default function Footer({ active = "home", onChange = () => {} }) {

  const { user } = useContext(UserContext)
  const items = [
    { key: "matches", label: "Matches", icon: HeartIcon, alt: "Matches" },
    { key: "chat", label: "Chat", icon: Chat, alt: "Chat", nav: "ChatRoom" },
    { key: "home", label: "Home", icon: Kennel, alt: "Home" },
    { key: "user", label: "User", icon: DogIcon, alt: "User" },
  ];

  return (
    <nav className="footer" role="navigation" aria-label="Bottom navigation">
      {items.map((item) => (
        <NavLink to={item.nav} key={item.key}>
          {" "}
          <button
          
            key={item.key}
            type="button"
            className={`btn ${active === item.key ? "btn--active" : ""}`}
            onClick={() => onChange(item.key)}
            aria-current={active === item.key ? "page" : undefined}
          >
            <img className="btn__icon" src={item.icon} alt={item.alt} />
            <span className="btn__label">{item.label}</span>
          </button>{" "}
        </NavLink>

      ))}
    </nav>
  );
}
