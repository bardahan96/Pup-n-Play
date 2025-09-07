import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../HomePage/HomePage";
import UserWrapper from "./context/UserWrapper";
import { BrowserRouter } from "react-router";
import SignUp from "../Auth/SignUp";


export default function DiegoApp() {

    return (
asd

            <BrowserRouter>

                <Routes>
                    <Route path="/:user" element={<UserWrapper/>}/>
                </Routes>
                    <HomePage/>

              
            </BrowserRouter>

    )
    
};
