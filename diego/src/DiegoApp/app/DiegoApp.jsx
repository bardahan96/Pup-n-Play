import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import HomePage from "../HomePage/HomePage";
import SignUp from "../Auth/SignUp";
// import LogIn from "../Auth/Login";
import SignOut from "../Auth/SignOut";
import { useState } from "react";
import './mainStyle/diegoAppStyle.css'
import UserWrapper from "./context/UserWrapper";
import LogIn from "../Auth/LogIn";
import SignOut from "../Auth/SignOut";


export default function DiegoApp() {


    return (
        <div className="webWrraper">
           <BrowserRouter>

           {/* header */}
            <Routes>
                <Route path="/" element={<UserWrapper/>}>
                    <Route path="/logIn" element={<LogIn/>}/>
                    <Route path="/signOut" element={<SignOut/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/home" element={<HomePage/>} />
                </Route>
            </Routes>

            
           </BrowserRouter>


           <NavLink to="home" >logIN</NavLink>
        </div>
    )
    
};
