import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import UserWrapper from "./context/UserWrapper";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import SignOut from "../Auth/SignOut";

export default function DiegoApp() {


    return (


            <BrowserRouter>

                <Routes>
                    <Route path="/:user" element={<UserWrapper/>}/>
                    <Route path="/login" element={<><Login/> <SignOut/></>}/>
                </Routes>
                    <HomePage/>

              
            </BrowserRouter>

    )
    
};
