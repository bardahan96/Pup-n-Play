import { Outlet, useNavigate, useParams } from "react-router"
import { useContext, useEffect } from "react"
import { DogContext } from "./DogContext"
import Header from "../../Theme/Header"
import Footer from "../../Theme/Footer"
import { UserContext } from "./UserContext"

export default function UserWrapper() {


    return (
        <>
        
            <Header/>
            <div className="webWrraper-routes">
                <Outlet/>
            </div>
            <Footer/>
        
        </>
    )
    
};
