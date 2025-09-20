import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import { UserContext } from "./UserContext";
import { DogContext } from "./DogContext";


export default function ConnectedUser() {
    const { authReady, user } = useContext(UserContext);
    const { getAllDogs, myDogData, dogs } = useContext(DogContext);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (authReady && user?.id) {
            getAllDogs().then(() => {
                setDataLoaded(true);
            });
        }
    }, [authReady, user?.id]);

    if(!authReady) return <div></div>
    if (!user?.id) return <Navigate to="/" replace />;
    
    if (!dataLoaded) return <div></div>;
    

    return (
        <>
            <Outlet/>
        </>
    )
}
