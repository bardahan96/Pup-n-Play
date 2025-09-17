import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import HomePage from "../HomePage/HomePage";
import SignUp from "../Auth/SignUp";
// import LogIn from "../Auth/Login";
import SignOut from "../Auth/SignOut";
import { useContext, useEffect, useState } from "react";
import './mainStyle/diegoAppStyle.css'
import UserWrapper from "./context/UserWrapper";
import LogIn from "../Auth/LogIn";
import SignDog from "../Auth/SignDog";
import { DogContext } from "./context/DogContext";
import { UserContext } from "./context/UserContext";


export default function DiegoApp() {
  return (
    <div className="webWrraper">
      <BrowserRouter>
        <Header />
        {/* <Match /> */}

    const { fetchDogsFromDB , dogs } = useContext(DogContext)
    const { user, auth } = useContext(UserContext)

    useEffect(() => {
        console.log("auth: ",auth.currentUser);
    },[])

    useEffect(() => {
        fetchDogsFromDB()
    }, [])

    useEffect(() => {
        console.log("dogs array: ",dogs);
    }, [dogs])


    return (
        <div className="webWrraper">
           <BrowserRouter>

           
            <Routes>
                <Route path="/" element={<UserWrapper/>}>
                    <Route path="" element={<LogIn/>}/>
                    <Route path="/signOut" element={<SignOut/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path={`/:${user.username}/createDogForm`} element={<SignDog/>}/>
                    <Route path={`/:${user.username}/home`} element={<HomePage/>} />
                </Route>
            </Routes>

            
           </BrowserRouter>


        </div>
    )
    
};
