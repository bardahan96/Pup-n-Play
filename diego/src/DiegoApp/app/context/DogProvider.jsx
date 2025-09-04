

import { useState, useEffect } from "react";
import { createContext } from "react";

export const DogContext = createContext();

export default function DogProvider({children}) {

const [dogs, setDogs] = useState()

const [dog, setDog] = useState( {
    name: "",
    id: "",
    imgs: null,
    age: "",
    preferences: "",
    descrption: "",
    likes: [],
    location: ""
});

//function to likeBtn - insert liek into the array

//update form - to the dog state  and than to the dogs state




    return (
        <DogProvider.Provider >
            {children}
        </DogProvider.Provider>
    )
    
};
