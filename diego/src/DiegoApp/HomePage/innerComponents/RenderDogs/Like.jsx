import { db } from "../../../config/firebase"
import { collection, getDocs } from "firebase/firestore";

export default function Like({currentUserId,dogs}) {
const likedDogs=dogs.filter((dog) =>dog.like.includes(currentUserId));
    return (
        <>
        {likedDogs.map((dog)=>(
            <h2>{dog.name}</h2>
        ))}
        </>
    )
    
};
