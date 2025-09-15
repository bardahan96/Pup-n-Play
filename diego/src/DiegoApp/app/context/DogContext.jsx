import { useState, useEffect, useContext, useMemo } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { getDocs, setDoc, collection, doc } from "firebase/firestore";
import { UserContext } from "./UserContext";
import { auth } from "../../config/firebase";


export const DogContext = createContext();



export default function DogProvider({ children }) {
  const params = useParams(null);

  const { auth , user } = useContext(UserContext)

  const [dogs, setDogs] = useState([]);

  const [dog, setDog] = useState({
    name: "",
    size: "",
    id: auth?.currentUser?.uid,
    imgs: [],
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
      

      const userDogsCollectionRef = doc(db, "dogs", String(dog.id));

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
    const files = e.currentTarget.files;
    setDog((prev) => ({
      ...prev,
      [field]: files ? Array.from(files) : value,
    }));
  }
  useEffect(() => {
    console.log("dog state data", dog);
  }, [dog]);

  const dogsToMeet = useMemo(() => {
    return dogs.filter((dog) => dog.id !== user.id);
  }, [dogs])


  //img modal swiper
  const [isPop, setIsPop] = useState(false);

  //function to likeBtn - insert like into the array

  //update form - to the dog state  and than to the dogs state

  return <DogContext.Provider value={{myDogData, dogsToMeet, fetchDogsFromDB ,addDogForUser, isPop,  dogs, setIsPop, dog,setDog,   onChangeDogData }}>{children}</DogContext.Provider>;
}
