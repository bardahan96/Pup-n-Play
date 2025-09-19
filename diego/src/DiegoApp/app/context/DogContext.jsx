import { useState, useEffect, useContext, useMemo } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { getDocs, setDoc, collection, doc } from "firebase/firestore";
import { UserContext } from "./UserContext";

export const DogContext = createContext();

export default function DogProvider({ children }) {

  //import context from user
  const { user } = useContext(UserContext);


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
<<<<<<< HEAD
  async function addDogForUser() {
    console.log(`dogUserId:`,user.id)
=======
  async function addDogForUser(uid, dogData = dog) {
>>>>>>> origin/HomePage-branch
    try {
      const userDogsCollectionRef = doc(db, "dogs", uid);
  
      await setDoc(userDogsCollectionRef, {
        ...dogData,
        id: uid,
      });
  
      console.log("Dog saved with imgs:", dogData.imgs);
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
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return [];
    }
  }

  // ================== //

  //handle the input form data dog state
  function onChangeDogData(e) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    const files = e.currentTarget.files;
    const type = e.currentTarget.type;
  
    setDog(prev => {
      if (field === "imgs" && files?.length) {
        return {
          ...prev,
          imgs: [...(Array.isArray(prev.imgs) ? prev.imgs : []), ...Array.from(files)],
        };
      }
      return { ...prev, [field]: value };
    });
  }

  

  // define variabls for dog use
  const myDogData = useMemo(() => {
    if (!user?.id || dogs.length === 0) return null;
    return dogs.find(d => d.id === user.id) ?? null;
  }, [dogs, user?.id]);



  const dogsToMeet = useMemo(() => {
    if (!user?.id) return [];
    return dogs.filter(d => d.id !== user.id);
  }, [dogs, user?.id]);

  useEffect(() => {
    console.log("dogs:", dogs);
    console.log("my dog data", myDogData);
    console.log("dogs to meet :", dogsToMeet);
  }, [dogs, myDogData, dogsToMeet])

  // ============ //

  return <DogContext.Provider value={{getAllDogs,signedIn,setDog, setSignedIn,  addDogForUser,myDogData, isPop, dogs, setIsPop, dog, onChangeDogData }}>{children}</DogContext.Provider>;
}
