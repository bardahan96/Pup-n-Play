import { useState, useEffect, useContext, useMemo } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { getDocs, setDoc, collection, doc } from "firebase/firestore";
import { UserContext } from "./UserContext";

export const DogContext = createContext();

export default function DogProvider({ children }) {

  //import context from user
  const { auth, user } = useContext(UserContext);
  const userId = auth.currentUser?.uid || "";

  //define states
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState({
    name: "",
    size: "",
    id: "",
    imgs: [],
    age: "",
    bread: "",
    description: "",
    likes: [],
    location: "",
  });
  const [signedIn,setSignedIn] = useState(false)
  //img modal swiper
  const [isPop, setIsPop] = useState(false);
  // ================= //

  //database function
  async function addDogForUser() {
    try {
      const userDogsCollectionRef = doc(db, "dogs", userId);

      await setDoc(userDogsCollectionRef, {
        name: dog.name,
        size: dog.size,
        id: userId,
        imgs: null,
        age: dog.age,
        bread: dog.bread,
        description: dog.description,
        likes: dog.likes,
        location: dog.location,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function getAllDogs() {
    try {
      const dogsCollectionRef = collection(db, "dogs");
      const dogsSnapshot = await getDocs(dogsCollectionRef);

      const dogsList = dogsSnapshot.docs.map((doc) => doc.data());
      setDogs(dogsList);
      //   return dogsList;
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return [];
    }
  }

  useEffect(() => {
    console.log("dog data: ", dog);
  }, [dogs])

  // ================== //

  //handle the input form data dog state
  function onChangeDogData(e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    const files = e.currentTarget.files;
    setDog((prev) => ({
      ...prev,
      [field]: files ? Array.from(files) : value,
    }));
  }
  

  // define variabls for dog use
  const  myDogData = useMemo(() => {
    return  dogs.find((dog) => dog.id == userId) ;
  }, [dogs, userId])

  // ============ //

  useEffect(() => {
    console.log("my dog data : ",myDogData);
  }, [signedIn])

  //function to likeBtn - insert like into the array

  //update form - to the dog state  and than to the dogs state

  return <DogContext.Provider value={{getAllDogs,signedIn, setSignedIn,  myDogData,  addDogForUser, isPop, dogs, setIsPop, dog, onChangeDogData }}>{children}</DogContext.Provider>;
}
