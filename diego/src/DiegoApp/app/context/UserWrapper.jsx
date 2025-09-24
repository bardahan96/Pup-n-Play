import { Outlet, useNavigate, useParams } from "react-router"
import { useContext, useEffect } from "react"
import { DogContext } from "./DogContext"
import Header from "../../Theme/Header"
import Footer from "../../Theme/Footer"
import { UserContext } from "./UserContext"
import { ErrorHandleProvider } from "./ErrorHandleContext"

export default function UserWrapper() {

    const {  user } = useContext(UserContext)


    return (
        <>
        
            <Header/>
            <ErrorHandleProvider>
                <div className="webWrraper-routes">
                    <Outlet/>
                </div>
            </ErrorHandleProvider>
            { user?.id && <Footer/>}
        
        </>
    )
    
};
