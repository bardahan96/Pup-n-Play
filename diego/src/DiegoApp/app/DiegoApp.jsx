import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../HomePage/HomePage";
import UserWrapper from "./context/UserWrapper";
import SignUp from "../Auth/SignUp";
import { useState } from "react";


export default function DiegoApp() {


    return (
           
        <SignUp/>
    )
    
};
