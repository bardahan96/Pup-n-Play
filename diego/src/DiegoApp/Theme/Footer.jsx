import "./ThemeStyle/ThemeStyle.css";
import DogIcon from "./ThemeStyle/Icons/Dog-icon.png";
import Kennel from "./ThemeStyle/Icons/kennel.png";
import Chat from "./ThemeStyle/Icons/conversation.png";
import HeartIcon from "./ThemeStyle/Icons/Heart-icon.png";
import ChatRoom from "../Chats/ChatRoom";
import { NavLink, useParams } from "react-router";
import SignOut from "../Auth/SignOut";
export default function Footer({ active = "home", onChange = () => {} }) {
  const { username } = useParams();
  
  const items = [
    { key: "matches", label: "Matches", icon: HeartIcon, alt: "Matches", nav: `/${username}/home/matches` },
    { key: "chat", label: "Chat", icon: Chat, alt: "Chat", nav: "ChatsList" },
    {
      key: "home",
      label: "Home",
      icon: Kennel,
      alt: "Home",
      nav: `/${username}/home`,
    },
    { key: "user", label: "User", icon: DogIcon, alt: "User" },
  ];

  return (
    <nav className="footer" role="navigation" aria-label="Bottom navigation">
      {items.map((item) => (
        <NavLink 
          key={item.key}
          to={item.nav}
          className={({ isActive }) => `btn ${isActive || active === item.key ? "btn--active" : ""}`}
          onClick={() => onChange(item.key)}
        >
          <button
            type="button"
            aria-current={active === item.key ? "page" : undefined}
          >
            <img className="btn__icon" src={item.icon} alt={item.alt} />
            <span className="btn__label">{item.label}</span>
          </button>
        </NavLink>
      ))}
    </nav>
  );
}