import { Outlet, useParams } from "react-router"


export default function UserWrapper() {

    const params = useParams(null)

    return (
        <>
        <Outlet/>
        </>
    )
    
};
