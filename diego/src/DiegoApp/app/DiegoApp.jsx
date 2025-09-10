import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import UserWrapper from "./context/UserWrapper";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";

export default function DiegoApp() {


    return (


            <BrowserRouter>

                <Routes>
                    <Route path="/:user" element={<UserWrapper/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                    <HomePage/>

              
            </BrowserRouter>

    )
    
};
