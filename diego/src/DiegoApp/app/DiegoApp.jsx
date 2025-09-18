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

export default function DiegoApp() {
  const { fetchDogsFromDB, dogs, signedIn } = useContext(DogContext);
  const { user, auth } = useContext(UserContext);


 // define variabls for dog use
 const  myDogData = useMemo(() => {
  console.log("user id :", user.id);
  return  dogs.find((dog) => dog.id == user.id) ;
}, [dogs, user?.id])

  useEffect(() => {
    console.log("my dog data :",myDogData);
  },[dogs])


  return (
    <div className="webWrraper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserWrapper />}>
            <Route path="" element={<LogIn />} />
            <Route path="/signOut" element={<SignOut />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:username/createDogForm" element={<SignDog />} />
           <Route path="/:username/home" element={<HomePage />} />
            
            <Route path={`${user.username}/ChatsList`} element={<ChatsList />} />
            <Route path="/ChatRoom" element={<ChatRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
