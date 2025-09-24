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
import { DogContext } from "./context/DogContext";
import { UserContext } from "./context/UserContext";
import RenderDogs from "../HomePage/innerComponents/RenderDogs";
import ConnectedUser from "./context/ConnectedUser";
import Match from "../HomePage/innerComponents/MatchList/Match";
import MatchList from "../HomePage/innerComponents/MatchList/MatchList";
import DogFormWrapper from "../Auth/SignDog/DogFormWrapper";
import DogName from "../Auth/SignDog/DogName";
import DogPicture from "../Auth/SignDog/DogPicture";
import DogPlace from "../Auth/SignDog/DogPlace";
import DogDescription from "../Auth/SignDog/DogDescription";

export default function DiegoApp() {
  const { getAllDogs, dogs} = useContext(DogContext);


//  


  return (
    <div className="webWrraper">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<UserWrapper />}>
            <Route index element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path=":username" element={<DogFormWrapper/>}>
              <Route path="createDogName" element={<DogName />} />
              <Route path="createDogPicture" element={<DogPicture />} />
              <Route path="createDogPlace" element={<DogPlace />} />
              <Route path="createDogDescription" element={<DogDescription />} />
            </Route>
            <Route path="signOut" element={<SignOut />} />
            <Route element={<ConnectedUser/>}>
                <Route path=":username/home" element={<HomePage />}> 
                  <Route index element={<RenderDogs />}/>
                  <Route path="match" element={<Match />} />
                  <Route path="matches" element={<MatchList />} />
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
