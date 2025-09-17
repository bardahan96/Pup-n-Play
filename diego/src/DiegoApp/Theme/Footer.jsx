import "./ThemeStyle/ThemeStyle.css";
import DogIcon from "./ThemeStyle/Icons/Dog-icon.png";
import Kennel from "./ThemeStyle/Icons/kennel.png";
import Chat from "./ThemeStyle/Icons/conversation.png";
import HeartIcon from "./ThemeStyle/Icons/Heart-icon.png";
import ChatRoom from "../Chats/ChatRoom";

export default function Footer({ active = "home", onChange = () => {} }) {
  const items = [
    { key: "matches", label: "Matches", icon: HeartIcon, alt: "Matches" },
    { key: "chat", label: "Chat", icon: Chat, alt: "Chat", nav: "ChatRoom" },
    { key: "home", label: "Home", icon: Kennel, alt: "Home" },
    { key: "user", label: "User", icon: DogIcon, alt: "User" },
  ];

  return (
    <nav className="footer" role="navigation" aria-label="Bottom navigation">
      {items.map((item) => (
        <NavLink to={item.nav}>
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

// ---------------------------------------------------------------------

// import "./ThemeStyle/ThemeStyle.css";
// import DogIcon from "./ThemeStyle/Icons/Dog-icon.png";
// // import HomeIcon from "./ThemeStyle/Icons/House-icon.svg";
// import Kennel from "./ThemeStyle/Icons/kennel.png";
// import ChatIcon from "./ThemeStyle/Icons/ChatCircle.png";
// import HeartIcon from "./ThemeStyle/Icons/Heart-icon.png";
// import Chat from "./ThemeStyle/Icons/conversation.png";

// export default function Footer() {
//   return (
//     <>
//       <div className="footer">
//         <button className="matches-btn btn">
//           <img src={HeartIcon} alt="" />
//           Matches
//         </button>
//         <button className="chat-btn btn">
//           <img src={Chat} alt="" />
//           Chat
//         </button>
//         <button className="home-btn btn">
//           {/* <img src={HomeIcon} alt="" /> */}
//           <img src={Kennel} alt="" />
//           Home
//         </button>
//         <button className="user-btn btn">
//           <img src={DogIcon} alt="User" />
//           User
//         </button>
//       </div>
//     </>
//   );
// }
