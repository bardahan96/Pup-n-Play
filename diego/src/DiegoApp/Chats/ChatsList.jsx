import React from "react";
import { useNavigate, useParams } from "react-router";
import "./ChatsList.css";

// --- Mock data: 3 existing chats ---
const mockChats = [
  {
    id: "c1",
    name: "Bella",
    last: "Let's meet at the park at 17:00?",
    time: " 14:12",
    unread: 2,
    avatar:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "c2",
    name: "Rocky",
    last: "WOOF! Sent you my owner's phone.",
    time: " Yesterday",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "c3",
    name: "Luna",
    last: "I have vaccines up to date",
    time: " Mon",
    unread: 5,
    avatar:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop",
  },
];

export default function ChatList({ chats = mockChats }) {
  const navigate = useNavigate();
  const { username } = useParams();

  const handleOpenChat = (chat) => {
    navigate(`/${username}/chats/${chat.id}`);
  };

  return (
    <div className="chatsPage-container">
      <section className="chatList" aria-label="Chats">
        <h1 className="chatList__title">Chats</h1>

        <ul className="chatList__items" role="list">
          {chats.map((chat) => (
            <li onClick={navigate(``)} key={chat.id} className="chatList__item" role="listitem">
              <button
                type="button"
                className="chatItem"
                onClick={() => handleOpenChat(chat)}
              >
                <img
                  className="chatItem__avatar"
                  src={chat.avatar}
                  alt={`${chat.name} avatar`}
                  loading="lazy"
                  width={48}
                  height={48}
                />

                <div className="chatItem__main">
                  <div className="chatItem__row">
                    <span className="chatItem__name">{chat.name}</span>,
                    <time className="chatItem__time">{chat.time}</time>
                  </div>
                  <div className="chatItem__row">
                    <span className="chatItem__preview">{chat.last}</span>
                    {chat.unread > 0 && (
                      <span className="chatItem__badge">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}