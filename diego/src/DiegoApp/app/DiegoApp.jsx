import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../HomePage/HomePage";
// import UserWrapper from "./context/UserWrapper";
import SignUp from "../Auth/SignUp";
import { useState } from "react";
import './mainStyle/diegoAppStyle.css'
import UserWrapper from "./context/UserWrapper";
import LogIn from "../Auth/LogIn";

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
