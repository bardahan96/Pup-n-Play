import { Outlet, useParams } from "react-router"
import { useContext, useEffect } from "react"
import { DogContext } from "./DogContext"
import Header from "../../Theme/Header"
import Footer from "../../Theme/Footer"

export default function UserWrapper() {

    const params = useParams(null)

    // const { dogs } = useContext(DogContext)

    // useEffect(() => {
    //     console.log("params: ", params);
    // }, [params])

    
    

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
