import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { getDocs, setDoc, collection, doc } from "firebase/firestore";
import { UserContext } from "./UserContext";


export const DogContext = createContext();



export default function DogProvider({ children }) {
  const params = useParams(null);

  const { auth , user } = useContext(UserContext)

  const [dogs, setDogs] = useState([]);

  const [dog, setDog] = useState({
    name: "",
    size: "",
    id: user.id,
    imgs: null,
    age: "",
    bread: "",
    description: "",
    likes: [],
    location: "",
  });


  async function fetchDogsFromDB () {
    const snap = await getDocs(collection(db, "dogs"));
    const dogData = snap.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setDogs(prev => [...prev, ...dogData]);
  }

  async function addDogForUser() {
    try {
      

      const userDogsCollectionRef = doc(db, "dogs", dog.id);

      await setDoc(userDogsCollectionRef, {
        name:dog.name,
        size: dog.size,
        id: dog.id,
        imgs: null,
        age: dog.age,
        bread: dog.bread,
        description: dog.description,
        likes: dog.likes,
        location: dog.location,
      });

      console.log("Dog added!");
    } catch (err) {
      console.error(err);
    }
  }

  function onChangeDogData(e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setDog((prev) => ({
      ...prev,
      [field]: value,
    }));
  }


  //the logged in data informatino  for rendering
  
  const  myDogData = dogs.find((dog) => dog.id == user.id) ;


  const dogsToMeet = dogs.filter((dog) => dog.id !== user.id);


  //img modal swiper
  const [isPop, setIsPop] = useState(false);

  //function to likeBtn - insert like into the array

  //update form - to the dog state  and than to the dogs state

  return <DogContext.Provider value={{myDogData, dogsToMeet, fetchDogsFromDB ,addDogForUser, isPop,  dogs, setIsPop, dog,  onChangeDogData }}>{children}</DogContext.Provider>;
}
