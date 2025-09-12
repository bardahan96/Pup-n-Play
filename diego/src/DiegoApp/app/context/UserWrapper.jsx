import { Outlet, useParams } from "react-router"
import { DogContext } from "./DogContext"

export default function UserWrapper() {

    const params = useParams(null)

    const { dogs } = useContext(DogContext)

    
    

    return (
        <>
        <Outlet/>
        </>
    )
    
};
