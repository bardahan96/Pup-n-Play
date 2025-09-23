import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import HomePage from "../HomePage/HomePage";
import SignUp from "../Auth/SignUp";
import SignOut from "../Auth/SignOut";
import ChatsList from "../Chats/ChatsList";
import ChatRoom from "../Chats/ChatRoom";
import { useContext, useEffect, useState, useMemo } from "react";
import "./mainStyle/diegoAppStyle.css";
import UserWrapper from "./context/UserWrapper";
import LogIn from "../Auth/LogIn";
import SignDog from "../Auth/SignDog";
import { DogContext } from "./context/DogContext";
import { UserContext } from "./context/UserContext";
import RenderDogs from "../HomePage/innerComponents/RenderDogs";
import ConnectedUser from "./context/ConnectedUser";

export default function DiegoApp() {
  const { getAllDogs, dogs} = useContext(DogContext);


//  


  return (
    <div className="webWrraper">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<UserWrapper />}>
            <Route index element={<LogIn />} />
            <Route path="signOut" element={<SignOut />} />
            <Route path="signup" element={<SignUp />} />
            <Route path=":username/createDogForm" element={<SignDog />} />
            <Route element={<ConnectedUser/>}>
                <Route path=":username/home" element={<HomePage />}> 
                <Route index  element={<RenderDogs  />}/>
                </Route>
                {/* <Route path={`${user.username}/ChatsList`} element={<ChatsList />} />
                <Route path="/ChatRoom" element={<ChatRoom />} /> */}
                {/* <Route path="/RenderDogs" element={<RenderDogs dogs={['a','b','c','d','e','f']} />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
