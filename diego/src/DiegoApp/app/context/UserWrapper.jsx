import { Outlet, useNavigate, useParams } from "react-router"
import { useContext, useEffect } from "react"
import { DogContext } from "./DogContext"
import Header from "../../Theme/Header"
import Footer from "../../Theme/Footer"
import { UserContext } from "./UserContext"
import { ErrorHandlingProvider } from "./errorHandlingContext"

export default function UserWrapper() {

    const {  user } = useContext(UserContext)


    return (
        <div className="webWrraper">
            <Header/>
            <ErrorHandlingProvider>
                <div className="webWrraper-routes">
                    <Outlet/>
                </div>
            </ErrorHandlingProvider>
            { user?.id && <Footer/>}
        </div>
    )
    
};
