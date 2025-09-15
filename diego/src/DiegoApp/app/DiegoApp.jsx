import { BrowserRouter, Route, Routes } from "react-router";
// import HomePage from "../HomePage/HomePage";
import SignUp from "../Auth/SignUp";
// import LogIn from "../Auth/Login";
import SignOut from "../Auth/SignOut";
import { useState } from "react";
import "./mainStyle/diegoAppStyle.css";
import UserWrapper from "./context/UserWrapper";
import LogIn from "../Auth/LogIn";
import Footer from "../Theme/Footer";
import Header from "../Theme/Header";
import Match from "../HomePage/innerComponents/MatchList/Match";
import ChatsList from "../Chats/ChatsList";
import ChatRoom from "../Chats/ChatRoom";

export default function DiegoApp() {
  return (
    <div className="webWrraper">
      <BrowserRouter>
        <Header />
        {/* <Match /> */}

        <Routes>
          <Route path="/" element={<UserWrapper />}>
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signOut" element={<SignOut />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/ChatsList" element={<ChatsList />} />
            <Route path="/ChatRoom" element={<ChatRoom />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
