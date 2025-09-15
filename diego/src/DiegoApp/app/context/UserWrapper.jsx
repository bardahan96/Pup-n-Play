import { Outlet, useParams } from "react-router"
import { useContext, useEffect } from "react"
import { DogContext } from "./DogContext"

export default function UserWrapper() {

    const params = useParams(null)

    // const { dogs } = useContext(DogContext)

    useEffect(() => {
        console.log("params: ", params);
    }, [params])

    
    

    return (
        <>
        <Outlet/>

        </>
    )
    
};
