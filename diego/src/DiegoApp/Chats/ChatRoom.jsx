import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./ChatRoom.css";

const fallbackAvatar =
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&auto=format&fit=crop";

const defaultChat = {
  id: "c1",
  name: "Bella (Border Collie)",
  avatar: fallbackAvatar,
  online: true,
};

const defaultMessages = [
  { id: "m1", from: "them", text: "Hi! Loved your profile 🐾", time: "14:05" },
  {
    id: "m2",
    from: "me",
    text: "Thanks! Park meet-up tomorrow?",
    time: "14:06",
  },
  {
    id: "m3",
    from: "them",
    text: "Yes! 17:00 near the fountain.",
    time: "14:07",
  },
];

function timeNow() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export default function ChatRoom({
  chat = defaultChat,
  initialMessages = defaultMessages,
  onSend, // optional callback(newMessage)
}) {
  const navigate = useNavigate();
  const { username, chatId } = useParams();
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const handleBack = () => {
    navigate(`/${username}/chats`);
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const body = text.trim();
    if (!body) return;
    const newMsg = {
      id: `m${Date.now()}`,
      from: "me",
      text: body,
      time: timeNow(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setText("");
    inputRef.current?.focus();
    if (onSend) onSend(newMsg);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function autoGrow(e) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px"; // cap height
  }

  const avatar = chat.avatar || fallbackAvatar;

  return (
    <section className="chatRoom" aria-label={`Chat with ${chat.name}`}>
      {/* Header */}
      <header className="roomHeader">
        <button className="roomBack" onClick={handleBack} aria-label="Back">
          ←
        </button>
        <img className="roomAvatar" src={avatar} alt="Chat avatar" />
        <div className="roomTitleWrap">
          <div className="roomTitle">{chat.name}</div>
          <div className="roomStatus">
            <span className={`dot ${chat.online ? "dot--on" : "dot--off"}`} />
            {chat.online ? "Online" : "Offline"}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="msgList" role="log" aria-live="polite">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`msgRow ${
              m.from === "me" ? "msgRow--me" : "msgRow--them"
            }`}
          >
            {m.from === "them" && (
              <img className="msgAvatar" src={avatar} alt="" aria-hidden />
            )}
            <div className={`msg ${m.from === "me" ? "msg--me" : "msg--them"}`}>
              <p className="msgText">{m.text}</p>
              <time className="msgTime">{m.time}</time>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <textarea
          ref={inputRef}
          className="composer__input"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={autoGrow}
          onKeyDown={handleKeyDown}
          rows={1}
          aria-label="Type a message"
        />
        <button type="submit" className="composer__send" aria-label="Send">
          Send
        </button>
      </form>
    </section>
  );
}
