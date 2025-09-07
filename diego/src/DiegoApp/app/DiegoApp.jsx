import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../HomePage/HomePage";
import UserWrapper from "./context/UserWrapper";


export default function DiegoApp() {

    return (


            <BrowserRouter>

                <Routes>
                    <Route path="/:user" element={<UserWrapper/>}/>
                </Routes>
                    <HomePage/>

              
            </BrowserRouter>

    )
    
};
