import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
// import UserWrapper from "./context/UserWrapper";
import SignUp from "../Auth/SignUp";
import LogIn from "../Auth/Login";
import SignOut from "../Auth/SignOut";
import { useState } from "react";
import './mainStyle/diegoAppStyle.css'
import UserWrapper from "./context/UserWrapper";


export default function DiegoApp() {


    return (
        <div className="webWrraper">
           <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserWrapper/>}>
                    <Route path="/" element={<LogIn/>}/>
                    <Route path="/:signup" element={<SignUp/>}/>
                    <Route path="/home" element={<HomePage/>} />
                </Route>
            </Routes>
           </BrowserRouter>
        </div>
    )
    
};
