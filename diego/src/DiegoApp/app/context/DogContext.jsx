import { useState, useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const DogContext = createContext();

export default function DogProvider({ children }) {
  const params = useParams(null);

  const [dogs, setDogs] = useState([]);

  const [dog, setDog] = useState({
    name: "",
    size: "",
    id: Date.now(),
    imgs: null,
    age: "",
    bread: "",
    description: "",
    likes: [],
    location: "",
  });

  function onChangeDogData(e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setDog((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  useEffect(() => {
    console.log("dog state data", dog);
  }, [dog]);

  useEffect(() => {
    console.log("dogs array", dogs);
  }, [dogs]);

  async function getAllDogs() {
    try {
      const dogsCollectionRef = collection(db, "dogs");
      const dogsSnapshot = await getDocs(dogsCollectionRef);

      const dogsList = dogsSnapshot.docs.map((doc) => doc.data());
      setDogs(dogsList)
      console.log("Dogs fetched:", dogsList);
    //   return dogsList;
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return [];
    }
  }

  //img modal swiper
  const [isPop, setIsPop] = useState(false);

  //function to likeBtn - insert like into the array

  //update form - to the dog state  and than to the dogs state

  return <DogContext.Provider value={{ isPop, setDogs, dogs, params, setIsPop, dog, setDog, onChangeDogData,getAllDogs }}>{children}</DogContext.Provider>;
}
