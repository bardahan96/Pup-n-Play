import { useState, useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router";

export const DogContext = createContext();

export default function DogProvider({ children }) {
  const params = useParams(null);

  const [dogs, setDogs] = useState([]);

  const [dog, setDog] = useState({
    name: "",
    size: "",
    id: "",
    imgs: null,
    age: "",
    preferences: "",
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

  //img modal swiper
  const [isPop, setIsPop] = useState(false);

  //function to likeBtn - insert like into the array

  //update form - to the dog state  and than to the dogs state

  return <DogContext.Provider value={{ isPop, setDogs, dogs, params, setIsPop, dog, setDog, onChangeDogData }}>{children}</DogContext.Provider>;
}
